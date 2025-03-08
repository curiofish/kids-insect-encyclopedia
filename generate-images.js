require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

const engineId = 'stable-diffusion-xl-1024-v1-0';
const apiHost = 'https://api.stability.ai';

// 곤충 데이터
const insects = [
    {
        name: "호랑나비",
        category: "butterflies",
        prompt: "Create exactly one single Korean Yellow Swallowtail (Papilio xuthus) in vintage scientific illustration style. Strict requirement: only one butterfly in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle yellow and black watercolor washes. The butterfly must be positioned in dorsal view with wings fully spread, showing detailed anatomical features: compound eyes, coiled proboscis, segmented antennae, detailed wing patterns with clear veination, thorax structure, and articulated legs. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "무당벌레",
        category: "beetles",
        prompt: "Create exactly one single Seven-spotted Ladybug (Coccinella septempunctata) in vintage scientific illustration style. Strict requirement: only one ladybug in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle red and black watercolor washes. The ladybug must be positioned in dorsal view with elytra clearly visible, showing detailed anatomical features: compound eyes, segmented antennae, precisely seven black spots on red wing covers, thorax markings, and articulated legs. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "장수풍뎅이",
        category: "beetles",
        prompt: "Create exactly one single Japanese Rhinoceros Beetle (Allomyrina dichotoma) in vintage scientific illustration style. Strict requirement: only one beetle in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and black watercolor washes. The beetle must be positioned in side view showing the horn profile, showing detailed anatomical features: distinctive horn structure, compound eyes, segmented antennae, textured elytra, powerful legs with visible joints, and thorax detail. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "사마귀",
        category: "grasshoppers",
        prompt: "Create exactly one single Praying Mantis (Tenodera sinensis) in vintage scientific illustration style. Strict requirement: only one mantis in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle green and brown watercolor washes. The mantis must be positioned in side view with raptorial forelegs visible, showing detailed anatomical features: triangular head, compound eyes, distinctive prayer-like forelegs, wing detail, segmented abdomen, and thorax structure. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "매미",
        category: "bees_moths",
        prompt: "Create exactly one single Cicada (Cryptotympana dubia) in vintage scientific illustration style. Strict requirement: only one cicada in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and black watercolor washes. The cicada must be positioned in dorsal view with wings spread, showing detailed anatomical features: large compound eyes, transparent wing membranes with clear venation, broad head, segmented body, and sturdy legs. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "잠자리",
        category: "dragonflies",
        prompt: "Create exactly one single Korean Dragonfly (Anax parthenope) in vintage scientific illustration style. Strict requirement: only one dragonfly in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle blue and brown watercolor washes. The dragonfly must be positioned in dorsal view with all four wings spread, showing detailed anatomical features: large compound eyes, intricate wing venation, long segmented abdomen, thorax structure, and detailed leg joints. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "꿀벌",
        category: "bees_moths",
        prompt: "Create exactly one single Asian Honeybee (Apis cerana) in vintage scientific illustration style. Strict requirement: only one bee in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle golden-brown and black watercolor washes. The bee must be positioned in side view with wings slightly spread, showing detailed anatomical features: compound eye, segmented antennae, articulated legs with pollen baskets, fuzzy thorax, striped abdomen, and transparent wing membranes with clear venation. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "귀뚜라미",
        category: "grasshoppers",
        prompt: "Create exactly one single Field Cricket (Gryllus bimaculatus) in vintage scientific illustration style. Strict requirement: only one cricket in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and black watercolor washes. The cricket must be positioned in side view with long antennae extended, showing detailed anatomical features: prominent jumping legs, wing structure, segmented antennae, cerci, and detailed leg joints. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "방아깨비",
        category: "grasshoppers",
        prompt: "Create exactly one single Rice Grasshopper (Oxya chinensis) in vintage scientific illustration style. Strict requirement: only one grasshopper in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle green and brown watercolor washes. The grasshopper must be positioned in side view with jumping legs extended, showing detailed anatomical features: compound eyes, segmented antennae, powerful hind legs, wing structure, and segmented abdomen. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    },
    {
        name: "하늘소",
        category: "beetles",
        prompt: "Create exactly one single Asian Long-horned Beetle (Anoplophora glabripennis) in vintage scientific illustration style. Strict requirement: only one beetle in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle black and white watercolor washes. The beetle must be positioned in side view with long antennae extended, showing detailed anatomical features: distinctive long antennae, compound eyes, textured elytra with spots, segmented legs, and thorax structure. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques.",
        negative_prompt: "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"
    }
];

async function generateImage(insect) {
    try {
        console.log(`Generating image for ${insect.name}...`);

        const response = await fetch(
            `${apiHost}/v1/generation/${engineId}/text-to-image`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                },
                body: JSON.stringify({
                    text_prompts: [
                        {
                            text: insect.prompt,
                            weight: 1
                        },
                        ...(insect.negative_prompt ? [{
                            text: insect.negative_prompt,
                            weight: -1
                        }] : [])
                    ],
                    cfg_scale: parseInt(process.env.IMAGE_CFG_SCALE),
                    steps: parseInt(process.env.IMAGE_STEPS),
                    width: 1024,
                    height: 1024,
                    samples: 1,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();
        
        // 이미지 데이터 (base64)
        const image = responseJSON.artifacts[0];
        
        // 이미지 저장 경로 설정
        const imagePath = path.join(__dirname, 'images', insect.category, `${insect.name}.png`);
        
        // 이미지 저장
        await fs.writeFile(imagePath, Buffer.from(image.base64, 'base64'));
        console.log(`Image saved for ${insect.name} at ${imagePath}`);
        
        // 생성 사이에 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
        console.error(`Error generating image for ${insect.name}:`, error);
    }
}

// 이미지 생성 시작
const insectsToGenerate = ["꿀벌"];
const selectedInsects = insects.filter(insect => insectsToGenerate.includes(insect.name));

generateAllImages().then(() => {
    console.log('Selected images generated successfully!');
}).catch(error => {
    console.error('Error generating images:', error);
});

async function generateAllImages() {
    for (const insect of selectedInsects) {
        await generateImage(insect);
    }
} 