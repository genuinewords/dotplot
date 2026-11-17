const fs = require('fs');
const path = require('path');

// 1. Check all 12 images exist in public/images/blog and dist/images/blog
const expectedImages = [
  'ap-statistics-cheat-sheet.png',
  'compare-dot-plot-maker.png',
  'dot-and-whisker-plot-maker.png',
  'dot-plot-vs-bar-chart.png',
  'dot-plot-vs-histogram.png',
  'how-to-make-a-histogram-in-excel.png',
  'how-to-read-dot-plots.png',
  'outlier-dot-plot-maker.png',
  'real-world-dot-plot-examples.png',
  'scatter-plot-deep-dive.png',
  'statistics-dot-plot-visualizer.png',
  'what-is-a-dot-plot.png'
];

let allExist = true;
expectedImages.forEach(img => {
  const p1 = path.join(__dirname, '../public/images/blog', img);
  const p2 = path.join(__dirname, '../dist/images/blog', img);
  if (!fs.existsSync(p1) || !fs.existsSync(p2)) {
    console.error(`Missing image: ${img}`);
    allExist = false;
  }
});
if (allExist) {
  console.log('✓ All 12 featured images verified in public and dist');
}

// 2. Check /blog/ index page uses all 12 images in cards
const blogIndexHtml = fs.readFileSync(path.join(__dirname, '../dist/blog/index.html'), 'utf8');
let cardCount = 0;
expectedImages.forEach(img => {
  if (blogIndexHtml.includes(`/images/blog/${img}`)) {
    cardCount++;
  }
});
console.log(`✓ Blog index page links ${cardCount}/12 custom featured images`);

// 3. Check individual article page HTML has updated hero image and og:image
const postHtml = fs.readFileSync(path.join(__dirname, '../dist/blog/what-is-a-dot-plot/index.html'), 'utf8');
const hasHeroImg = postHtml.includes('/images/blog/what-is-a-dot-plot.png');
const hasOgImg = postHtml.includes('property="og:image" content="https://www.dotplotmaker.com/images/blog/what-is-a-dot-plot.png"');
const hasTwitterImg = postHtml.includes('name="twitter:image" content="https://www.dotplotmaker.com/images/blog/what-is-a-dot-plot.png"');

console.log(`✓ Article hero image updated: ${hasHeroImg}`);
console.log(`✓ OpenGraph og:image meta tag updated: ${hasOgImg}`);
console.log(`✓ Twitter twitter:image meta tag updated: ${hasTwitterImg}`);
