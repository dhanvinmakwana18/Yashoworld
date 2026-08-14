import os
import glob

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find all `<img` and insert `onError` handler
    # but some might already have onError.
    
    # We can replace `<img\n` or `<img ` with `<img onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/2B231F/D4A373?text=Image+Unavailable'; e.currentTarget.onerror = null; }} `
    
    if '<img' in content and 'onError' not in content:
        content = content.replace('<img\n', '<img\nonError={(e) => { e.currentTarget.src = \'https://placehold.co/600x400/2B231F/D4A373?text=Image+Unavailable\'; e.currentTarget.onerror = null; }}\n')
        content = content.replace('<img ', '<img onError={(e) => { e.currentTarget.src = \'https://placehold.co/600x400/2B231F/D4A373?text=Image+Unavailable\'; e.currentTarget.onerror = null; }} ')
        
        with open(filepath, 'w') as f:
            f.write(content)

for root, _, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

