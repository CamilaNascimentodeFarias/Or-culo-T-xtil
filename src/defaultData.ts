import { TextileWorld } from './types';

export const DEFAULT_WORLDS: TextileWorld[] = [
  {
    id: 'arid-highland',
    name: 'Rota da Seda de Platô',
    theme: 'Arid Highland',
    description: 'Bacia seca de altitude elevada onde o isolamento estimulou ornamentos complexos e resiliência das fibras.',
    centralNode: {
      id: 'center-1',
      type: 'central',
      title: 'The Silk Road Influence',
      description: 'The convergence of historical trade and geographical altitude.'
    },
    questions: [
      {
        id: 'q-1',
        type: 'question',
        title: '"How did the high altitude affect dye fermentation?"',
        description: 'Altitude limits oxygen levels, requiring prolonged wood fermentation for biological binding.'
      },
      {
        id: 'q-2',
        type: 'question',
        title: '"Symbolism of the Terracotta weave in high-court garments?"',
        description: 'Terracotta indicates lineage originating from clay flatlands, conveying authority and earth bonds.'
      },
      {
        id: 'q-3',
        type: 'question',
        title: '"Mineral pigments found in plateau basins?"',
        description: 'Manganese and copper-rich clay deposits are gathered during dry seasons to compound dark pigments.'
      }
    ],
    archiveNodes: [
      {
        id: 'arch-climate',
        type: 'climate',
        title: 'Climate',
        description: 'Highland tundra with short summers and extreme winds.',
        status: 'Active',
        colors: ['#edf4ff', '#c9dcf3'],
        x: 700,
        y: 350
      },
      {
        id: 'arch-fiber',
        type: 'fiber',
        title: 'Fiber Source',
        description: 'Long-staple wool from endemic rock-climbing sheep.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzEZBowTVRurTqHO5yNa2sg8WSWJhXSPumJbEsBxyDrAfCD2XPcsez5cXxeIJf9_JnZEfM-cj8SkyyvFmQeVNTq2ofE3gNTqlVBAlF1G-Bc-7GoHS-MRY5zaoL2JdgF5T1QdZwaOp1BKem4z5bZR88z6ArCeePcGa3xhoYdBruFvh2K5ig0Xo5rpQhcU6JXUCKdVtGgcSknhIaqGvFDzj7MN5W72Kk0JsuV0x57y2SCdcuScwgBOW3cifr9uvQIREd-xKreiWErG7Z',
        x: 1100,
        y: 280
      },
      {
        id: 'arch-dyeworks',
        type: 'dyeworks',
        title: 'Dyeworks',
        description: 'Utilizing lichen and rare minerals found in deep ravines.',
        colors: ['#845241', '#f8b7a2', '#683b2b'],
        x: 1300,
        y: 500
      },
      {
        id: 'arch-hierarchy',
        type: 'hierarchy',
        title: 'Social Hierarchy',
        description: 'Woven patterns denote lineage and seasonal task assignments.',
        x: 950,
        y: 650
      },
      {
        id: 'arch-pattern',
        type: 'pattern',
        title: 'Seasonal Pattern',
        description: 'Twill weave variant #43B.',
        colors: ['#edf4ff', '#5f5e5b', '#edf4ff', '#5f5e5b'],
        x: 600,
        y: 580
      }
    ],
    caseStudy: {
      id: 'cs-042',
      code: 'Case Study 042',
      title: 'Arid Plateau Trade Routes',
      description: 'Exploring the aesthetic convergence of geographical isolation and trans-continental trade during the late Middle Ages.',
      swatchName: 'Dusty Terracotta Weave',
      swatchColor: '#E2725B',
      swatchImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuJPFu8gbnyATerTxyX_v-iHFBbNwsN8r_hCvfn-p1GdCHJ1BN3tove49T8y8LEoYT2XM6Vv1mwl07T91uBrmlCkKr8kb-33jFp-ApDtDcc56qRokRFTmsYwEryBrB09M2CeamarkXEOCGAmggoH_7NK-usiW7uV-sWnKoHaxLQFOv9-kL94swgKu9HhOGU_G3dmUGyqttVuGr3MoUv-7WJ2VX_ZRqAgr7HK1m44lxppKYPpeSv-KcYgvMfBFi4cPCgadlcArSVoW4',
      landscapeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF-Y01pgDLidqtiXB3xRBJY1NtiZ-3BoUNtz7xxGJSqSKzNrTB97QE0ttKHzKBMLu1xFIFvqJr2T5ii6L_TkVw449m3MCrF5gGVWpN2hTJg62R3qZG0NRIbazA76M0pp8MQXp3flu0c8zuGJuwJXPFfNuh3Gm2pg-8nLxHUwS8kNCuYROemOGG8oUUdxYrivxs2g9INjWiQncPbC0-4bW9a4h95tPQVtZtJlNe80fZx2WyKo6RBvdG6zV-J18nxFRcOucblpoysEni',
      landscapeTitle: 'The High Basin',
      landscapeDescription: 'The primary origin point for the mineral pigments used in the 14th-century silk cycles.',
      snippet: '"The caravans did not merely carry goods; they carried the memory of the loom. In every desert stop, the weave evolved, absorbing the dust of the road into its very soul."',
      snippetAuthor: 'Chronicler of the Red Road, c. 1384',
      techSpecs: {
        composition: '60% Mohair Alpaca, 40% Gilded Silk',
        weight: '420g/m²',
        weave: 'Broken Twill Weave',
        warpCount: '48 TPI',
        weftCount: '36 TPI',
        permeability: 'High Breathability, Exceptional Thermal Retention'
      }
    },
    fabricDNA: {
      durability: 80,
      porosity: 67,
      tensile: 75,
      luster: 50,
      weight: 83
    },
    recommendedBase: {
      name: 'Twilled Mohair',
      grade: 'Grade A-1 Refinement',
      heatRetention: 92,
      moistureWick: 45
    },
    culturalAnchors: [
      {
        title: 'Nomadic Portability',
        desc: 'Garments must double as shelter or bedding when disassembled.'
      },
      {
        title: 'Status Weaving',
        desc: 'Complexity of thread counts correlates to family altitude history.'
      }
    ],
    synthesisAccuracy: 94.8,
    artifacts: [
      {
        id: 'art-1',
        type: 'swatch',
        title: 'Heavy Weave Linen',
        subtitle: 'SWATCH 042',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXg337j2fNNmrEGh1y99EwmZVdZr245tVOdxsyO_K5x2vvnj3bvzyRygl2M55IIGZad4tPKMx5eTbBWCsgsgMQ3Pm5wU2ZECvzHr2FrtE7f01xN887nCJUYjMPJG1qelJBOAopF8Q1gLlq6TyukuKtBBD3qLqOVYrnTzTNY6Qkd8dgl9VPIKiiEZ-aXsJYJulZLZ9d9XGN4uKVurBAJ78EpB8ZmcSYqeHyCMDWNN--cy_-z2NBL6J1WXn_v3hytTF2MOUp7BX5frB-',
        x: 120,
        y: 190,
        rotation: 1
      },
      {
        id: 'art-2',
        type: 'sketch',
        title: 'Volume & Void',
        subtitle: 'Couture Silhouette Note',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpH096TP60dp2OZFXGEnuzPf9oCWmtLgfZxwHzudYJkKl7GA-C9r4xFq06DkVOYv-uIGaZf1lO9wMrsPZJlPPEWcG92dGaehvdTs04EnoXklv53HRIWW71SlxgUXQ5TaMSlLJ_8vSkPkHJxBbMbo5b56VBn7RuE9p0Airr9oMbOAex5pZiaCpYQiMT3rr5qVWMv-CTDhzB_iXrbkrh1XgCRdiWohNYOt6Ozvqp63o0gxeLEVC8BYb4bw0ftLgkegoo-rL3VxPlj2W',
        x: 580,
        y: 160,
        rotation: -2
      },
      {
        id: 'art-3',
        type: 'palette',
        title: 'Inspiration Palette',
        description: 'Oxidized copper meet hand-dyed woad. A narrative of age and earth.',
        colors: ['#4e635a', '#2c3e50', '#d1e8dd', '#845241'],
        x: 230,
        y: 490,
        rotation: 0
      },
      {
        id: 'art-4',
        type: 'tile',
        title: 'Architectural Shadows',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTtD47UgWgr31iURF-P7714Fns-CBHJRGvXcPMl9mW7-zRgoL8rCN2Oc-9eK-F_Tj6nagGbCE-qzzeQPJSKRYzUZ71cS27igUjNVGR5fyHC2_xOJm2UX8fwLFaxiI4UocAOk3gefT6V4qbpkgUwaAYeUkWbC5ScjgrC_ppU4hYYuenX8gvoIjnM-d__NtQZTouI0w8nfP_y9Cyrz8aLbavpjJnWksRdQt1bqTKDsgUEetgCTJ7tHirhdwfwswSiTkY8tpuRegrGKD',
        x: 770,
        y: 520,
        rotation: 3
      },
      {
        id: 'art-5',
        type: 'node',
        title: 'Mythological Hook',
        colors: ['#845241'],
        x: 950,
        y: 90,
        rotation: 0
      }
    ]
  },
  {
    id: 'volcanic-archipelago',
    name: 'Telas Vulcânicas de Fogo',
    theme: 'Volcanic Islands',
    description: 'Fibras rústicas tecidas à sombra de caldeiras ativas, tingidas com cinzas sulfúricas e algas marinhas ricas em ferro.',
    centralNode: {
      id: 'center-2',
      type: 'central',
      title: 'Volcanic Basalt Fleece',
      description: 'The convergence of geotectonic heat and maritime harvesting.'
    },
    questions: [
      {
        id: 'q2-1',
        type: 'question',
        title: '"How does sulfuric steam speed up fiber contraction?"',
        description: 'Exposure to volcanic geyser steam natural-shrinks fibers, raising wind-resistance twofold.'
      },
      {
        id: 'q2-2',
        type: 'question',
        title: '"Why does black basalt ash act as a pigment fastener?"',
        description: 'Basalt ash contains heavy volcanic vitriol minerals which chemically lock biological red dyes.'
      },
      {
        id: 'q2-3',
        type: 'question',
        title: '"The symbolic whalebone loom of the high priestesses?"',
        description: 'Priestesses use carbonized cedar and whalebone needles to weave protections against seismic waves.'
      }
    ],
    archiveNodes: [
      {
        id: 'arch2-climate',
        type: 'climate',
        title: 'Climate',
        description: 'Tectonic marine coast, high humidity and permanent sulfur haze.',
        status: 'Active',
        colors: ['#ffefea', '#cee5da'],
        x: 700,
        y: 350
      },
      {
        id: 'arch2-fiber',
        type: 'fiber',
        title: 'Fiber Source',
        description: 'Basalt-hued fleece gathered from shoreline volcanic goats.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzEZBowTVRurTqHO5yNa2sg8WSWJhXSPumJbEsBxyDrAfCD2XPcsez5cXxeIJf9_JnZEfM-cj8SkyyvFmQeVNTq2ofE3gNTqlVBAlF1G-Bc-7GoHS-MRY5zaoL2JdgF5T1QdZwaOp1BKem4z5bZR88z6ArCeePcGa3xhoYdBruFvh2K5ig0Xo5rpQhcU6JXUCKdVtGgcSknhIaqGvFDzj7MN5W72Kk0JsuV0x57y2SCdcuScwgBOW3cifr9uvQIREd-xKreiWErG7Z',
        x: 1100,
        y: 280
      },
      {
        id: 'arch2-dyeworks',
        type: 'dyeworks',
        title: 'Sulfur Dyeworks',
        description: 'Iron-sulfide fermentation yielding deep charcoal and yellow-bronze.',
        colors: ['#ffdbcf', '#845241', '#331105'],
        x: 1300,
        y: 500
      },
      {
        id: 'arch2-hierarchy',
        type: 'hierarchy',
        title: 'Seafarer Clans',
        description: 'Bands of maritime weavers, distinct styles correspond to volcano proximity.',
        x: 950,
        y: 650
      },
      {
        id: 'arch2-pattern',
        type: 'pattern',
        title: 'Tectonic Inlays',
        description: 'Weave reinforced with metallic volcanic cords.',
        colors: ['#cee5da', '#845241', '#331105', '#ffdbcf'],
        x: 600,
        y: 580
      }
    ],
    caseStudy: {
      id: 'cs-volc',
      code: 'Case Study 112',
      title: 'Geodynamic Oceanic Fabrics',
      description: 'Understanding how oceanic humidity and magma vents mold custom fiber shrinkage and tectonic pigments.',
      swatchName: 'Tectonic Ash Velvet',
      swatchColor: '#331105',
      swatchImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuJPFu8gbnyATerTxyX_v-iHFBbNwsN8r_hCvfn-p1GdCHJ1BN3tove49T8y8LEoYT2XM6Vv1mwl07T91uBrmlCkKr8kb-33jFp-ApDtDcc56qRokRFTmsYwEryBrB09M2CeamarkXEOCGAmggoH_7NK-usiW7uV-sWnKoHaxLQFOv9-kL94swgKu9HhOGU_G3dmUGyqttVuGr3MoUv-7WJ2VX_ZRqAgr7HK1m44lxppKYPpeSv-KcYgvMfBFi4cPCgadlcArSVoW4',
      landscapeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFsfMA7ikSWIvIR_rYZueGw3bDVbmzxCn8QHsI6zwW6kXsAL-0vhGdA1_Kj6xup0to_wRyt4b9LpixFFDRI4Pr3OnH9RNxj1n_iwUEdDGOkcTy333Nl9NiDCbyszR_pRSCBAIXnySUilZjOoBOejXh3RYaymorrEOR2Xbmisj2wBN9ScNJGzKPxFFtxz_7ZkdB2YCEYcqy21Ut6bcl7ao09mqELATmG-SB_p17ZknCqYnhWD69600vPv9egtuI0mIk2DCpIb3an6SF',
      landscapeTitle: 'Iron Caldera Coast',
      landscapeDescription: 'Active vents where seaweed is mineralized under pressure.',
      snippet: '"The thread is born in the smoke and baptized in tidal foam. It does not fear the flame, for its parents are born of basalt mud."',
      snippetAuthor: 'Heir of the Charcoal Loom, c. 1105',
      techSpecs: {
        composition: '70% Basalt Goat Fleece, 30% Kelp Viscose',
        weight: '550g/m²',
        weave: 'Tight Rib Weave',
        warpCount: '32 TPI',
        weftCount: '24 TPI',
        permeability: 'Waterproof, Thermic Reflector'
      }
    },
    fabricDNA: {
      durability: 96,
      porosity: 40,
      tensile: 90,
      luster: 32,
      weight: 95
    },
    recommendedBase: {
      name: 'Basalt Ribbon Felt',
      grade: 'Grade S-3 Heat Resistant',
      heatRetention: 98,
      moistureWick: 30
    },
    culturalAnchors: [
      {
        title: 'Heat Attunement',
        desc: 'Protective gear worn near vents must withstand open flame contact.'
      },
      {
        title: 'Algae Seeding',
        desc: 'Clans store kelp under basalt blocks to ferment rich ocean dyes.'
      }
    ],
    synthesisAccuracy: 91.2,
    artifacts: [
      {
        id: 'art2-1',
        type: 'swatch',
        title: 'Sulfur Twill',
        subtitle: 'SWATCH 112',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXg337j2fNNmrEGh1y99EwmZVdZr245tVOdxsyO_K5x2vvnj3bvzyRygl2M55IIGZad4tPKMx5eTbBWCsgsgMQ3Pm5wU2ZECvzHr2FrtE7f01xN887nCJUYjMPJG1qelJBOAopF8Q1gLlq6TyukuKtBBD3qLqOVYrnTzTNY6Qkd8dgl9VPIKiiEZ-aXsJYJulZLZ9d9XGN4uKVurBAJ78EpB8ZmcSYqeHyCMDWNN--cy_-z2NBL6J1WXn_v3hytTF2MOUp7BX5frB-',
        x: 100,
        y: 200,
        rotation: 3
      },
      {
        id: 'art2-2',
        type: 'sketch',
        title: 'Caldera Cape',
        subtitle: 'Sacred Ritual Draft',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpH096TP60dp2OZFXGEnuzPf9oCWmtLgfZxwHzudYJkKl7GA-C9r4xFq06DkVOYv-uIGaZf1lO9wMrsPZJlPPEWcG92dGaehvdTs04EnoXklv53HRIWW71SlxgUXQ5TaMSlLJ_8vSkPkHJxBbMbo5b56VBn7RuE9p0Airr9oMbOAex5pZiaCpYQiMT3rr5qVWMv-CTDhzB_iXrbkrh1XgCRdiWohNYOt6Ozvqp63o0gxeLEVC8BYb4bw0ftLgkegoo-rL3VxPlj2W',
        x: 600,
        y: 150,
        rotation: -4
      }
    ]
  }
];
