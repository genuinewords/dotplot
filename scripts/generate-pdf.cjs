const fs = require('fs');
const path = require('path');

// Simple, robust, self-contained PDF 1.4 generator for a clean Cheat Sheet
function generatePDF() {
  const content = [];
  
  // PDF stream content for text drawing
  // Fonts: /F1 = Helvetica, /F2 = Helvetica-Bold, /F3 = Helvetica-Oblique
  let stream = '';

  function text(x, y, str, font = '/F1', size = 9, color = [0.1, 0.1, 0.1]) {
    // Escape parens
    const escaped = str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    stream += `BT\n${font} ${size} Tf\n${color[0]} ${color[1]} ${color[2]} rg\n${x} ${y} Td\n(${escaped}) Tj\nET\n`;
  }

  function rect(x, y, w, h, fill = [0.95, 0.95, 0.97], stroke = [0.8, 0.8, 0.85]) {
    stream += `${stroke[0]} ${stroke[1]} ${stroke[2]} RG\n${fill[0]} ${fill[1]} ${fill[2]} rg\n${x} ${y} ${w} ${h} re\nB\n`;
  }

  function line(x1, y1, x2, y2, stroke = [0.7, 0.7, 0.75], width = 1) {
    stream += `${stroke[0]} ${stroke[1]} ${stroke[2]} RG\n${width} w\n${x1} ${y1} m\n${x2} ${y2} l\nS\n`;
  }

  // Page 1: 612 x 792 (Letter Portrait)
  // Background / Top banner
  rect(24, 730, 564, 46, [0.04, 0.06, 0.1], [0, 0.83, 0.67]);
  text(36, 755, 'AP STATISTICS EXAM CHEAT SHEET', '/F2', 15, [0, 0.83, 0.67]);
  text(36, 738, 'Comprehensive 9-Unit Formula & Concept Guide · DotPlotMaker.com', '/F1', 9, [0.8, 0.85, 0.9]);

  // Two columns: Left (x: 24 to 298), Right (x: 314 to 588)
  const colW = 274;

  // Box Helper
  function unitBox(x, y, w, h, title, lines) {
    rect(x, y - h, w, h, [0.98, 0.98, 0.99], [0.82, 0.85, 0.9]);
    rect(x, y - 18, w, 18, [0.1, 0.14, 0.2], [0.1, 0.14, 0.2]);
    text(x + 8, y - 13, title, '/F2', 8.5, [1, 1, 1]);
    
    let curY = y - 30;
    for (const item of lines) {
      if (typeof item === 'string') {
        text(x + 8, curY, item, '/F1', 7.5, [0.15, 0.15, 0.2]);
        curY -= 11;
      } else if (item.bold) {
        text(x + 8, curY, item.text, '/F2', 7.5, [0.05, 0.05, 0.1]);
        curY -= 11;
      } else if (item.code) {
        text(x + 8, curY, item.text, '/F3', 7.2, [0, 0.5, 0.4]);
        curY -= 11;
      }
    }
  }

  // Left column (Units 1 - 5)
  unitBox(24, 718, colW, 118, 'UNIT 1: ONE-VARIABLE DATA', [
    { bold: true, text: '• SOCS for Distributions:' },
    '  Shape (skewed/symmetric), Outliers, Center (median/mean), Spread (IQR/SD).',
    { bold: true, text: '• Five-Number Summary & IQR:' },
    '  Min, Q1, Median (Q2), Q3, Max.  IQR = Q3 - Q1.',
    { bold: true, text: '• Tukey 1.5xIQR Outlier Fences:' },
    '  Lower = Q1 - 1.5(IQR)  |  Upper = Q3 + 1.5(IQR).',
    { bold: true, text: '• Robustness Rule:' },
    '  Skewed data -> use Median & IQR (resistant). Symmetric -> Mean & SD.'
  ]);

  unitBox(24, 590, colW, 108, 'UNIT 2: TWO-VARIABLE DATA & REGRESSION', [
    { bold: true, text: '• Least-Squares Regression Line (LSRL):' },
    '  y-hat = a + bx   where  b = r*(sy / sx)  and  a = y_bar - b*(x_bar).',
    { bold: true, text: '• Correlation (r) & Coefficient of Det (r²):' },
    '  r in [-1, 1] (direction & strength). r² = % variation in y explained by x.',
    { bold: true, text: '• Residuals:' },
    '  Residual = Actual - Predicted = y - y-hat. Random residual plot = linear.'
  ]);

  unitBox(24, 472, colW, 94, 'UNIT 3: COLLECTING DATA', [
    { bold: true, text: '• Sampling Methods:' },
    '  SRS (equal chance), Stratified (groups->samples), Cluster (all in chosen groups).',
    { bold: true, text: '• Experiments vs. Observational:' },
    '  Only randomized experiments establish CAUSATION (control, randomize, replicate).',
    { bold: true, text: '• Biases:' },
    '  Undercoverage, Nonresponse, Voluntary Response, Response bias.'
  ]);

  unitBox(24, 368, colW, 94, 'UNIT 4: PROBABILITY RULES', [
    { bold: true, text: '• Addition & Complement:' },
    '  P(A or B) = P(A) + P(B) - P(A and B).   P(A^c) = 1 - P(A).',
    { bold: true, text: '• Conditional & Independence:' },
    '  P(A|B) = P(A and B) / P(B).   Independent if P(A|B) = P(A) or P(A and B) = P(A)*P(B).',
    { bold: true, text: '• Multiplication Rule:' },
    '  P(A and B) = P(A) * P(B|A). (If independent: P(A)*P(B)).'
  ]);

  unitBox(24, 264, colW, 116, 'UNIT 5: RANDOM VARIABLES', [
    { bold: true, text: '• Discrete RV Mean & Variance:' },
    '  mu_X = E(X) = sum[x * P(x)].   sigma_X² = sum[(x - mu)² * P(x)].',
    { bold: true, text: '• Binomial Distribution B(n, p):' },
    '  mu = n*p,   sigma = sqrt(n*p*(1-p)).  P(X = k) = (n choose k)*p^k*(1-p)^(n-k).',
    { bold: true, text: '• Geometric Distribution Geom(p):' },
    '  First success on trial k: P(Y = k) = (1-p)^(k-1) * p.  mu = 1/p.'
  ]);

  // Right column (Units 6 - 9 + Exam Tips)
  unitBox(314, 718, colW, 88, 'UNIT 6: SAMPLING DISTRIBUTIONS', [
    { bold: true, text: '• Central Limit Theorem (CLT):' },
    '  If n >= 30, sample mean distribution is approx. normal regardless of shape.',
    { bold: true, text: '• Proportions:  mu_p_hat = p,  sigma_p_hat = sqrt(p(1-p)/n).' },
    { bold: true, text: '• Means:        mu_x_bar = mu, sigma_x_bar = sigma / sqrt(n).' }
  ]);

  unitBox(314, 620, colW, 114, 'UNIT 7: INFERENCE FOR PROPORTIONS', [
    { bold: true, text: '• 1-Sample z-Interval & Test:' },
    '  CI = p_hat +/- z* * sqrt(p_hat*(1 - p_hat)/n).   z = (p_hat - p0) / sqrt(p0(1-p0)/n).',
    { bold: true, text: '• 2-Sample z-Test (Pooled Proportion):' },
    '  p_c = (x1 + x2)/(n1 + n2).   SE_pooled = sqrt(p_c(1-p_c)(1/n1 + 1/n2)).',
    { bold: true, text: '• Conditions:' },
    '  Random, 10% condition (n < 0.10N), Large Counts: np >= 10, n(1-p) >= 10.'
  ]);

  unitBox(314, 496, colW, 114, 'UNIT 8: INFERENCE FOR MEANS', [
    { bold: true, text: '• When to Use t vs. z:' },
    '  Use t when population sigma is unknown (almost always in real life!). df = n - 1.',
    { bold: true, text: '• 1-Sample t-Interval & Test:' },
    '  CI = x_bar +/- t* * (s / sqrt(n)).   t = (x_bar - mu0) / (s / sqrt(n)).',
    { bold: true, text: '• Conditions for Means:' },
    '  Random, 10% rule, Normal population or n >= 30 (CLT) or no strong skew/outliers.'
  ]);

  unitBox(314, 372, colW, 108, 'UNIT 9: CHI-SQUARE & SLOPE INFERENCE', [
    { bold: true, text: '• Chi-Square Test Statistic:' },
    '  chi² = sum[(Observed - Expected)² / Expected].  Expected = (Row * Col) / Total.',
    { bold: true, text: '• Tests & Degrees of Freedom:' },
    '  Goodness of Fit (df = k - 1)  |  Independence/Homogeneity: (r - 1)(c - 1).',
    { bold: true, text: '• Regression Slope t-Test:' },
    '  t = (b - 0) / SE_b   with  df = n - 2.'
  ]);

  unitBox(314, 254, colW, 106, 'MUST-KNOW AP STATS EXAM TIPS', [
    { bold: true, text: '1. ALWAYS Write in Context:' },
    '   Never say "the slope is 0.5". Say: "For each +1 mpg, car price drops $500."',
    { bold: true, text: '2. State Hypotheses with Parameters:' },
    '   H0: mu = 10 (never H0: x_bar = 10). Define mu in context.',
    { bold: true, text: '3. Check ALL Conditions Explicitly:' },
    '   Show actual numbers: 40*(0.3) = 12 >= 10 and 40*(0.7) = 28 >= 10.'
  ]);

  // Bottom footer bar
  rect(24, 20, 564, 24, [0.07, 0.1, 0.15], [0, 0.83, 0.67]);
  text(36, 27, 'Free AP Stats Interactive Tools & Chart Generators: https://www.dotplotmaker.com', '/F2', 8, [0, 0.83, 0.67]);
  text(440, 27, 'Page 1 of 1 · 2026 Edition', '/F1', 8, [0.7, 0.75, 0.8]);

  // Construct valid PDF 1.4 objects
  const objects = [];

  function addObject(str) {
    objects.push(str);
    return objects.length; // 1-indexed
  }

  // Object 1: Catalog
  addObject('<< /Type /Catalog /Pages 2 0 R >>');

  // Object 2: Pages
  addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');

  // Object 3: Page
  addObject('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>');

  // Object 4: Font F1 (Helvetica)
  addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  // Object 5: Font F2 (Helvetica-Bold)
  addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  // Object 6: Font F3 (Helvetica-Oblique)
  addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>');

  // Object 7: Content Stream
  const streamLength = Buffer.byteLength(stream, 'utf8');
  addObject(`<< /Length ${streamLength} >>\nstream\n${stream}endstream`);

  // Build binary PDF
  let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${off.toString().padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const outDir = path.join(__dirname, '../public/downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outFile = path.join(outDir, 'ap-statistics-cheat-sheet.pdf');
  fs.writeFileSync(outFile, pdf, 'binary');
  console.log(`Generated clean PDF: ${outFile} (${Buffer.byteLength(pdf)} bytes)`);
}

generatePDF();
