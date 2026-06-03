import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { DEFAULT_WORLDS } from './src/defaultData';
import { TextileWorld } from './src/types';

// Initialize memory storage for customized/generated worlds
let customWorlds: TextileWorld[] = [...DEFAULT_WORLDS];

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey !== '') {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    return aiClient;
  }
  return null;
}

// 1. Fetch available worlds
app.get('/api/textile/worlds', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!getGeminiClient(),
    worlds: customWorlds
  });
});

// 2. Generate a Brand New Thread with Gemini (or procedural fallback)
app.post('/api/textile/create', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Falta o prompt descritivo para o novo fio.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Procedural generation fallback if no Gemini key is configured
    console.log('No GEMINI_API_KEY detected, generating fallback content procedurally...');
    const seed = Date.now().toString(36);
    const capitalizedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
    
    // Create custom procedural world based on the user's prompt
    const newWorld: TextileWorld = {
      id: `proc-${seed}`,
      name: `${capitalizedPrompt} Tradicional`,
      theme: capitalizedPrompt,
      description: `Uma tecelagem inovadora surgida de forma orgânica inspirada por "${capitalizedPrompt}". Padrões rurais e adaptação climática.`,
      centralNode: {
        id: `center-${seed}`,
        type: 'central',
        title: `${capitalizedPrompt} Influence`,
        description: 'The core aesthetic driver of this dynamic synthesis.'
      },
      questions: [
        {
          id: `q-${seed}-1`,
          type: 'question',
          title: `"How does ${capitalizedPrompt} react with natural salt water dye?"`,
          description: 'Salt minerals crystallize in fibers, generating high tensile reinforcement.'
        },
        {
          id: `q-${seed}-2`,
          type: 'question',
          title: `"What ceremonial importance did this weave hold?"`,
          description: 'This aesthetic pattern was reserved for climate transitions and agricultural festivals.'
        },
        {
          id: `q-${seed}-3`,
          type: 'question',
          title: `"Which tool has historically shaped the ${capitalizedPrompt} yarn?"`,
          description: 'A hand-weighted volcanic spindle is spun on basalt surfaces during extreme wind gusts.'
        }
      ],
      archiveNodes: [
        {
          id: `arch-${seed}-climate`,
          type: 'climate',
          title: 'Climate',
          description: 'Coastline environment with strong tidal humidity and periodic geothermal warming.',
          status: 'Active',
          colors: ['#cee5da', '#ffefea'],
          x: 700,
          y: 350
        },
        {
          id: `arch-${seed}-fiber`,
          type: 'fiber',
          title: 'Fiber Source',
          description: 'Light, air-trapping wool gathered from endemic birds and mossy coastal sheep.',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzEZBowTVRurTqHO5yNa2sg8WSWJhXSPumJbEsBxyDrAfCD2XPcsez5cXxeIJf9_JnZEfM-cj8SkyyvFmQeVNTq2ofE3gNTqlVBAlF1G-Bc-7GoHS-MRY5zaoL2JdgF5T1QdZwaOp1BKem4z5bZR88z6ArCeePcGa3xhoYdBruFvh2K5ig0Xo5rpQhcU6JXUCKdVtGgcSknhIaqGvFDzj7MN5W72Kk0JsuV0x57y2SCdcuScwgBOW3cifr9uvQIREd-xKreiWErG7Z',
          x: 1100,
          y: 280
        },
        {
          id: `arch-${seed}-dyeworks`,
          type: 'dyeworks',
          title: 'Dyeworks',
          description: 'Harvesting mineral oxides and deep moss pigments.',
          colors: ['#4e635a', '#cee5da', '#845241'],
          x: 1300,
          y: 500
        },
        {
          id: `arch-${seed}-hierarchy`,
          type: 'hierarchy',
          title: 'Social Hierarchy',
          description: 'The diagonal count of double-faced weaves represents generational altitude layers.',
          x: 950,
          y: 650
        },
        {
          id: `arch-${seed}-pattern`,
          type: 'pattern',
          title: 'Seasonal Pattern',
          description: 'Organic herringbone twill with high-density intersections.',
          colors: ['#4e635a', '#2c3e50', '#845241', '#d1e8dd'],
          x: 600,
          y: 580
        }
      ],
      caseStudy: {
        id: `cs-${seed}`,
        code: `Case Study ${Math.floor(Math.random() * 800 + 100)}`,
        title: `${capitalizedPrompt} Exploration`,
        description: `Adapting biological fibers to historical trade routes under the perspective of "${capitalizedPrompt}" constraints.`,
        swatchName: `Organic ${capitalizedPrompt} Knit`,
        swatchColor: '#845241',
        swatchImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuJPFu8gbnyATerTxyX_v-iHFBbNwsN8r_hCvfn-p1GdCHJ1BN3tove49T8y8LEoYT2XM6Vv1mwl07T91uBrmlCkKr8kb-33jFp-ApDtDcc56qRokRFTmsYwEryBrB09M2CeamarkXEOCGAmggoH_7NK-usiW7uV-sWnKoHaxLQFOv9-kL94swgKu9HhOGU_G3dmUGyqttVuGr3MoUv-7WJ2VX_ZRqAgr7HK1m44lxppKYPpeSv-KcYgvMfBFi4cPCgadlcArSVoW4',
        landscapeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF-Y01pgDLidqtiXB3xRBJY1NtiZ-3BoUNtz7xxGJSqSKzNrTB97QE0ttKHzKBMLu1xFIFvqJr2T5ii6L_TkVw449m3MCrF5gGVWpN2hTJg62R3qZG0NRIbazA76M0pp8MQXp3flu0c8zuGJuwJXPFfNuh3Gm2pg-8nLxHUwS8kNCuYROemOGG8oUUdxYrivxs2g9INjWiQncPbC0-4bW9a4h95tPQVtZtJlNe80fZx2WyKo6RBvdG6zV-J18nxFRcOucblpoysEni',
        landscapeTitle: 'Boundary Plateau',
        landscapeDescription: 'High-clay deposits that preserve textile organic matter.',
        snippet: `"The fiber retains memory of its geographical cradle. Each stitch anchors families to their ancient, trade-tested heritage."`,
        snippetAuthor: 'Scholarly Archive Notes',
        techSpecs: {
          composition: '75% Natural Wool, 25% Coastal Flax',
          weight: '390g/m²',
          weave: 'Twill Intersect Design',
          warpCount: '40 TPI',
          weftCount: '32 TPI',
          permeability: 'Medium Permeability, High Durability'
        }
      },
      fabricDNA: {
        durability: Math.floor(Math.random() * 30 + 60),
        porosity: Math.floor(Math.random() * 40 + 40),
        tensile: Math.floor(Math.random() * 30 + 65),
        luster: Math.floor(Math.random() * 50 + 20),
        weight: Math.floor(Math.random() * 40 + 50)
      },
      recommendedBase: {
        name: `Twilled ${capitalizedPrompt}`,
        grade: 'Grade A-2 Elite Selection',
        heatRetention: Math.floor(Math.random() * 15 + 80),
        moistureWick: Math.floor(Math.random() * 20 + 35)
      },
      culturalAnchors: [
        {
          title: 'Nomadic Adaptability',
          desc: 'Lightweight components allow easy packing and quick disassembly during seasonal shifts.'
        },
        {
          title: 'Chronology Knots',
          desc: 'Each thread row numbers the ancestors who traveled this specific high plateau.'
        }
      ],
      synthesisAccuracy: Math.floor(Math.random() * 8 + 88) + 0.4,
      artifacts: [
        {
          id: `art-${seed}-1`,
          type: 'swatch',
          title: `${capitalizedPrompt} Raw Swatch`,
          subtitle: `SWATCH ${Math.floor(Math.random() * 100)}`,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXg337j2fNNmrEGh1y99EwmZVdZr245tVOdxsyO_K5x2vvnj3bvzyRygl2M55IIGZad4tPKMx5eTbBWCsgsgMQ3Pm5wU2ZECvzHr2FrtE7f01xN887nCJUYjMPJG1qelJBOAopF8Q1gLlq6TyukuKtBBD3qLqOVYrnTzTNY6Qkd8dgl9VPIKiiEZ-aXsJYJulZLZ9d9XGN4uKVurBAJ78EpB8ZmcSYqeHyCMDWNN--cy_-z2NBL6J1WXn_v3hytTF2MOUp7BX5frB-',
          x: 100,
          y: 200,
          rotation: 2
        },
        {
          id: `art-${seed}-2`,
          type: 'sketch',
          title: 'Volume & Symmetry',
          subtitle: 'Aesthetic Line Study',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpH096TP60dp2OZFXGEnuzPf9oCWmtLgfZxwHzudYJkKl7GA-C9r4xFq06DkVOYv-uIGaZf1lO9wMrsPZJlPPEWcG92dGaehvdTs04EnoXklv53HRIWW71SlxgUXQ5TaMSlLJ_8vSkPkHJxBbMbo5b56VBn7RuE9p0Airr9oMbOAex5pZiaCpYQiMT3rr5qVWMv-CTDhzB_iXrbkrh1XgCRdiWohNYOt6Ozvqp63o0gxeLEVC8BYb4bw0ftLgkegoo-rL3VxPlj2W',
          x: 600,
          y: 140,
          rotation: -1
        },
        {
          id: `art-${seed}-3`,
          type: 'palette',
          title: 'Natural Tints',
          description: 'Oxidized metals paired with leaf ferments. Organic harmony.',
          colors: ['#4e635a', '#2c3e50', '#d1e8dd', '#845241'],
          x: 250,
          y: 500,
          rotation: 0
        },
        {
          id: `art-${seed}-4`,
          type: 'tile',
          title: 'Tectonic Shadow Lines',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTtD47UgWgr31iURF-P7714Fns-CBHJRGvXcPMl9mW7-zRgoL8rCN2Oc-9eK-F_Tj6nagGbCE-qzzeQPJSKRYzUZ71cS27igUjNVGR5fyHC2_xOJm2UX8fwLFaxiI4UocAOk3gefT6V4qbpkgUwaAYeUkWbC5ScjgrC_ppU4hYYuenX8gvoIjnM-d__NtQZTouI0w8nfP_y9Cyrz8aLbavpjJnWksRdQt1bqTKDsgUEetgCTJ7tHirhdwfwswSiTkY8tpuRegrGKD',
          x: 750,
          y: 520,
          rotation: 4
        }
      ]
    };

    customWorlds.push(newWorld);
    return res.json({ status: 'ok', source: 'procedural', world: newWorld });
  }

  try {
    const systemPromptMessage = `You are a professional worldbuilder, creative novelist, design director, and costume historian.
    You create incredibly rich, realistic sci-fi/historical textile civilizations.
    The user wants a brand new textile culture based on: "${prompt}".
    Respond strictly with a single JSON object.
    You must follow this schema EXACTLY.
    Do not add or omit properties. Do not wrap in markdown unless it is standard \`\`\`json.
    
    Expected JSON Schema:
    {
      "name": "Portuguese name of the textile culture (e.g., 'Telas Vulcânicas de Fogo')",
      "theme": "English summary of the environmental theme (e.g., 'Volcanic Islands')",
      "description": "Short poetic Portuguese description",
      "centralNode": {
        "id": "center-1",
        "type": "central",
        "title": "A title of the primary influencer thread (max 30 symbols, e.g., 'The Basalt Cord')",
        "description": "Short explanation in English"
      },
      "questions": [
        {
          "id": "q-1",
          "type": "question",
          "title": "A quotation question representing a mystery of this weave inside double quotes, in English (e.g., '\"How does steam dye fibers?\"')",
          "description": "A short answer to this mystery in English"
        },
        ... exactly 3 questions
      ],
      "archiveNodes": [
        { "id": "arch-climate", "type": "climate", "title": "Climate", "description": "English description of environment.", "status": "Active", "colors": ["#hex1", "#hex2"], "x": 700, "y": 350 },
        { "id": "arch-fiber", "type": "fiber", "title": "Fiber Source", "description": "Description of natural fiber origin.", "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBzEZBowTVRurTqHO5yNa2sg8WSWJhXSPumJbEsBxyDrAfCD2XPcsez5cXxeIJf9_JnZEfM-cj8SkyyvFmQeVNTq2ofE3gNTqlVBAlF1G-Bc-7GoHS-MRY5zaoL2JdgF5T1QdZwaOp1BKem4z5bZR88z6ArCeePcGa3xhoYdBruFvh2K5ig0Xo5rpQhcU6JXUCKdVtGgcSknhIaqGvFDzj7MN5W72Kk0JsuV0x57y2SCdcuScwgBOW3cifr9uvQIREd-xKreiWErG7Z", "x": 1100, "y": 280 },
        { "id": "arch-dyeworks", "type": "dyeworks", "title": "Dyeworks", "description": "Description of organic dyes.", "colors": ["#hex1", "#hex2", "#hex3"], "x": 1300, "y": 500 },
        { "id": "arch-hierarchy", "type": "hierarchy", "title": "Social Hierarchy", "description": "Social rules bound to clothing.", "x": 950, "y": 650 },
        { "id": "arch-pattern", "type": "pattern", "title": "Seasonal Pattern", "description": "Padrão de tecelagem e cores.", "colors": ["#hex1", "#hex2", "#hex3", "#hex4"], "x": 600, "y": 580 }
      ],
      "caseStudy": {
        "id": "cs-1",
        "code": "Case Study XXX (where XXX is 3 digits)",
        "title": "Rich title of this research case study in English",
        "description": "Short analytical introduction in English",
        "swatchName": "Name of the textile sample",
        "swatchColor": "A single representative colorful hex code (e.g. #E2725B)",
        "swatchImage": "https://lh3.googleusercontent.com/aida-public/AB6AXuAuJPFu8gbnyATerTxyX_v-iHFBbNwsN8r_hCvfn-p1GdCHJ1BN3tove49T8y8LEoYT2XM6Vv1mwl07T91uBrmlCkKr8kb-33jFp-ApDtDcc56qRokRFTmsYwEryBrB09M2CeamarkXEOCGAmggoH_7NK-usiW7uV-sWnKoHaxLQFOv9-kL94swgKu9HhOGU_G3dmUGyqttVuGr3MoUv-7WJ2VX_ZRqAgr7HK1m44lxppKYPpeSv-KcYgvMfBFi4cPCgadlcArSVoW4",
        "landscapeImage": "https://lh3.googleusercontent.com/aida-public/AB6AXuCF-Y01pgDLidqtiXB3xRBJY1NtiZ-3BoUNtz7xxGJSqSKzNrTB97QE0ttKHzKBMLu1xFIFvqJr2T5ii6L_TkVw449m3MCrF5gGVWpN2hTJg62R3qZG0NRIbazA76M0pp8MQXp3flu0c8zuGJuwJXPFfNuh3Gm2pg-8nLxHUwS8kNCuYROemOGG8oUUdxYrivxs2g9INjWiQncPbC0-4bW9a4h95tPQVtZtJlNe80fZx2WyKo6RBvdG6zV-J18nxFRcOucblpoysEni",
        "landscapeTitle": "A geographical milestone title",
        "landscapeDescription": "Detailed sentence explaining its altitude or geodynamic function",
        "snippet": "\"A medieval or ancient poetic quote about trade, thread, or the loom under double quotes in English\"",
        "snippetAuthor": "Mythological author, c. year",
        "techSpecs": {
          "composition": "Raw percentage split of natural and mythical ingredients",
          "weight": "Weight index e.g., '350g/m²'",
          "weave": "Weave kind e.g., 'Twill', 'Sateen', 'Jacquard Double-faced'",
          "warpCount": "warp count",
          "weftCount": "weft count",
          "permeability": "Permeability statement"
        }
      },
      "fabricDNA": {
        "durability": percentage scale (1-100),
        "porosity": percentage scale (1-100),
        "tensile": percentage scale (1-100),
        "luster": percentage scale (1-100),
        "weight": percentage scale (1-100)
      },
      "recommendedBase": {
        "name": "Weft/Twilled name representing the suggested yarn base",
        "grade": "Quality classification string e.g. Grade A-2 Premium",
        "heatRetention": percentage (e.g. 92),
        "moistureWick": percentage (e.g. 45)
      },
      "culturalAnchors": [
        { "title": "Anchor Title", "desc": "Anchor Description" },
        { "title": "Anchor Title 2", "desc": "Anchor Description 2" }
      ],
      "synthesisAccuracy": percentage with a decimal e.g. 95.3,
      "artifacts": [
        {
          "id": "art-1",
          "type": "swatch",
          "title": "Linen or Wool sample title",
          "subtitle": "SWATCH XXX",
          "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBXg337j2fNNmrEGh1y99EwmZVdZr245tVOdxsyO_K5x2vvnj3bvzyRygl2M55IIGZad4tPKMx5eTbBWCsgsgMQ3Pm5wU2ZECvzHr2FrtE7f01xN887nCJUYjMPJG1qelJBOAopF8Q1gLlq6TyukuKtBBD3qLqOVYrnTzTNY6Qkd8dgl9VPIKiiEZ-aXsJYJulZLZ9d9XGN4uKVurBAJ78EpB8ZmcSYqeHyCMDWNN--cy_-z2NBL6J1WXn_v3hytTF2MOUp7BX5frB-",
          "x": 120,
          "y": 180,
          "rotation": 1
        },
        {
          "id": "art-2",
          "type": "sketch",
          "title": "Expressive fashion sketch title",
          "subtitle": "Drawing study description",
          "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDDpH096TP60dp2OZFXGEnuzPf9oCWmtLgfZxwHzudYJkKl7GA-C9r4xFq06DkVOYv-uIGaZf1lO9wMrsPZJlPPEWcG92dGaehvdTs04EnoXklv53HRIWW71SlxgUXQ5TaMSlLJ_8vSkPkHJxBbMbo5b56VBn7RuE9p0Airr9oMbOAex5pZiaCpYQiMT3rr5qVWMv-CTDhzB_iXrbkrh1XgCRdiWohNYOt6Ozvqp63o0gxeLEVC8BYb4bw0ftLgkegoo-rL3VxPlj2W",
          "x": 580,
          "y": 150,
          "rotation": -3
        },
        {
          "id": "art-3",
          "type": "palette",
          "title": "Natural Color Palette",
          "description": "Short poetic matching description",
          "colors": ["#4e635a", "#2c3e50", "#d1e8dd", "#845241"],
          "x": 230,
          "y": 480,
          "rotation": 0
        },
        {
          "id": "art-4",
          "type": "tile",
          "title": "Abstract shadow title",
          "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDQTtD47UgWgr31iURF-P7714Fns-CBHJRGvXcPMl9mW7-zRgoL8rCN2Oc-9eK-F_Tj6nagGbCE-qzzeQPJSKRYzUZ71cS27igUjNVGR5fyHC2_xOJm2UX8fwLFaxiI4UocAOk3gefT6V4qbpkgUwaAYeUkWbC5ScjgrC_ppU4hYYuenX8gvoIjnM-d__NtQZTouI0w8nfP_y9Cyrz8aLbavpjJnWksRdQt1bqTKDsgUEetgCTJ7tHirhdwfwswSiTkY8tpuRegrGKD",
          "x": 760,
          "y": 510,
          "rotation": 2
        },
        {
          "id": "art-5",
          "type": "node",
          "title": "Cohesive myth branch title",
          "colors": ["#845241"],
          "x": 940,
          "y": 80,
          "rotation": 0
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Novo conceito: ${prompt}`,
      config: {
        systemInstruction: systemPromptMessage,
        responseMimeType: 'application/json'
      }
    });

    let resultText = response.text || '';
    // Clean up possible markdown wrappers
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedWorld = JSON.parse(resultText) as TextileWorld;

    // Set unique ID
    parsedWorld.id = `gen-${Date.now().toString(36)}`;
    
    // Validate image references inside fallback if Gemini suggests different unresolvable URLs
    parsedWorld.archiveNodes = parsedWorld.archiveNodes.map(node => {
      if (node.type === 'fiber' && !node.image) {
        node.image = DEFAULT_WORLDS[0].archiveNodes.find(n => n.type === 'fiber')?.image;
      }
      return node;
    });
    parsedWorld.artifacts = parsedWorld.artifacts.map(art => {
      const standard = DEFAULT_WORLDS[0].artifacts.find(a => a.type === art.type);
      if (standard && (!art.image || art.image.includes('placeholder'))) {
        art.image = standard.image;
      }
      return art;
    });

    customWorlds.push(parsedWorld);
    res.json({ status: 'ok', source: 'gemini', world: parsedWorld });

  } catch (error: any) {
    console.error('Gemini world generation failed:', error);
    res.status(500).json({ error: 'Falha ao processar a geração por inteligência artificial.', details: error.message });
  }
});

