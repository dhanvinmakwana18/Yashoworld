const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            // Replace combinations of h-screen and overflow-y-auto on sections
            const regex = /className="([^"]*)h-screen([^"]*)"/g;
            content = content.replace(regex, (match, before, after) => {
                // If it's a main wrapper (contains w-full or relative and not a sticky inner div)
                if ((match.includes('w-full') || match.includes('relative')) && !match.includes('sticky')) {
                    let newClass = match.replace(/h-screen/g, 'min-h-screen').replace(/overflow-y-auto/g, '').replace(/\s+/g, ' ');
                    return newClass;
                }
                return match;
            });

            if (content !== fs.readFileSync(fullPath, 'utf8')) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
