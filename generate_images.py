import os
import requests
import base64
from PIL import Image
import io
import traceback

# Stable Diffusion API configuration
API_HOST = 'https://api.stability.ai'
API_KEY = 'sk-YMj12sqndEvoYLCJYBnq7bkZvyxBZfyVebALFM2d5MdTKKp6'

# Ensure the output directory exists
os.makedirs('images/not-insects', exist_ok=True)
os.makedirs('images/insects', exist_ok=True)

def generate_image(name, details, is_insect=False):
    try:
        prompt = f"""Create exactly one single {details['name']} in vintage scientific illustration style. 
        Strict requirement: only one specimen in the entire image. 
        Use precise fine black ink lines to define form and structure, then apply subtle {details['color']} watercolor washes. 
        The specimen must be positioned in {details['view']}, showing detailed anatomical features: {details['features']}. 
        Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. 
        Pure white background with absolutely no decorative elements. 
        Reference style: 19th century entomological illustration techniques."""

        negative_prompt = """multiple specimens, groups, pairs, pattern, collection, collage, specimen plate, 
        decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, 
        modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, 
        repeating elements, mirror images, kaleidoscope effect"""

        print(f"Sending request for {name}...")
        
        response = requests.post(
            f"{API_HOST}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {API_KEY}"
            },
            json={
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
                "steps": 50,
            },
        )

        print(f"Response status code: {response.status_code}")
        print(f"Response content: {response.text[:500]}...")

        if response.status_code != 200:
            raise Exception(f"Non-200 response: {response.text}")

        data = response.json()
        
        # Save the image
        for i, image in enumerate(data["artifacts"]):
            image_data = base64.b64decode(image["base64"])
            folder = "insects" if is_insect else "not-insects"
            image_path = f"images/{folder}/{name}.png"
            
            # Open and save the image using PIL
            img = Image.open(io.BytesIO(image_data))
            img.save(image_path, format="PNG", quality=95)
            print(f"Generated and saved: {image_path}")

    except Exception as e:
        print(f"Error generating {name}:")
        print(traceback.format_exc())
        raise

# List of non-insect animals
not_insects = {
    '거미': {
        'name': 'European garden spider (Araneus diadematus)',
        'view': 'dorsal view with legs spread naturally',
        'features': 'eight legs with visible joints, cephalothorax and abdomen clearly separated, detailed eye pattern with 8 eyes, spinnerets visible, fine hairs on legs',
        'color': 'brown'
    },
    '지네': {
        'name': 'house centipede (Scutigera coleoptrata)',
        'view': 'lateral view with body slightly curved',
        'features': 'long antennae, 15 pairs of legs with characteristic length gradation, segmented body structure, modified first leg pair as forcipules',
        'color': 'reddish-brown'
    },
    '문어': {
        'name': 'common octopus (Octopus vulgaris)',
        'view': 'frontal view with tentacles spread',
        'features': 'eight arms with visible suction cups, large eyes, textured skin with chromatophores, funnel visible, mantle structure clear',
        'color': 'reddish'
    },
    '전갈': {
        'name': 'emperor scorpion (Pandinus imperator)',
        'view': 'dorsal view with tail curved',
        'features': 'large pincers, eight legs, segmented tail with visible stinger, detailed carapace texture, book lungs visible',
        'color': 'black'
    },
    '달팽이': {
        'name': 'garden snail (Helix pomatia)',
        'view': 'lateral view while crawling',
        'features': 'spiral shell with growth lines, extended foot, tentacles with eyes, visible mantle and pneumostome',
        'color': 'brown'
    },
    '지렁이': {
        'name': 'common earthworm (Lumbricus terrestris)',
        'view': 'lateral view with body gently curved',
        'features': 'clearly visible segments, clitellum, setae, anterior and posterior ends distinct, surface texture with subtle rings',
        'color': 'pink'
    },
    '게': {
        'name': 'shore crab (Carcinus maenas)',
        'view': 'dorsal view with legs spread',
        'features': 'carapace texture, ten legs including claws, compound eyes on stalks, segmented legs, detailed shell patterns',
        'color': 'orange-red'
    },
    '불가사리': {
        'name': 'common starfish (Asterias rubens)',
        'view': 'dorsal view with arms spread evenly',
        'features': 'five arms with tube feet visible, central disc, madreporite, spines and ossicles detailed, textured surface',
        'color': 'orange'
    },
    '해파리': {
        'name': 'moon jellyfish (Aurelia aurita)',
        'view': 'lateral view while swimming',
        'features': 'bell with detailed margin, four oral arms, radial canals, gonads visible through translucent bell, tentacles around bell margin',
        'color': 'translucent blue'
    },
    '쥐며느리': {
        'name': 'common woodlouse (Armadillidium vulgare)',
        'view': 'dorsal view',
        'features': 'segmented body armor, seven pairs of legs, antennae, compound eyes, detailed plate structure, uropods visible',
        'color': 'grey'
    }
}