// 3. Question / Insight Thread Generator from Loom
app.post('/api/textile/explore', async (req, res) => {
  const { question, theme } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Falta fornecer uma pergunta para investigar.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Procedural reply
    const cleanQ = question.replace(/"/g, '');
    const mockReply = `Procedural response regarding: "${cleanQ}". Under ${theme || 'Arid Highland'} parameters, high clay particles act as natural insulators, increasing material resilience.`;
    return res.json({
      status: 'ok',
      source: 'procedural',
      title: question,
      description: mockReply,
      newQuestions: [
        `"How preserves the weft in extreme ${theme || 'Arid'} seasons?"`,
        `"Is ${theme || 'Arid'} altitude fermentation reproducible at sea level?"`,
        `"What pigments match this fiber's natural oils?"`
      ]
    });
  }

  try {
    const prompt = `You are a textile archaeologist and master narrator.
    The user is exploring a question: "${question}" inside the world theme or zone: "${theme || 'Arid Highland'}".
    Provide an analytical, poetic answer explaining the historical, geodynamic or technical significance of this phenomenon.
    Return strictly a JSON object with this exact schema:
    {
      "title": "The exact question asked",
      "description": "The detailed poetic historical answer (approx 100-150 words in Portuguese or English)",
      "newQuestions": [
        "\"Question 1 in double quotes in English?\"",
        "\"Question 2 in double quotes in English?\"",
        "\"Question 3 in double quotes in English?\""
      ]
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let text = response.text || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);

    res.json({
      status: 'ok',
      source: 'gemini',
      title: result.title || question,
      description: result.description,
      newQuestions: result.newQuestions
    });
  } catch (error: any) {
    console.error('Loom insight expansion failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Re-simulate stats of a world
app.post('/api/textile/resimulate', async (req, res) => {
  const { worldId, theme } = req.body;
  
  const ai = getGeminiClient();
  const baseRating = Math.random() * 8 + 90;

  if (!ai) {
    // Return pseudo-simulation stats
    return res.json({
      status: 'ok',
      source: 'procedural',
      synthesisAccuracy: parseFloat(baseRating.toFixed(1)),
      dna: {
        durability: Math.floor(Math.random() * 20 + 75),
        porosity: Math.floor(Math.random() * 30 + 50),
        tensile: Math.floor(Math.random() * 25 + 70),
        luster: Math.floor(Math.random() * 40 + 30),
        weight: Math.floor(Math.random() * 20 + 70),
      },
      morphologyReport: 'Fibras rústicas sintetizadas com sucesso. O alinhamento molecular está dentro do desvio tolerável.'
    });
  }

  try {
    const prompt = `Simulate a molecular and historical material-science report on the textile climate structure of "${theme || 'Arid Highland'}".
    Provide randomized synthetic optimization parameters for Durability, Porosity, Tensile strength, Luster, Weight, and a short morphology synthesis statement.
    Return strictly a JSON object with this exact schema:
    {
      "synthesisAccuracy": 90.0 to 99.8 random float,
      "dna": {
        "durability": random 1-100,
        "porosity": random 1-100,
        "tensile": random 1-100,
        "luster": random 1-100,
        "weight": random 1-100
      },
      "morphologyReport": "A concise Portuguese statement summarizing the updated microscopic fiber weave alignment under geothermal simulation."
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let text = response.text || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);

    res.json({
      status: 'ok',
      source: 'gemini',
      synthesisAccuracy: result.synthesisAccuracy,
      dna: result.dna,
      morphologyReport: result.morphologyReport
    });
  } catch (error: any) {
    console.error('Re-simulate failed:', error);
    res.status(500).json({ error: error.message });
  }
});


// Serve Vite or static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Oráculo Têxtil] Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
