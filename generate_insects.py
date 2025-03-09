import requests
import json
import os
from datetime import datetime
from dotenv import load_dotenv
import base64

# .env 파일 로드
load_dotenv()

class InsectIllustrationGenerator:
    def __init__(self, api_key):
        self.api_key = api_key
        self.api_url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
        self.output_dir = "images/insects"
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_insect(self, insect_info, variation_type):
        # 곤충별 디렉토리 생성
        insect_dir = os.path.join(self.output_dir, insect_info['korean_name'].lower())
        os.makedirs(insect_dir, exist_ok=True)

        prompt = f"""Create exactly one single {insect_info['name']} ({insect_info['scientific_name']}) in vintage scientific illustration style. 
        Key requirements:
        1. Child-friendly appearance while maintaining scientific accuracy
        2. Clear, clean lines with educational value
        3. Precise anatomical details but not scary or intimidating
        4. Use precise fine black ink lines to define form and structure
        5. Apply subtle {insect_info['colors']} watercolor washes
        6. Position in {insect_info['viewpoint']} view showing {insect_info['pose']}
        7. Show detailed features: {insect_info['features']}
        8. Pure white background
        9. Match the style of 19th century scientific illustration
        10. Ensure the entire insect is visible
        
        Style reference: Classic natural history illustration with educational focus."""

        negative_prompt = """multiple insects, groups, pairs, pattern, collection, 
        collage, specimen plate, decorative border, text, labels, numbers, 
        botanical elements, leaves, flowers, creative interpretation, modern style, 
        digital effects, filters, heavy shading, dark colors, artistic freedom, 
        symmetrical arrangement, repeating elements, mirror images, kaleidoscope effect, 
        scary details, intimidating features, partial views, cropped images"""

        # 군집 이미지일 경우 negative prompt에서 multiple insects 제외
        if variation_type == "group":
            negative_prompt = negative_prompt.replace("multiple insects, ", "")

        payload = {
            "text_prompts": [
                {
                    "text": prompt,
                    "weight": 1
                },
                {
                    "text": negative_prompt,
                    "weight": -1
                }
            ],
            "cfg_scale": 7,
            "height": 1024,
            "width": 1024,
            "samples": 1,
            "steps": 30
        }

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        try:
            response = requests.post(self.api_url, json=payload, headers=headers)
            response.raise_for_status()
            result = response.json()
            
            print(f"API Response: {json.dumps(result, indent=2)}")
            
            if 'artifacts' in result:
                # 이미지 파일명 생성
                filename = f"{variation_type}"
                
                # 이미지 저장
                image_path = os.path.join(insect_dir, f"{filename}.png")
                
                # base64로 인코딩된 이미지 저장
                for i, image in enumerate(result['artifacts']):
                    image_data = base64.b64decode(image['base64'])
                    with open(image_path, 'wb') as f:
                        f.write(image_data)
                    print(f"Image saved to {image_path}")
                
                # 메타데이터 저장
                metadata_path = os.path.join(insect_dir, f"{filename}.json")
                with open(metadata_path, "w", encoding='utf-8') as f:
                    json.dump({
                        "insect_info": insect_info,
                        "prompt": prompt,
                        "result": result
                    }, f, indent=2, ensure_ascii=False)
                
                return result
            else:
                print(f"Error: {result.get('message', 'Unknown error')}")
                return None
                
        except Exception as e:
            print(f"Error generating image: {str(e)}")
            return None

class EcosystemIllustrationGenerator:
    def __init__(self, api_key):
        self.api_key = api_key
        self.api_url = "https://stablediffusionapi.com/api/v3/text2img"
        self.output_dir = "images/ecosystem"
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_illustration(self, image_info):
        prompt = f"""Create a child-friendly educational illustration about {image_info['subject']} in vintage scientific illustration style.
        Key requirements:
        1. Child-friendly and educational appearance
        2. Clear, clean lines with educational value
        3. Use precise fine black ink lines and subtle watercolor washes
        4. Show {image_info['details']}
        5. Pure white background
        6. Match the style of 19th century scientific illustration
        7. Focus on {image_info['focus']}
        
        Style reference: Classic natural history illustration with educational focus."""

        negative_prompt = """scary details, intimidating features, dark colors, 
        creative interpretation, modern style, digital effects, filters, 
        heavy shading, artistic freedom"""

        payload = {
            "key": self.api_key,
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "width": "512",
            "height": "512",
            "samples": "1",
            "num_inference_steps": "20",
            "safety_checker": "yes"
        }

        try:
            response = requests.post(self.api_url, json=payload)
            response.raise_for_status()
            result = response.json()
            
            # 디버깅을 위한 응답 출력
            print(f"API Response: {json.dumps(result, indent=2)}")
            
            if result.get('status') == 'success':
                # 이미지 파일명 생성
                filename = image_info['filename']
                
                # 이미지 저장
                image_path = os.path.join(self.output_dir, f"{filename}.webp")
                
                # 이미지 URL 가져오기
                image_url = result.get('output', [None])[0]
                if image_url:
                    try:
                        # 이미지 다운로드
                        image_response = requests.get(image_url)
                        image_response.raise_for_status()
                        
                        # 이미지 저장
                        with open(image_path, 'wb') as f:
                            f.write(image_response.content)
                        print(f"Image saved to {image_path}")
                    except Exception as e:
                        print(f"Error downloading image: {str(e)}")
                        return None
                
                # 메타데이터 저장
                metadata_path = os.path.join(self.output_dir, f"{filename}.json")
                with open(metadata_path, "w", encoding='utf-8') as f:
                    json.dump({
                        "image_info": image_info,
                        "prompt": prompt,
                        "result": result
                    }, f, indent=2, ensure_ascii=False)
                
                return result
            else:
                print(f"Error: {result.get('message', 'Unknown error')}")
                return None
                
        except Exception as e:
            print(f"Error generating image: {str(e)}")
            return None