# List of insects
insects = {
    '호랑나비': {
        'name': 'Asian swallowtail butterfly (Papilio xuthus)',
        'view': 'dorsal view with wings fully spread',
        'features': 'large yellow wings with black tiger-like stripes, distinctive swallowtail extensions, detailed wing veins, slender body, long antennae, compound eyes',
        'color': 'yellow and black'
    },
    '무당벌레': {
        'name': 'Seven-spotted ladybug (Coccinella septempunctata)',
        'view': 'dorsal view showing wing covers',
        'features': 'round body, distinctive spots on wing covers, small head with antennae, six legs visible, dome-shaped body',
        'color': 'red with black spots'
    },
    '장수풍뎅이': {
        'name': 'Japanese rhinoceros beetle (Allomyrina dichotoma)',
        'view': 'lateral view showing horn',
        'features': 'large horn on head, strong legs with spines, detailed exoskeleton texture, wing covers, antennae',
        'color': 'brown to black'
    },
    '사마귀': {
        'name': 'Praying mantis (Tenodera sinensis)',
        'view': 'lateral view in prayer-like pose',
        'features': 'large compound eyes, distinctive raptorial forelegs, long body, detailed wing texture, segmented abdomen',
        'color': 'green'
    },
    '매미': {
        'name': 'Cicada (Cryptotympana facialis)',
        'view': 'dorsal view with wings spread',
        'features': 'transparent wings with detailed veins, large compound eyes, broad head, sturdy body, distinctive wing pattern',
        'color': 'brown with transparent wings'
    },
    '잠자리': {
        'name': 'Common skimmer dragonfly (Orthetrum albistylum)',
        'view': 'dorsal view with wings spread horizontally',
        'features': 'four transparent wings with intricate veins, long slender body, large compound eyes, detailed thorax structure',
        'color': 'blue with clear wings'
    },
    '꿀벌': {
        'name': 'Western honey bee (Apis mellifera)',
        'view': 'lateral view',
        'features': 'fuzzy body, transparent wings, pollen baskets on legs, distinctive stripes, detailed wing venation',
        'color': 'golden brown and black'
    },
    '귀뚜라미': {
        'name': 'Field cricket (Gryllus campestris)',
        'view': 'lateral view',
        'features': 'long antennae, jumping hind legs, wing covers with sound-producing structures, detailed body segments',
        'color': 'dark brown'
    },
    '방아깨비': {
        'name': 'Rice grasshopper (Oxya japonica)',
        'view': 'lateral view',
        'features': 'large hind legs, detailed wing texture, segmented antennae, compound eyes, body segments',
        'color': 'green to brown'
    },
    '하늘소': {
        'name': 'Asian long-horned beetle (Anoplophora glabripennis)',
        'view': 'dorsal view',
        'features': 'extremely long antennae, distinctive wing covers, strong legs, detailed body segments, compound eyes',
        'color': 'black with white spots'
    }
}

def main():
    # Generate non-insect images
    print("\nGenerating non-insect images...")
    for name, details in not_insects.items():
        print(f"\nGenerating image for {name}...")
        try:
            generate_image(name, details, is_insect=False)
        except Exception as e:
            print(f"Failed to generate {name}: {str(e)}")
    
    # Generate insect images
    print("\nGenerating insect images...")
    for name, details in insects.items():
        print(f"\nGenerating image for {name}...")
        try:
            generate_image(name, details, is_insect=True)
        except Exception as e:
            print(f"Failed to generate {name}: {str(e)}")

if __name__ == "__main__":
    main() 