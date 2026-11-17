const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
let count = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  const slug = f.replace(/\.mdx$/, '');
  const newImagePath = `/images/blog/${slug}.png`;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('image: "/og-image.png"')) {
    content = content.replace('image: "/og-image.png"', `image: "${newImagePath}"`);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Updated ${f} -> ${newImagePath}`);
  }
});

console.log(`Successfully updated ${count} blog post(s).`);