# 곤충 정보 목록
insects = [
    {
        "name": "Ladybug",
        "korean_name": "무당벌레",
        "scientific_name": "Coccinella septempunctata",
        "variations": [
            {
                "type": "main",
                "colors": "red and black",
                "viewpoint": "dorsal",
                "pose": "walking position with slightly spread wings",
                "features": "spotted wing covers, black head, detailed legs and antennae, characteristic round shape"
            },
            {
                "type": "eating",
                "colors": "red and black",
                "viewpoint": "side",
                "pose": "feeding on aphids on a leaf",
                "features": "visible mouthparts, focused on prey, natural predatory behavior"
            },
            {
                "type": "flying",
                "colors": "red and black with visible inner wings",
                "viewpoint": "side-dorsal",
                "pose": "wings spread in flight position",
                "features": "spread elytra, extended flying wings, airborne posture"
            },
            {
                "type": "group",
                "colors": "red and black",
                "viewpoint": "varied angles",
                "pose": "small group gathering on a leaf",
                "features": "multiple ladybugs showing social behavior, natural clustering"
            }
        ]
    },
    {
        "name": "Swallowtail Butterfly",
        "korean_name": "호랑나비",
        "scientific_name": "Papilio xuthus",
        "variations": [
            {
                "type": "main",
                "colors": "yellow and black",
                "viewpoint": "dorsal with wings spread",
                "pose": "resting on a flower with wings fully displayed",
                "features": "large yellow wings with black stripes, long tails on hindwings, detailed wing patterns"
            },
            {
                "type": "eating",
                "colors": "yellow and black",
                "viewpoint": "side",
                "pose": "feeding on flower nectar with proboscis extended",
                "features": "extended proboscis, delicate legs gripping flower, natural feeding behavior"
            },
            {
                "type": "flying",
                "colors": "yellow and black",
                "viewpoint": "side-dorsal",
                "pose": "mid-flight with wings in motion",
                "features": "wings in flight position, graceful movement, dynamic pose"
            },
            {
                "type": "group",
                "colors": "yellow and black",
                "viewpoint": "varied angles",
                "pose": "multiple butterflies around flowers",
                "features": "social gathering, natural interaction with flowers, varied wing positions"
            }
        ]
    },
    {
        "name": "Honeybee",
        "korean_name": "꿀벌",
        "scientific_name": "Apis mellifera",
        "variations": [
            {
                "type": "main",
                "colors": "golden brown and black",
                "viewpoint": "side-dorsal",
                "pose": "standing position showing body structure",
                "features": "striped abdomen, transparent wings, pollen baskets on legs, detailed antennae"
            },
            {
                "type": "eating",
                "colors": "golden brown and black",
                "viewpoint": "side",
                "pose": "collecting nectar from a flower",
                "features": "extended proboscis, legs gripping flower, pollen collection behavior"
            },
            {
                "type": "flying",
                "colors": "golden brown and black",
                "viewpoint": "side",
                "pose": "flying between flowers",
                "features": "wings in motion, pollen loads on legs, dynamic flight pose"
            },
            {
                "type": "group",
                "colors": "golden brown and black",
                "viewpoint": "varied angles",
                "pose": "multiple bees working on honeycomb",
                "features": "social behavior, honeycomb structure, worker bee activities"
            }
        ]
    },
    {
        "name": "Rhinoceros Beetle",
        "korean_name": "장수풍뎅이",
        "scientific_name": "Allomyrina dichotoma",
        "variations": [
            {
                "type": "main",
                "colors": "dark brown to black",
                "viewpoint": "side-dorsal",
                "pose": "standing proud showing horn",
                "features": "large horn on head, strong legs, shiny exoskeleton, impressive size"
            },
            {
                "type": "eating",
                "colors": "dark brown to black",
                "viewpoint": "side",
                "pose": "feeding on tree sap",
                "features": "mouthparts visible, natural feeding behavior, grip on tree bark"
            },
            {
                "type": "flying",
                "colors": "dark brown to black",
                "viewpoint": "side-dorsal",
                "pose": "wings spread in flight",
                "features": "elytra raised, flight wings extended, powerful flight posture"
            },
            {
                "type": "group",
                "colors": "dark brown to black",
                "viewpoint": "varied angles",
                "pose": "beetles gathering around tree sap",
                "features": "social interaction, natural behavior, size comparison"
            }
        ]
    },
    {
        "name": "Praying Mantis",
        "korean_name": "사마귀",
        "scientific_name": "Tenodera sinensis",
        "variations": [
            {
                "type": "main",
                "colors": "bright green",
                "viewpoint": "front-side",
                "pose": "characteristic prayer-like stance",
                "features": "raptorial forelegs, triangular head, long antennae, detailed wing structure"
            },
            {
                "type": "eating",
                "colors": "bright green",
                "viewpoint": "side",
                "pose": "catching prey with forelegs",
                "features": "hunting behavior, precise grip, natural predatory action"
            },
            {
                "type": "flying",
                "colors": "bright green",
                "viewpoint": "side-dorsal",
                "pose": "wings spread in flight",
                "features": "large wings extended, aerodynamic posture, graceful movement"
            },
            {
                "type": "group",
                "colors": "bright green",
                "viewpoint": "varied angles",
                "pose": "mantis nymphs emerging",
                "features": "lifecycle stages, parent and young, natural behavior"
            }
        ]
    },
    {
        "name": "Giant Stag Beetle",
        "korean_name": "사슴벌레",
        "scientific_name": "Lucanus maculifemoratus",
        "variations": [
            {
                "type": "main",
                "colors": "dark brown to black",
                "viewpoint": "side-dorsal",
                "pose": "standing with mandibles displayed",
                "features": "large mandibles, robust body, strong legs, detailed antennae, shiny exoskeleton"
            },
            {
                "type": "eating",
                "colors": "dark brown to black",
                "viewpoint": "side",
                "pose": "feeding on tree sap",
                "features": "mandibles in action, natural feeding behavior, grip on tree bark"
            },
            {
                "type": "flying",
                "colors": "dark brown to black",
                "viewpoint": "side-dorsal",
                "pose": "wings spread in flight",
                "features": "elytra raised, flight wings extended, powerful flight posture"
            },
            {
                "type": "group",
                "colors": "dark brown to black",
                "viewpoint": "varied angles",
                "pose": "beetles interacting near tree sap",
                "features": "size comparison, social behavior, natural habitat"
            }
        ]
    },
    {
        "name": "Cicada",
        "korean_name": "매미",
        "scientific_name": "Cryptotympana dubia",
        "variations": [
            {
                "type": "main",
                "colors": "brown and transparent",
                "viewpoint": "dorsal",
                "pose": "resting on tree bark",
                "features": "transparent wings, large eyes, detailed wing veins, robust body"
            },
            {
                "type": "eating",
                "colors": "brown and transparent",
                "viewpoint": "side",
                "pose": "piercing tree bark with proboscis",
                "features": "extended proboscis, natural feeding behavior, grip on bark"
            },
            {
                "type": "flying",
                "colors": "brown and transparent",
                "viewpoint": "side-dorsal",
                "pose": "wings spread in flight",
                "features": "wings fully extended, dynamic flight pose, sunlight through wings"
            },
            {
                "type": "group",
                "colors": "brown and transparent",
                "viewpoint": "varied angles",
                "pose": "multiple cicadas on tree trunk",
                "features": "group behavior, molting process, lifecycle stages"
            }
        ]
    },
    {
        "name": "Long-horned Beetle",
        "korean_name": "하늘소",
        "scientific_name": "Psacothea hilaris",
        "variations": [
            {
                "type": "main",
                "colors": "black and white spotted",
                "viewpoint": "dorsal",
                "pose": "walking position showing antennae",
                "features": "extremely long antennae, spotted pattern, slender body, detailed leg structure"
            },
            {
                "type": "eating",
                "colors": "black and white spotted",
                "viewpoint": "side",
                "pose": "boring into wood",
                "features": "mandibles engaged, natural feeding behavior, grip on wood"
            },
            {
                "type": "flying",
                "colors": "black and white spotted",
                "viewpoint": "side-dorsal",
                "pose": "wings spread in flight",
                "features": "antennae streaming behind, wings extended, dynamic pose"
            },
            {
                "type": "group",
                "colors": "black and white spotted",
                "viewpoint": "varied angles",
                "pose": "beetles on tree trunk",
                "features": "interaction with environment, size comparison, natural behavior"
            }
        ]
    },
    {
        "name": "Giant Water Bug",
        "korean_name": "물장군",
        "scientific_name": "Lethocerus deyrollei",
        "variations": [
            {
                "type": "main",
                "colors": "dark brown",
                "viewpoint": "dorsal",
                "pose": "swimming position",
                "features": "large raptorial forelegs, streamlined body, swimming legs, detailed wing covers"
            },
            {
                "type": "eating",
                "colors": "dark brown",
                "viewpoint": "side",
                "pose": "catching prey",
                "features": "hunting behavior, powerful grip, natural predatory action"
            },
            {
                "type": "flying",
                "colors": "dark brown",
                "viewpoint": "side-dorsal",
                "pose": "wings spread for night flight",
                "features": "wings fully extended, powerful flight posture, nocturnal adaptation"
            },
            {
                "type": "group",
                "colors": "dark brown",
                "viewpoint": "varied angles",
                "pose": "water bugs in pond",
                "features": "aquatic habitat, hunting behavior, group dynamics"
            }
        ]
    },
    {
        "name": "Firefly",
        "korean_name": "반딧불이",
        "scientific_name": "Luciola lateralis",
        "variations": [
            {
                "type": "main",
                "colors": "dark brown with glowing abdomen",
                "viewpoint": "side-dorsal",
                "pose": "glowing at night",
                "features": "luminescent abdomen, transparent wings, delicate antennae, small size"
            },
            {
                "type": "eating",
                "colors": "dark brown",
                "viewpoint": "side",
                "pose": "feeding on nectar",
                "features": "delicate mouthparts, natural feeding behavior, grip on plant"
            },
            {
                "type": "flying",
                "colors": "dark brown with glowing abdomen",
                "viewpoint": "side",
                "pose": "flying with light trail",
                "features": "bioluminescent display, wings in motion, night flight"
            },
            {
                "type": "group",
                "colors": "dark brown with glowing abdomen",
                "viewpoint": "varied angles",
                "pose": "multiple fireflies in night scene",
                "features": "group light display, mating behavior, natural habitat"
            }
        ]
    }
]

