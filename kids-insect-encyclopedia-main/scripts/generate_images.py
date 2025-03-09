import os
import requests
import json
from pathlib import Path

# 로컬 Stable Diffusion API URL로 변경
API_URL = "http://localhost:7860/sdapi/v1/txt2img"

def create_image_directory():
    """이미지 저장을 위한 디렉토리 생성"""
    base_path = Path("images/insects")
    base_path.mkdir(parents=True, exist_ok=True)
    return base_path

def generate_image(prompt, negative_prompt, output_path):
    """Stable Diffusion API를 사용하여 이미지 생성"""
    payload = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "steps": 30,
        "width": 1024,
        "height": 1024,
        "cfg_scale": 7,
        "sampler_name": "DPM++ 2M Karras",
        "n_iter": 1,
        "batch_size": 1
    }

    try:
        response = requests.post(API_URL, json=payload)
        if response.status_code == 200:
            r = response.json()
            # base64 이미지 데이터를 파일로 저장
            import base64
            image_data = base64.b64decode(r['images'][0])
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"이미지가 성공적으로 생성되었습니다: {output_path}")
        else:
            print(f"에러 발생: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"이미지 생성 중 오류 발생: {str(e)}")

def main():
    """메인 실행 함수"""
    base_path = create_image_directory()
    
    # 공통 negative prompt
    negative_prompt = "multiple insects, groups, pairs, pattern, collection, collage, specimen plate, decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect"

    # 곤충 목록과 프롬프트
    insects = {
        "호랑나비": {
            "filename": "tiger_butterfly.webp",
            "prompt": """Create exactly one single Tiger Swallowtail Butterfly (Papilio xuthus) in vintage scientific illustration style. Strict requirement: only one butterfly in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle yellow and black watercolor washes. The butterfly must be positioned in dorsal view with wings spread, showing detailed anatomical features: black-striped yellow wings, distinctive swallowtail extensions, prominent wing veins, segmented body, and delicate antennae. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "배추흰나비": {
            "filename": "cabbage_butterfly.webp",
            "prompt": """Create exactly one single Cabbage White Butterfly (Pieris rapae) in vintage scientific illustration style. Strict requirement: only one butterfly in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle white and grey watercolor washes. The butterfly must be positioned in dorsal view with wings spread, showing detailed anatomical features: white wings with black wing tips, delicate wing veins, slender body, and thin antennae. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "산누에나방": {
            "filename": "silkmoth.webp",
            "prompt": """Create exactly one single Japanese Oak Silkmoth (Antheraea yamamai) in vintage scientific illustration style. Strict requirement: only one moth in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and yellow watercolor washes. The moth must be positioned in dorsal view with wings spread, showing detailed anatomical features: large eyespots on wings, feathered antennae, robust body, and intricate wing patterns. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "무당벌레": {
            "filename": "ladybug.webp",
            "prompt": """Create exactly one single Seven-spotted Ladybug (Coccinella septempunctata) in vintage scientific illustration style. Strict requirement: only one beetle in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle red and black watercolor washes. The ladybug must be positioned in dorsal view, showing detailed anatomical features: dome-shaped body, seven black spots on red wing covers, small head, and delicate legs. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "장수풍뎅이": {
            "filename": "rhinoceros_beetle.webp",
            "prompt": """Create exactly one single Japanese Rhinoceros Beetle (Allomyrina dichotoma) in vintage scientific illustration style. Strict requirement: only one beetle in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and black watercolor washes. The beetle must be positioned in lateral view, showing detailed anatomical features: prominent Y-shaped horn, robust exoskeleton, powerful legs, detailed mandibles, and textured wing covers. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "하늘소": {
            "filename": "longhorn_beetle.webp",
            "prompt": """Create exactly one single Musk Beetle (Aromia moschata) in vintage scientific illustration style. Strict requirement: only one beetle in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle metallic green and blue watercolor washes. The beetle must be positioned in dorsal view, showing detailed anatomical features: elongated body, extremely long antennae, metallic sheen on wing covers, and slender legs. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "귀뚜라미": {
            "filename": "cricket.webp",
            "prompt": """Create exactly one single Field Cricket (Gryllus campestris) in vintage scientific illustration style. Strict requirement: only one cricket in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and black watercolor washes. The cricket must be positioned in lateral view, showing detailed anatomical features: long antennae, powerful jumping legs, wing covers with sound-producing structures, and distinctive ovipositor. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "방아깨비": {
            "filename": "grasshopper.webp",
            "prompt": """Create exactly one single Long-headed Grasshopper (Acrida cinerea) in vintage scientific illustration style. Strict requirement: only one grasshopper in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle green and brown watercolor washes. The grasshopper must be positioned in lateral view, showing detailed anatomical features: elongated head, long antennae, powerful hind legs, and long wings. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "사마귀": {
            "filename": "mantis.webp",
            "prompt": """Create exactly one single Chinese Mantis (Tenodera sinensis) in vintage scientific illustration style. Strict requirement: only one mantis in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle green watercolor washes. The mantis must be positioned in frontal view with raised forelegs, showing detailed anatomical features: triangular head, large compound eyes, raptorial forelegs, and folded wings. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "잠자리": {
            "filename": "dragonfly.webp",
            "prompt": """Create exactly one single Globe Skimmer Dragonfly (Pantala flavescens) in vintage scientific illustration style. Strict requirement: only one dragonfly in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle amber and brown watercolor washes. The dragonfly must be positioned in dorsal view with wings spread, showing detailed anatomical features: large compound eyes, long slender body, transparent veined wings, and distinctive wing patterns. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "실잠자리": {
            "filename": "damselfly.webp",
            "prompt": """Create exactly one single Jewelwing Damselfly (Calopteryx atrata) in vintage scientific illustration style. Strict requirement: only one damselfly in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle metallic blue and black watercolor washes. The damselfly must be positioned in lateral view with wings folded, showing detailed anatomical features: slender body, delicate wings, long abdomen, and distinctive wing venation. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "꿀벌": {
            "filename": "honeybee.webp",
            "prompt": """Create exactly one single Western Honey Bee (Apis mellifera) in vintage scientific illustration style. Strict requirement: only one bee in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle yellow and brown watercolor washes. The bee must be positioned in lateral view, showing detailed anatomical features: fuzzy body, transparent wings, pollen baskets on legs, segmented abdomen, and distinctive stripes. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "개미": {
            "filename": "ant.webp",
            "prompt": """Create exactly one single Carpenter Ant (Camponotus japonicus) in vintage scientific illustration style. Strict requirement: only one ant in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle black and brown watercolor washes. The ant must be positioned in lateral view, showing detailed anatomical features: segmented body, distinct thorax, powerful mandibles, jointed legs, and antennae. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "말벌": {
            "filename": "hornet.webp",
            "prompt": """Create exactly one single Asian Giant Hornet (Vespa mandarinia) in vintage scientific illustration style. Strict requirement: only one hornet in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle orange and black watercolor washes. The hornet must be positioned in lateral view, showing detailed anatomical features: large head, powerful mandibles, distinctive striped pattern, robust body, and transparent wings. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "노린재": {
            "filename": "stinkbug.webp",
            "prompt": """Create exactly one single Brown Marmorated Stink Bug (Halyomorpha halys) in vintage scientific illustration style. Strict requirement: only one bug in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle brown and grey watercolor washes. The bug must be positioned in dorsal view, showing detailed anatomical features: shield-shaped body, distinctive marbled pattern, segmented antennae, and folded wings. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        },
        "매미": {
            "filename": "cicada.webp",
            "prompt": """Create exactly one single Black Cicada (Cryptotympana facialis) in vintage scientific illustration style. Strict requirement: only one cicada in the entire image. Use precise fine black ink lines to define form and structure, then apply subtle black and brown watercolor washes. The cicada must be positioned in dorsal view with wings spread, showing detailed anatomical features: large compound eyes, transparent veined wings, robust body, and sound-producing tymbals. Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. Pure white background with absolutely no decorative elements. Reference style: 19th century entomological illustration techniques."""
        }
    }

    # 각 곤충에 대해 이미지 생성
    for insect_name, info in insects.items():
        output_path = base_path / info["filename"]
        print(f"{insect_name} 이미지 생성 중...")
        generate_image(info["prompt"], negative_prompt, output_path)

if __name__ == "__main__":
    main() 