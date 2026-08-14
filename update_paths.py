import os
import re

# old names -> new names maps
rename_map = {
    '/IMG_0787.jpg': '/images/gallery/floral_memory_resin_art.jpg',
    '/flower_preservation_art_1785962671880.jpg': '/images/gallery/flower_preservation_art.jpg',
    '/forever_rose_bookmark_1785964520362.jpg': '/images/gallery/forever_rose_bookmark.jpg',
    '/forever_rose_bookmark_real_1785964982450.jpg': '/images/gallery/forever_rose_bookmark_real.jpg',
    '/hero_resin_frame_1785962659720.jpg': '/images/gallery/hero_resin_frame.jpg',
    '/pooja_thali_lavender_1785964488130.jpg': '/images/gallery/pooja_thali_lavender.jpg',
    '/pooja_thali_pink_1785964506644.jpg': '/images/gallery/pooja_thali_pink.jpg',
    '/thali_blue_vakratunda_1785965598019.jpg': '/images/gallery/thali_blue_vakratunda.jpg',
    '/thali_magenta_krishna_1785965554448.jpg': '/images/gallery/thali_magenta_krishna.jpg',
    '/thali_peacock_blue_1785965513866.jpg': '/images/gallery/thali_peacock_blue.jpg',
    '/thali_red_clear_daisies_1785965634912.jpg': '/images/gallery/thali_red_clear_daisies.jpg',
    '/thali_red_ganpati_bappa_1785965575407.jpg': '/images/gallery/thali_red_ganpati_bappa.jpg',
    '/thali_red_lakshmi_ganesh_1785965472295.jpg': '/images/gallery/thali_red_lakshmi_ganesh.jpg',
    '/thali_turquoise_gayatri_1785965616705.jpg': '/images/gallery/thali_turquoise_gayatri.jpg',
    '/yashoworld_logo.jpg': '/images/branding/yashoworld_logo.jpg',
    '/yashoworld_logo_1785968071210.jpg': '/images/branding/yashoworld_logo.jpg',
    '/images/yashoworld_logo.jpg': '/images/branding/yashoworld_logo.jpg'
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = content
            for old_path, new_path in rename_map.items():
                # We want to replace quotes containing the old path to use new path.
                # E.g. "/IMG_0787.jpg" -> "/images/gallery/floral_memory_resin_art.jpg"
                new_content = new_content.replace(f"'{old_path}'", f"'{new_path}'")
                new_content = new_content.replace(f'"{old_path}"', f'"{new_path}"')
            
            if new_content != content:
                print(f"Updated {filepath}")
                with open(filepath, 'w') as f:
                    f.write(new_content)