# 생태계 이미지 정보
ecosystem_images = [
    {
        "filename": "intro",
        "subject": "diverse insects in their natural habitat",
        "details": "various insects including butterflies, bees, beetles, and ants in their natural environment",
        "focus": "showing the diversity and harmony of insect life"
    },
    {
        "filename": "pollination",
        "subject": "insect pollination process",
        "details": "a bee or butterfly collecting nectar and transferring pollen between flowers",
        "focus": "the relationship between insects and flowers"
    },
    {
        "subject": "insects in soil ecosystem",
        "details": "ants and beetles working in the soil, showing their tunnels and activities",
        "focus": "how insects help maintain healthy soil"
    }
]

if __name__ == "__main__":
    # 환경 변수에서 API 키 로드
    api_key = os.getenv("STABILITY_API_KEY")
    if not api_key:
        raise ValueError("API key not found. Please set STABILITY_API_KEY in .env file")
    
    # 테스트를 위해 하나의 곤충만 생성
    insect_generator = InsectIllustrationGenerator(api_key)
    test_insect = insects[0]  # 무당벌레
    test_variation = test_insect['variations'][0]  # main 이미지
    
    print(f"\nGenerating test illustration for {test_insect['name']} ({test_insect['korean_name']})...")
    
    variation_info = {
        "name": test_insect['name'],
        "korean_name": test_insect['korean_name'],
        "scientific_name": test_insect['scientific_name'],
        "colors": test_variation['colors'],
        "viewpoint": test_variation['viewpoint'],
        "pose": test_variation['pose'],
        "features": test_variation['features']
    }
    
    print(f"Generating {test_variation['type']} image...")
    result = insect_generator.generate_insect(variation_info, test_variation['type'])
    
    if result:
        print(f"Successfully generated {test_variation['type']} illustration!")
    else:
        print(f"Failed to generate {test_variation['type']} illustration.")

    # 생태계 이미지 생성
    ecosystem_generator = EcosystemIllustrationGenerator(api_key)
    for image_info in ecosystem_images:
        print(f"\nGenerating ecosystem illustration: {image_info['filename']}...")
        result = ecosystem_generator.generate_illustration(image_info)
        
        if result:
            print(f"Successfully generated {image_info['filename']} illustration!")
        else:
            print(f"Failed to generate {image_info['filename']} illustration.") 