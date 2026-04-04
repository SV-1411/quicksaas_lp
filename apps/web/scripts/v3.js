const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Use a more flexible regex for the badge
const badgeRegex = /\{(\/\* Badge — slowest parallax layer \*\/|)\s*<motion\.div[\s\S]*?Neural Link Synchronized[\s\S]*?<\/motion\.div>\s*\}/;
if (badgeRegex.test(content)) {
  content = content.replace(badgeRegex, '');
  console.log('Badge removed via regex');
} else {
  // Try line by line removal of the specific lines I saw
  const lines = content.split('\n');
  const findIndex = lines.findIndex(l => l.includes('Neural Link Synchronized'));
  if (findIndex !== -1) {
    // Find the nearest opening { above
    let start = -1;
    for (let i = findIndex; i >= 0; i--) {
      if (lines[i].includes('/* Badge — slowest parallax layer */')) {
        start = i;
        break;
      }
    }
    // Find the nearest closing } below
    let end = -1;
    for (let i = findIndex; i < lines.length; i++) {
        if (lines[i].includes('</motion.div>')) {
            end = i;
            break;
        }
    }
    
    if (start !== -1 && end !== -1) {
      lines.splice(start, end - start + 1);
      content = lines.join('\n');
      console.log('Badge removed via line splice');
    }
  }
}

fs.writeFileSync(filePath, content);
