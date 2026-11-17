const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function svgWrapper(badgeText, titleText, subtitleText, graphicSvg) {
  const safeBadge = escapeXml(badgeText.toUpperCase());
  const safeTitle = escapeXml(titleText);
  const safeSubtitle = escapeXml(subtitleText);
  return `<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0e14" />
      <stop offset="50%" stop-color="#0e1520" />
      <stop offset="100%" stop-color="#080c12" />
    </linearGradient>
    <linearGradient id="glow-grad" x1="200" y1="100" x2="1000" y2="600" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa" stop-opacity="0.12" />
      <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#4d96ff" stop-opacity="0.05" />
    </linearGradient>
    <linearGradient id="card-grad" x1="0" y1="0" x2="1080" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#141d27" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0f1620" stop-opacity="0.9" />
    </linearGradient>
    <linearGradient id="primary-grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa" />
      <stop offset="100%" stop-color="#4d96ff" />
    </linearGradient>
    <linearGradient id="accent-grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
    </pattern>
    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bg-grad)" />
  <rect width="1200" height="675" fill="url(#grid-pattern)" />
  <ellipse cx="600" cy="350" rx="550" ry="260" fill="url(#glow-grad)" />

  <!-- Top bar / Brand -->
  <g transform="translate(60, 48)">
    <rect width="36" height="36" rx="8" fill="#141d27" stroke="#243040" stroke-width="1.5" />
    <circle cx="13" cy="18" r="3.5" fill="#00d4aa" />
    <circle cx="23" cy="18" r="3.5" fill="#8b5cf6" />
    <text x="48" y="24" fill="#f0f0f5" font-family="'Inter', system-ui, sans-serif" font-size="16" font-weight="700" letter-spacing="0.5">DOT PLOT MAKER®</text>

    <!-- Badge -->
    <g transform="translate(860, 2)">
      <rect width="220" height="32" rx="16" fill="#00d4aa" fill-opacity="0.12" stroke="#00d4aa" stroke-opacity="0.3" stroke-width="1" />
      <circle cx="18" cy="16" r="4" fill="#00d4aa" />
      <text x="32" y="21" fill="#00d4aa" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.8">${safeBadge}</text>
    </g>
  </g>

  <!-- Title & Subtitle Header -->
  <g transform="translate(60, 115)">
    <text x="0" y="32" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="34" font-weight="800" letter-spacing="-0.5">${safeTitle}</text>
    <text x="0" y="62" fill="#94a3b8" font-family="'Inter', system-ui, sans-serif" font-size="17" font-weight="400">${safeSubtitle}</text>
  </g>

  <!-- Visual graphic card viewport -->
  <g transform="translate(60, 200)">
    <rect width="1080" height="425" rx="16" fill="url(#card-grad)" stroke="#243344" stroke-width="1.5" />
    ${graphicSvg}
  </g>
</svg>`;
}

const images = [
  {
    name: 'what-is-a-dot-plot.png',
    badge: 'Guide & Fundamentals',
    title: 'What Is a Dot Plot? A Complete Visual Guide',
    desc: 'Understanding number lines, stacked observation dots, and individual value distributions',
    svg: `
      <!-- Center Title within canvas -->
      <g transform="translate(50, 40)">
        <text x="490" y="20" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">DISTRIBUTION ANATOMY: TEST SCORES (N = 32)</text>
        
        <!-- Main number line axis -->
        <line x1="80" y1="270" x2="900" y2="270" stroke="#334155" stroke-width="2" />
        <line x1="80" y1="270" x2="900" y2="270" stroke="#4d96ff" stroke-width="2" stroke-dasharray="820" stroke-dashoffset="0" />
        
        <!-- Axis Ticks & Labels -->
        ${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((val, i) => {
          const x = 120 + i * 90;
          return `
            <line x1="${x}" y1="270" x2="${x}" y2="280" stroke="#475569" stroke-width="1.5" />
            <text x="${x}" y="304" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="14" text-anchor="middle">${val}</text>
          `;
        }).join('')}
        
        <!-- Axis title -->
        <text x="490" y="335" text-anchor="middle" fill="#64748b" font-family="'Inter', sans-serif" font-size="13" font-weight="600">Score Range (Preserves Raw Values Without Bin Loss)</text>

        <!-- Observation Dots: Stacked at discrete values -->
        <!-- 20: 1 dot -->
        <circle cx="210" cy="246" r="10" fill="#00d4aa" />
        
        <!-- 30: 2 dots -->
        <circle cx="300" cy="246" r="10" fill="#00d4aa" />
        <circle cx="300" cy="222" r="10" fill="#00d4aa" />

        <!-- 40: 3 dots -->
        <circle cx="390" cy="246" r="10" fill="#00d4aa" />
        <circle cx="390" cy="222" r="10" fill="#00d4aa" />
        <circle cx="390" cy="198" r="10" fill="#00d4aa" />

        <!-- 50: 6 dots (Peak) -->
        <circle cx="480" cy="246" r="10" fill="#00d4aa" />
        <circle cx="480" cy="222" r="10" fill="#00d4aa" />
        <circle cx="480" cy="198" r="10" fill="#00d4aa" />
        <circle cx="480" cy="174" r="10" fill="#00d4aa" />
        <circle cx="480" cy="150" r="10" fill="#00d4aa" />
        <circle cx="480" cy="126" r="10" fill="#00d4aa" />

        <!-- 60: 7 dots (Mode) -->
        <circle cx="570" cy="246" r="10" fill="#38bdf8" />
        <circle cx="570" cy="222" r="10" fill="#38bdf8" />
        <circle cx="570" cy="198" r="10" fill="#38bdf8" />
        <circle cx="570" cy="174" r="10" fill="#38bdf8" />
        <circle cx="570" cy="150" r="10" fill="#38bdf8" />
        <circle cx="570" cy="126" r="10" fill="#38bdf8" />
        <circle cx="570" cy="102" r="10" fill="#38bdf8" />

        <!-- 70: 5 dots -->
        <circle cx="660" cy="246" r="10" fill="#00d4aa" />
        <circle cx="660" cy="222" r="10" fill="#00d4aa" />
        <circle cx="660" cy="198" r="10" fill="#00d4aa" />
        <circle cx="660" cy="174" r="10" fill="#00d4aa" />
        <circle cx="660" cy="150" r="10" fill="#00d4aa" />

        <!-- 80: 4 dots -->
        <circle cx="750" cy="246" r="10" fill="#00d4aa" />
        <circle cx="750" cy="222" r="10" fill="#00d4aa" />
        <circle cx="750" cy="198" r="10" fill="#00d4aa" />
        <circle cx="750" cy="174" r="10" fill="#00d4aa" />

        <!-- 90: 2 dots -->
        <circle cx="840" cy="246" r="10" fill="#00d4aa" />
        <circle cx="840" cy="222" r="10" fill="#00d4aa" />

        <!-- Annotations -->
        <!-- Stack annotation -->
        <path d="M 590 102 L 640 65 L 680 65" fill="none" stroke="#38bdf8" stroke-width="1.5" />
        <circle cx="680" cy="65" r="3" fill="#38bdf8" />
        <text x="690" y="62" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="13" font-weight="700">Peak / Mode (Frequency = 7)</text>
        <text x="690" y="78" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">Dots stack vertically on identical values</text>

        <!-- 1 dot = 1 observation -->
        <path d="M 210 230 L 210 180 L 160 180" fill="none" stroke="#00d4aa" stroke-width="1.5" />
        <circle cx="160" cy="180" r="3" fill="#00d4aa" />
        <text x="150" y="176" text-anchor="end" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="13" font-weight="700">1 Dot = 1 Observation</text>
        <text x="150" y="192" text-anchor="end" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">Zero aggregation or bin approximation</text>
      </g>
    `
  },
  {
    name: 'how-to-read-dot-plots.png',
    badge: 'Interpretation',
    title: 'How to Read a Dot Plot: Clusters, Gaps & Outliers',
    desc: 'The four-step visual inspection method for identifying statistical distribution patterns',
    svg: `
      <g transform="translate(50, 35)">
        <text x="490" y="15" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">FOUR KEY VISUAL PATTERNS IN QUANTITATIVE DISTRIBUTIONS</text>
        
        <!-- Axis -->
        <line x1="60" y1="260" x2="920" y2="260" stroke="#334155" stroke-width="2" />
        ${[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v, i) => {
          const x = 90 + i * 85;
          return `
            <line x1="${x}" y1="260" x2="${x}" y2="270" stroke="#475569" stroke-width="1.5" />
            <text x="${x}" y="292" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="13" text-anchor="middle">${v}</text>
          `;
        }).join('')}

        <!-- Cluster 1 (Left): 20 to 40 -->
        <rect x="150" y="90" width="220" height="155" rx="10" fill="#00d4aa" fill-opacity="0.06" stroke="#00d4aa" stroke-opacity="0.3" stroke-dasharray="4 4" />
        <text x="260" y="80" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="13" font-weight="700">① CLUSTER A (Primary Peak)</text>
        
        <!-- Dots in Cluster 1 -->
        <circle cx="175" cy="242" r="9" fill="#00d4aa" /><circle cx="175" cy="220" r="9" fill="#00d4aa" />
        <circle cx="215" cy="242" r="9" fill="#00d4aa" /><circle cx="215" cy="220" r="9" fill="#00d4aa" /><circle cx="215" cy="198" r="9" fill="#00d4aa" /><circle cx="215" cy="176" r="9" fill="#00d4aa" />
        <circle cx="260" cy="242" r="9" fill="#00d4aa" /><circle cx="260" cy="220" r="9" fill="#00d4aa" /><circle cx="260" cy="198" r="9" fill="#00d4aa" /><circle cx="260" cy="176" r="9" fill="#00d4aa" /><circle cx="260" cy="154" r="9" fill="#00d4aa" /><circle cx="260" cy="132" r="9" fill="#00d4aa" />
        <circle cx="305" cy="242" r="9" fill="#00d4aa" /><circle cx="305" cy="220" r="9" fill="#00d4aa" /><circle cx="305" cy="198" r="9" fill="#00d4aa" />
        <circle cx="345" cy="242" r="9" fill="#00d4aa" />

        <!-- Gap (45 to 60) -->
        <rect x="390" y="160" width="160" height="95" rx="8" fill="#f43f5e" fill-opacity="0.08" stroke="#f43f5e" stroke-opacity="0.4" stroke-dasharray="4 4" />
        <text x="470" y="145" text-anchor="middle" fill="#f43f5e" font-family="'Inter', sans-serif" font-size="13" font-weight="700">② GAP (No Data)</text>
        <line x1="410" y1="210" x2="530" y2="210" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3 3" />

        <!-- Cluster 2 (Right): 65 to 75 -->
        <rect x="570" y="115" width="160" height="130" rx="10" fill="#8b5cf6" fill-opacity="0.06" stroke="#8b5cf6" stroke-opacity="0.3" stroke-dasharray="4 4" />
        <text x="650" y="105" text-anchor="middle" fill="#8b5cf6" font-family="'Inter', sans-serif" font-size="13" font-weight="700">③ CLUSTER B (Secondary)</text>
        <circle cx="610" cy="242" r="9" fill="#8b5cf6" /><circle cx="610" cy="220" r="9" fill="#8b5cf6" />
        <circle cx="650" cy="242" r="9" fill="#8b5cf6" /><circle cx="650" cy="220" r="9" fill="#8b5cf6" /><circle cx="650" cy="198" r="9" fill="#8b5cf6" /><circle cx="650" cy="176" r="9" fill="#8b5cf6" />
        <circle cx="690" cy="242" r="9" fill="#8b5cf6" /><circle cx="690" cy="220" r="9" fill="#8b5cf6" />

        <!-- Outlier (100) -->
        <circle cx="855" cy="242" r="11" fill="#f59e0b" stroke="#ffffff" stroke-width="2" />
        <rect x="795" y="130" width="120" height="55" rx="8" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.5" />
        <text x="855" y="152" text-anchor="middle" fill="#f59e0b" font-family="'Inter', sans-serif" font-size="12" font-weight="800">④ OUTLIER</text>
        <text x="855" y="170" text-anchor="middle" fill="#fcd34d" font-family="'JetBrains Mono', monospace" font-size="11">x = 100</text>
        <path d="M 855 185 L 855 225" fill="none" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow)" />
      </g>
    `
  },
  {
    name: 'dot-plot-vs-histogram.png',
    badge: 'Comparison Guide',
    title: 'Dot Plot vs Histogram: Differences & When to Use Each',
    desc: 'Discrete individual observations (left) vs continuous interval bin frequencies (right)',
    svg: `
      <g transform="translate(40, 30)">
        <!-- Divider line -->
        <line x1="500" y1="20" x2="500" y2="350" stroke="#334155" stroke-dasharray="6 6" stroke-width="1.5" />

        <!-- LEFT PANEL: DOT PLOT -->
        <g transform="translate(10, 0)">
          <rect x="20" y="15" width="160" height="30" rx="15" fill="#00d4aa" fill-opacity="0.12" stroke="#00d4aa" stroke-width="1" />
          <text x="100" y="35" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="13" font-weight="700">DOT PLOT (N &lt; 50)</text>
          
          <text x="20" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="13">Shows every individual data point</text>

          <line x1="30" y1="250" x2="430" y2="250" stroke="#475569" stroke-width="2" />
          ${[2, 4, 6, 8, 10].map((v, i) => {
            const x = 70 + i * 80;
            return `
              <line x1="${x}" y1="250" x2="${x}" y2="258" stroke="#475569" stroke-width="1.5" />
              <text x="${x}" y="278" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">${v}</text>
            `;
          }).join('')}

          <!-- Stacked dots -->
          <circle cx="70" cy="235" r="8" fill="#00d4aa" />
          <circle cx="150" cy="235" r="8" fill="#00d4aa" /><circle cx="150" cy="215" r="8" fill="#00d4aa" /><circle cx="150" cy="195" r="8" fill="#00d4aa" />
          <circle cx="230" cy="235" r="8" fill="#00d4aa" /><circle cx="230" cy="215" r="8" fill="#00d4aa" /><circle cx="230" cy="195" r="8" fill="#00d4aa" /><circle cx="230" cy="175" r="8" fill="#00d4aa" /><circle cx="230" cy="155" r="8" fill="#00d4aa" />
          <circle cx="310" cy="235" r="8" fill="#00d4aa" /><circle cx="310" cy="215" r="8" fill="#00d4aa" /><circle cx="310" cy="195" r="8" fill="#00d4aa" />
          <circle cx="390" cy="235" r="8" fill="#00d4aa" />

          <!-- Feature badges -->
          <rect x="30" y="300" width="400" height="34" rx="6" fill="#1e293b" />
          <text x="230" y="322" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="12" font-weight="600">✓ Exact Values Visible   |   ✓ Zero Binning Loss</text>
        </g>

        <!-- RIGHT PANEL: HISTOGRAM -->
        <g transform="translate(520, 0)">
          <rect x="20" y="15" width="160" height="30" rx="15" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="1" />
          <text x="100" y="35" text-anchor="middle" fill="#8b5cf6" font-family="'Inter', sans-serif" font-size="13" font-weight="700">HISTOGRAM (N &gt; 100)</text>
          
          <text x="20" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="13">Groups values into aggregated interval bins</text>

          <line x1="30" y1="250" x2="430" y2="250" stroke="#475569" stroke-width="2" />
          ${['0-2', '2-4', '4-6', '6-8', '8-10'].map((bin, i) => {
            const x = 70 + i * 75;
            return `
              <line x1="${x}" y1="250" x2="${x}" y2="258" stroke="#475569" stroke-width="1.5" />
              <text x="${x}" y="278" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="middle">${bin}</text>
            `;
          }).join('')}

          <!-- Histogram Bars -->
          <rect x="35" y="210" width="70" height="40" fill="#8b5cf6" fill-opacity="0.6" stroke="#8b5cf6" stroke-width="1.5" />
          <rect x="110" y="150" width="70" height="100" fill="#8b5cf6" fill-opacity="0.6" stroke="#8b5cf6" stroke-width="1.5" />
          <rect x="185" y="90" width="70" height="160" fill="#8b5cf6" fill-opacity="0.85" stroke="#a78bfa" stroke-width="2" />
          <rect x="260" y="130" width="70" height="120" fill="#8b5cf6" fill-opacity="0.6" stroke="#8b5cf6" stroke-width="1.5" />
          <rect x="335" y="200" width="70" height="50" fill="#8b5cf6" fill-opacity="0.6" stroke="#8b5cf6" stroke-width="1.5" />

          <!-- Feature badges -->
          <rect x="30" y="300" width="400" height="34" rx="6" fill="#1e293b" />
          <text x="230" y="322" text-anchor="middle" fill="#c084fc" font-family="'Inter', sans-serif" font-size="12" font-weight="600">✓ Large Dataset Scale   |   ✓ Shape &amp; Skewness</text>
        </g>
      </g>
    `
  },
  {
    name: 'dot-plot-vs-bar-chart.png',
    badge: 'Chart Selection',
    title: 'Dot Plot vs Bar Chart: Which Should You Use?',
    desc: 'Distribution of individual values vs summary totals across categories',
    svg: `
      <g transform="translate(40, 30)">
        <line x1="500" y1="20" x2="500" y2="350" stroke="#334155" stroke-dasharray="6 6" stroke-width="1.5" />

        <!-- Left: Dot Plot (Continuous / Discrete distribution) -->
        <g transform="translate(10, 0)">
          <rect x="20" y="15" width="220" height="30" rx="15" fill="#00d4aa" fill-opacity="0.12" stroke="#00d4aa" stroke-width="1" />
          <text x="130" y="35" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="13" font-weight="700">DOT PLOT: DISTRIBUTION</text>
          <text x="20" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="13">Shows variation &amp; spread along continuous scale</text>

          <line x1="40" y1="240" x2="430" y2="240" stroke="#475569" stroke-width="2" />
          ${[10, 20, 30, 40, 50].map((v, i) => {
            const x = 80 + i * 80;
            return `
              <line x1="${x}" y1="240" x2="${x}" y2="248" stroke="#475569" stroke-width="1.5" />
              <text x="${x}" y="268" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">${v}</text>
            `;
          }).join('')}

          <!-- Dots -->
          <circle cx="80" cy="225" r="8" fill="#00d4aa" />
          <circle cx="160" cy="225" r="8" fill="#00d4aa" /><circle cx="160" cy="205" r="8" fill="#00d4aa" /><circle cx="160" cy="185" r="8" fill="#00d4aa" />
          <circle cx="240" cy="225" r="8" fill="#00d4aa" /><circle cx="240" cy="205" r="8" fill="#00d4aa" /><circle cx="240" cy="185" r="8" fill="#00d4aa" /><circle cx="240" cy="165" r="8" fill="#00d4aa" /><circle cx="240" cy="145" r="8" fill="#00d4aa" />
          <circle cx="320" cy="225" r="8" fill="#00d4aa" /><circle cx="320" cy="205" r="8" fill="#00d4aa" />
          <circle cx="400" cy="225" r="8" fill="#00d4aa" />

          <rect x="40" y="295" width="390" height="35" rx="6" fill="#1e293b" />
          <text x="235" y="318" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="12" font-weight="600">Best for: Spread, Clusters &amp; Outliers</text>
        </g>

        <!-- Right: Bar Chart (Categorical totals) -->
        <g transform="translate(520, 0)">
          <rect x="20" y="15" width="220" height="30" rx="15" fill="#38bdf8" fill-opacity="0.12" stroke="#38bdf8" stroke-width="1" />
          <text x="130" y="35" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="13" font-weight="700">BAR CHART: CATEGORIES</text>
          <text x="20" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="13">Compares aggregated metric across distinct groups</text>

          <line x1="40" y1="240" x2="430" y2="240" stroke="#475569" stroke-width="2" />
          ${['Alpha', 'Beta', 'Gamma', 'Delta'].map((cat, i) => {
            const x = 85 + i * 95;
            return `<text x="${x}" y="265" fill="#64748b" font-family="'Inter', sans-serif" font-size="12" text-anchor="middle">${cat}</text>`;
          }).join('')}

          <!-- Bars -->
          <rect x="55" y="140" width="60" height="100" rx="4" fill="#38bdf8" fill-opacity="0.8" />
          <text x="85" y="130" text-anchor="middle" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="11">42</text>

          <rect x="150" y="90" width="60" height="150" rx="4" fill="#38bdf8" fill-opacity="0.8" />
          <text x="180" y="80" text-anchor="middle" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="11">68</text>

          <rect x="245" y="115" width="60" height="125" rx="4" fill="#38bdf8" fill-opacity="0.8" />
          <text x="275" y="105" text-anchor="middle" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="11">54</text>

          <rect x="340" y="170" width="60" height="70" rx="4" fill="#38bdf8" fill-opacity="0.8" />
          <text x="370" y="160" text-anchor="middle" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="11">29</text>

          <rect x="40" y="295" width="390" height="35" rx="6" fill="#1e293b" />
          <text x="235" y="318" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="12" font-weight="600">Best for: Discrete Group Aggregations</text>
        </g>
      </g>
    `
  },
  {
    name: 'compare-dot-plot-maker.png',
    badge: 'Interactive Tool',
    title: 'Compare Two Dot Plots Side by Side',
    desc: 'Evaluate shift in central tendency, dispersion, and shape between two groups',
    svg: `
      <g transform="translate(60, 30)">
        <text x="480" y="15" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">DUAL-GROUP COMPARATIVE DISTRIBUTION</text>

        <!-- Common bottom scale line -->
        <line x1="80" y1="310" x2="880" y2="310" stroke="#475569" stroke-width="2" />
        ${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v, i) => {
          const x = 120 + i * 85;
          return `
            <line x1="${x}" y1="310" x2="${x}" y2="318" stroke="#475569" stroke-width="1.5" />
            <text x="${x}" y="338" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">${v}</text>
          `;
        }).join('')}

        <!-- Group A (Control) -->
        <g transform="translate(0, 30)">
          <rect x="20" y="25" width="130" height="26" rx="13" fill="#00d4aa" fill-opacity="0.12" stroke="#00d4aa" stroke-width="1" />
          <text x="85" y="42" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="12" font-weight="700">GROUP A (Control)</text>
          <line x1="80" y1="120" x2="880" y2="120" stroke="#334155" stroke-width="1.5" />

          <!-- Group A Dots (Center around 35) -->
          <circle cx="205" cy="108" r="8" fill="#00d4aa" />
          <circle cx="248" cy="108" r="8" fill="#00d4aa" /><circle cx="248" cy="88" r="8" fill="#00d4aa" />
          <circle cx="290" cy="108" r="8" fill="#00d4aa" /><circle cx="290" cy="88" r="8" fill="#00d4aa" /><circle cx="290" cy="68" r="8" fill="#00d4aa" />
          <circle cx="332" cy="108" r="8" fill="#00d4aa" /><circle cx="332" cy="88" r="8" fill="#00d4aa" /><circle cx="332" cy="68" r="8" fill="#00d4aa" /><circle cx="332" cy="48" r="8" fill="#00d4aa" />
          <circle cx="375" cy="108" r="8" fill="#00d4aa" /><circle cx="375" cy="88" r="8" fill="#00d4aa" />
          <circle cx="418" cy="108" r="8" fill="#00d4aa" />

          <!-- Median A marker -->
          <line x1="332" y1="35" x2="332" y2="125" stroke="#00d4aa" stroke-width="2" stroke-dasharray="3 3" />
          <rect x="290" y="10" width="84" height="20" rx="4" fill="#00d4aa" />
          <text x="332" y="24" text-anchor="middle" fill="#0a0f14" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">MEDIAN = 35</text>
        </g>

        <!-- Group B (Treatment) -->
        <g transform="translate(0, 160)">
          <rect x="20" y="25" width="140" height="26" rx="13" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="1" />
          <text x="90" y="42" text-anchor="middle" fill="#8b5cf6" font-family="'Inter', sans-serif" font-size="12" font-weight="700">GROUP B (Treatment)</text>
          <line x1="80" y1="120" x2="880" y2="120" stroke="#334155" stroke-width="1.5" />

          <!-- Group B Dots (Shifted right to 65) -->
          <circle cx="502" cy="108" r="8" fill="#8b5cf6" />
          <circle cx="545" cy="108" r="8" fill="#8b5cf6" /><circle cx="545" cy="88" r="8" fill="#8b5cf6" />
          <circle cx="588" cy="108" r="8" fill="#8b5cf6" /><circle cx="588" cy="88" r="8" fill="#8b5cf6" /><circle cx="588" cy="68" r="8" fill="#8b5cf6" />
          <circle cx="630" cy="108" r="8" fill="#8b5cf6" /><circle cx="630" cy="88" r="8" fill="#8b5cf6" /><circle cx="630" cy="68" r="8" fill="#8b5cf6" /><circle cx="630" cy="48" r="8" fill="#8b5cf6" /><circle cx="630" cy="28" r="8" fill="#8b5cf6" />
          <circle cx="672" cy="108" r="8" fill="#8b5cf6" /><circle cx="672" cy="88" r="8" fill="#8b5cf6" />
          <circle cx="715" cy="108" r="8" fill="#8b5cf6" />

          <!-- Median B marker -->
          <line x1="630" y1="15" x2="630" y2="125" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3 3" />
          <rect x="588" y="0" width="84" height="20" rx="4" fill="#8b5cf6" />
          <text x="630" y="14" text-anchor="middle" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700">MEDIAN = 70</text>
        </g>
      </g>
    `
  },
  {
    name: 'dot-and-whisker-plot-maker.png',
    badge: 'Hybrid Analysis',
    title: 'Dot and Whisker Plot Maker',
    desc: 'Aligning a Tukey 5-number summary box plot with individual underlying observations',
    svg: `
      <g transform="translate(60, 40)">
        <text x="480" y="15" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">HYBRID DISPLAY: 5-NUMBER SUMMARY + RAW OBSERVATIONS</text>

        <!-- Common Axis -->
        <line x1="60" y1="280" x2="900" y2="280" stroke="#475569" stroke-width="2" />
        ${[0, 10, 20, 30, 40, 50, 60, 70, 80].map((v, i) => {
          const x = 100 + i * 95;
          return `
            <line x1="${x}" y1="280" x2="${x}" y2="290" stroke="#475569" stroke-width="1.5" />
            <text x="${x}" y="312" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="13" text-anchor="middle">${v}</text>
          `;
        }).join('')}

        <!-- BOX AND WHISKER PLOT (Top Half) -->
        <!-- Lower Whisker -->
        <line x1="195" y1="100" x2="385" y2="100" stroke="#4d96ff" stroke-width="2.5" />
        <line x1="195" y1="80" x2="195" y2="120" stroke="#4d96ff" stroke-width="3" />
        <text x="195" y="70" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">MIN (10)</text>

        <!-- Box (Q1 to Q3) -->
        <rect x="385" y="60" width="285" height="80" rx="6" fill="#4d96ff" fill-opacity="0.2" stroke="#4d96ff" stroke-width="2.5" />
        
        <!-- Median Line -->
        <line x1="528" y1="60" x2="528" y2="140" stroke="#00d4aa" stroke-width="4" />
        <text x="528" y="50" text-anchor="middle" fill="#00d4aa" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700">MEDIAN (45)</text>

        <!-- Q1 & Q3 Labels -->
        <text x="385" y="158" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">Q1 (30)</text>
        <text x="670" y="158" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">Q3 (60)</text>

        <!-- Upper Whisker -->
        <line x1="670" y1="100" x2="812" y2="100" stroke="#4d96ff" stroke-width="2.5" />
        <line x1="812" y1="80" x2="812" y2="120" stroke="#4d96ff" stroke-width="3" />
        <text x="812" y="70" text-anchor="middle" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">MAX (75)</text>

        <!-- Underlying DOT PLOT (Bottom Half aligned with box) -->
        <circle cx="195" cy="260" r="8" fill="#38bdf8" />
        <circle cx="290" cy="260" r="8" fill="#38bdf8" /><circle cx="290" cy="240" r="8" fill="#38bdf8" />
        <circle cx="385" cy="260" r="8" fill="#38bdf8" /><circle cx="385" cy="240" r="8" fill="#38bdf8" /><circle cx="385" cy="220" r="8" fill="#38bdf8" />
        <circle cx="480" cy="260" r="8" fill="#38bdf8" /><circle cx="480" cy="240" r="8" fill="#38bdf8" /><circle cx="480" cy="220" r="8" fill="#38bdf8" /><circle cx="480" cy="200" r="8" fill="#38bdf8" />
        <circle cx="528" cy="260" r="8" fill="#00d4aa" /><circle cx="528" cy="240" r="8" fill="#00d4aa" /><circle cx="528" cy="220" r="8" fill="#00d4aa" /><circle cx="528" cy="200" r="8" fill="#00d4aa" /><circle cx="528" cy="180" r="8" fill="#00d4aa" />
        <circle cx="575" cy="260" r="8" fill="#38bdf8" /><circle cx="575" cy="240" r="8" fill="#38bdf8" /><circle cx="575" cy="220" r="8" fill="#38bdf8" />
        <circle cx="670" cy="260" r="8" fill="#38bdf8" /><circle cx="670" cy="240" r="8" fill="#38bdf8" />
        <circle cx="812" cy="260" r="8" fill="#38bdf8" />
      </g>
    `
  },
  {
    name: 'outlier-dot-plot-maker.png',
    badge: 'Anomaly Detection',
    title: 'Dot Plot Outliers: 1.5×IQR Rule & Detection',
    desc: 'Calculating lower and upper fences to isolate statistical anomalies mathematically',
    svg: `
      <g transform="translate(60, 35)">
        <text x="480" y="15" text-anchor="middle" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">1.5 × IQR FENCE CRITERION FOR OUTLIER CLASSIFICATION</text>

        <!-- Main Axis -->
        <line x1="60" y1="260" x2="900" y2="260" stroke="#475569" stroke-width="2" />
        ${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v, i) => {
          const x = 100 + i * 95;
          return `
            <line x1="${x}" y1="260" x2="${x}" y2="270" stroke="#475569" stroke-width="1.5" />
            <text x="${x}" y="292" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">${v}</text>
          `;
        }).join('')}

        <!-- Normal Range (Q1 - 1.5 IQR to Q3 + 1.5 IQR) -->
        <rect x="240" y="65" width="460" height="180" rx="8" fill="#00d4aa" fill-opacity="0.05" stroke="#00d4aa" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="6 4" />
        <text x="470" y="85" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="12" font-weight="700">ACCEPTED RANGE: [LOWER FENCE ... UPPER FENCE]</text>

        <!-- Lower Fence marker (x = 25) -->
        <line x1="242" y1="65" x2="242" y2="260" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />
        <text x="242" y="55" text-anchor="middle" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="11">Q1 - 1.5×IQR (25)</text>

        <!-- Upper Fence marker (x = 73) -->
        <line x1="700" y1="65" x2="700" y2="260" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />
        <text x="700" y="55" text-anchor="middle" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="11">Q3 + 1.5×IQR (73)</text>

        <!-- Inlier Dots (Green/Teal) -->
        <circle cx="290" cy="242" r="8" fill="#00d4aa" /><circle cx="290" cy="222" r="8" fill="#00d4aa" />
        <circle cx="385" cy="242" r="8" fill="#00d4aa" /><circle cx="385" cy="222" r="8" fill="#00d4aa" /><circle cx="385" cy="202" r="8" fill="#00d4aa" /><circle cx="385" cy="182" r="8" fill="#00d4aa" />
        <circle cx="480" cy="242" r="8" fill="#00d4aa" /><circle cx="480" cy="222" r="8" fill="#00d4aa" /><circle cx="480" cy="202" r="8" fill="#00d4aa" /><circle cx="480" cy="182" r="8" fill="#00d4aa" /><circle cx="480" cy="162" r="8" fill="#00d4aa" /><circle cx="480" cy="142" r="8" fill="#00d4aa" />
        <circle cx="575" cy="242" r="8" fill="#00d4aa" /><circle cx="575" cy="222" r="8" fill="#00d4aa" /><circle cx="575" cy="202" r="8" fill="#00d4aa" />
        <circle cx="670" cy="242" r="8" fill="#00d4aa" /><circle cx="670" cy="222" r="8" fill="#00d4aa" />

        <!-- Severe Outlier Dots (Red/Orange) -->
        <!-- Low outlier (x=10) -->
        <circle cx="100" cy="242" r="10" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
        <rect x="50" y="140" width="100" height="45" rx="6" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5" />
        <text x="100" y="160" text-anchor="middle" fill="#ef4444" font-family="'Inter', sans-serif" font-size="11" font-weight="700">LOW OUTLIER</text>
        <text x="100" y="176" text-anchor="middle" fill="#fca5a5" font-family="'JetBrains Mono', monospace" font-size="11">val = 10 &lt; 25</text>

        <!-- High outlier (x=90) -->
        <circle cx="860" cy="242" r="10" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
        <rect x="810" y="140" width="105" height="45" rx="6" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5" />
        <text x="862" y="160" text-anchor="middle" fill="#ef4444" font-family="'Inter', sans-serif" font-size="11" font-weight="700">HIGH OUTLIER</text>
        <text x="862" y="176" text-anchor="middle" fill="#fca5a5" font-family="'JetBrains Mono', monospace" font-size="11">val = 90 &gt; 73</text>
      </g>
    `
  },
  {
    name: 'statistics-dot-plot-visualizer.png',
    badge: 'Descriptive Stats',
    title: 'Statistics Dot Plot Visualizer',
    desc: 'Mean, Median, Standard Deviation and Quartile diagnostics visualized simultaneously',
    svg: `
      <g transform="translate(60, 35)">
        <text x="480" y="15" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">CENTRAL TENDENCY &amp; DISPERSION METRICS</text>

        <line x1="60" y1="270" x2="900" y2="270" stroke="#475569" stroke-width="2" />
        ${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v, i) => {
          const x = 100 + i * 95;
          return `
            <line x1="${x}" y1="270" x2="${x}" y2="280" stroke="#475569" stroke-width="1.5" />
            <text x="${x}" y="302" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="middle">${v}</text>
          `;
        }).join('')}

        <!-- 1-Sigma Spread Range Band (Mean ± 1 SD) -->
        <rect x="360" y="60" width="280" height="200" rx="8" fill="#38bdf8" fill-opacity="0.08" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="4 4" />
        <text x="500" y="80" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="12" font-weight="700">68% EMPIRICAL RANGE (μ ± 1σ)</text>

        <!-- Mean Line (μ = 52) -->
        <line x1="500" y1="90" x2="500" y2="270" stroke="#38bdf8" stroke-width="2.5" />
        <rect x="445" y="95" width="110" height="22" rx="4" fill="#38bdf8" />
        <text x="500" y="110" text-anchor="middle" fill="#0f172a" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">MEAN (μ) = 52.4</text>

        <!-- Median Line (M = 48) -->
        <line x1="460" y1="90" x2="460" y2="270" stroke="#00d4aa" stroke-width="2.5" stroke-dasharray="3 3" />
        <rect x="395" y="125" width="130" height="22" rx="4" fill="#00d4aa" />
        <text x="460" y="140" text-anchor="middle" fill="#0a0f14" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800">MEDIAN (M) = 48.0</text>

        <!-- Distribution Dots -->
        <circle cx="200" cy="252" r="8" fill="#94a3b8" />
        <circle cx="290" cy="252" r="8" fill="#94a3b8" /><circle cx="290" cy="232" r="8" fill="#94a3b8" />
        <circle cx="385" cy="252" r="8" fill="#00d4aa" /><circle cx="385" cy="232" r="8" fill="#00d4aa" /><circle cx="385" cy="212" r="8" fill="#00d4aa" /><circle cx="385" cy="192" r="8" fill="#00d4aa" />
        <circle cx="480" cy="252" r="8" fill="#00d4aa" /><circle cx="480" cy="232" r="8" fill="#00d4aa" /><circle cx="480" cy="212" r="8" fill="#00d4aa" /><circle cx="480" cy="192" r="8" fill="#00d4aa" /><circle cx="480" cy="172" r="8" fill="#00d4aa" />
        <circle cx="575" cy="252" r="8" fill="#00d4aa" /><circle cx="575" cy="232" r="8" fill="#00d4aa" /><circle cx="575" cy="212" r="8" fill="#00d4aa" />
        <circle cx="670" cy="252" r="8" fill="#94a3b8" /><circle cx="670" cy="232" r="8" fill="#94a3b8" />
        <circle cx="765" cy="252" r="8" fill="#94a3b8" />

        <!-- Right Skew callout -->
        <rect x="680" y="170" width="180" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="770" y="190" text-anchor="middle" fill="#f59e0b" font-family="'Inter', sans-serif" font-size="11" font-weight="700">Right Skewed (Tail &gt; μ)</text>
        <text x="770" y="208" text-anchor="middle" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="10">Mean pulled right of median</text>
      </g>
    `
  },
  {
    name: 'real-world-dot-plot-examples.png',
    badge: 'Applied Statistics',
    title: 'Real-World Dot Plot Examples',
    desc: 'Empirical data distributions across salary structures, exam scores, and race lap times',
    svg: `
      <g transform="translate(60, 30)">
        <!-- Example 1: Tech Salaries ($k) -->
        <g transform="translate(0, 10)">
          <text x="20" y="22" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="13" font-weight="700">① TECH SALARIES ($K) — SKEWED WITH EXECUTIVE OUTLIERS</text>
          <line x1="20" y1="65" x2="940" y2="65" stroke="#334155" stroke-width="1.5" />
          ${[40, 60, 80, 100, 120, 140, 160, 180, 200].map((v, i) => {
            const x = 50 + i * 105;
            return `<text x="${x}" y="82" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="middle">$${v}k</text>`;
          }).join('')}
          <circle cx="70" cy="55" r="6" fill="#00d4aa" /><circle cx="70" cy="42" r="6" fill="#00d4aa" />
          <circle cx="150" cy="55" r="6" fill="#00d4aa" /><circle cx="150" cy="42" r="6" fill="#00d4aa" /><circle cx="150" cy="29" r="6" fill="#00d4aa" /><circle cx="150" cy="16" r="6" fill="#00d4aa" />
          <circle cx="230" cy="55" r="6" fill="#00d4aa" /><circle cx="230" cy="42" r="6" fill="#00d4aa" /><circle cx="230" cy="29" r="6" fill="#00d4aa" />
          <circle cx="310" cy="55" r="6" fill="#00d4aa" />
          <circle cx="890" cy="55" r="8" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
        </g>

        <!-- Example 2: Medical Exam Scores (Bimodal) -->
        <g transform="translate(0, 115)">
          <text x="20" y="22" fill="#8b5cf6" font-family="'Inter', sans-serif" font-size="13" font-weight="700">② BIOMEDICAL EXAM SCORES — BIMODAL STUDENT POPULATION</text>
          <line x1="20" y1="65" x2="940" y2="65" stroke="#334155" stroke-width="1.5" />
          ${[50, 55, 60, 65, 70, 75, 80, 85, 90, 95].map((v, i) => {
            const x = 50 + i * 95;
            return `<text x="${x}" y="82" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="middle">${v}</text>`;
          }).join('')}
          <!-- First peak around 65 -->
          <circle cx="240" cy="55" r="6" fill="#8b5cf6" /><circle cx="240" cy="42" r="6" fill="#8b5cf6" /><circle cx="240" cy="29" r="6" fill="#8b5cf6" />
          <circle cx="335" cy="55" r="6" fill="#8b5cf6" /><circle cx="335" cy="42" r="6" fill="#8b5cf6" /><circle cx="335" cy="29" r="6" fill="#8b5cf6" /><circle cx="335" cy="16" r="6" fill="#8b5cf6" />
          <!-- Gap in middle -->
          <!-- Second peak around 85 -->
          <circle cx="715" cy="55" r="6" fill="#8b5cf6" /><circle cx="715" cy="42" r="6" fill="#8b5cf6" /><circle cx="715" cy="29" r="6" fill="#8b5cf6" /><circle cx="715" cy="16" r="6" fill="#8b5cf6" /><circle cx="715" cy="3" r="6" fill="#8b5cf6" />
          <circle cx="810" cy="55" r="6" fill="#8b5cf6" /><circle cx="810" cy="42" r="6" fill="#8b5cf6" />
        </g>

        <!-- Example 3: Athletic Lap Times (Seconds) -->
        <g transform="translate(0, 220)">
          <text x="20" y="22" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="13" font-weight="700">③ 400M TRACK QUALIFYING TIMES (SECONDS) — NORMAL DISTRIBUTION</text>
          <line x1="20" y1="65" x2="940" y2="65" stroke="#334155" stroke-width="1.5" />
          ${[48, 49, 50, 51, 52, 53, 54, 55].map((v, i) => {
            const x = 80 + i * 110;
            return `<text x="${x}" y="82" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="middle">${v}s</text>`;
          }).join('')}
          <circle cx="190" cy="55" r="6" fill="#38bdf8" />
          <circle cx="300" cy="55" r="6" fill="#38bdf8" /><circle cx="300" cy="42" r="6" fill="#38bdf8" />
          <circle cx="410" cy="55" r="6" fill="#38bdf8" /><circle cx="410" cy="42" r="6" fill="#38bdf8" /><circle cx="410" cy="29" r="6" fill="#38bdf8" /><circle cx="410" cy="16" r="6" fill="#38bdf8" /><circle cx="410" cy="3" r="6" fill="#38bdf8" />
          <circle cx="520" cy="55" r="6" fill="#38bdf8" /><circle cx="520" cy="42" r="6" fill="#38bdf8" /><circle cx="520" cy="29" r="6" fill="#38bdf8" />
          <circle cx="630" cy="55" r="6" fill="#38bdf8" />
        </g>
      </g>
    `
  },
  {
    name: 'how-to-make-a-histogram-in-excel.png',
    badge: 'Spreadsheet Tutorial',
    title: 'How to Make a Histogram in Excel (3 Methods)',
    desc: 'Step-by-step from raw spreadsheet data column to native statistical chart and bin rules',
    svg: `
      <g transform="translate(50, 30)">
        <!-- Left: Excel Sheet Grid Simulation -->
        <g transform="translate(10, 10)">
          <!-- Excel Window Header -->
          <rect x="0" y="0" width="380" height="300" rx="8" fill="#141d27" stroke="#243040" stroke-width="1.5" />
          <rect x="0" y="0" width="380" height="32" rx="8" fill="#107c41" />
          <text x="40" y="21" fill="#ffffff" font-family="'Segoe UI', 'Inter', sans-serif" font-size="13" font-weight="700">Microsoft Excel — Data.xlsx</text>
          
          <!-- Column Headers -->
          <rect x="0" y="32" width="380" height="24" fill="#1e293b" />
          <text x="25" y="48" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">#</text>
          <text x="70" y="48" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">A (Scores)</text>
          <text x="190" y="48" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">B (Bin Edge)</text>
          <text x="300" y="48" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">C (Freq)</text>

          <!-- Selected Data Rows -->
          ${[
            [1, '78.5', '60', '4'],
            [2, '82.0', '70', '9'],
            [3, '64.5', '80', '18'],
            [4, '91.0', '90', '12'],
            [5, '85.5', '100', '7'],
            [6, '73.0', '—', '—'],
            [7, '88.5', '—', '—']
          ].map((row, i) => {
            const y = 60 + i * 28;
            return `
              <rect x="50" y="${y - 4}" width="80" height="24" fill="${i < 5 ? 'rgba(16, 124, 65, 0.25)' : 'none'}" stroke="${i < 5 ? '#107c41' : 'none'}" stroke-width="1" />
              <text x="25" y="${y + 12}" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="11">${row[0]}</text>
              <text x="70" y="${y + 12}" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="11">${row[1]}</text>
              <text x="190" y="${y + 12}" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">${row[2]}</text>
              <text x="300" y="${y + 12}" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">${row[3]}</text>
            `;
          }).join('')}
        </g>

        <!-- Arrow Connection -->
        <g transform="translate(420, 140)">
          <circle cx="35" cy="20" r="26" fill="#1e293b" stroke="#107c41" stroke-width="2" />
          <path d="M 22 20 L 48 20 M 38 12 L 48 20 L 38 28" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <text x="35" y="65" text-anchor="middle" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" font-weight="600">Insert &gt; Statistic</text>
        </g>

        <!-- Right: Generated Excel Histogram Chart -->
        <g transform="translate(520, 10)">
          <rect x="0" y="0" width="440" height="300" rx="8" fill="#141d27" stroke="#243040" stroke-width="1.5" />
          <text x="20" y="32" fill="#ffffff" font-family="'Segoe UI', 'Inter', sans-serif" font-size="14" font-weight="700">Histogram — Automatic Binning (Scott's Rule)</text>
          
          <!-- Axis -->
          <line x1="40" y1="230" x2="400" y2="230" stroke="#475569" stroke-width="1.5" />
          ${['[50, 60]', '(60, 70]', '(70, 80]', '(80, 90]', '(90, 100]'].map((b, i) => {
            const x = 75 + i * 65;
            return `<text x="${x}" y="250" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="middle">${b}</text>`;
          }).join('')}

          <!-- Bars with Excel-like Blue styling -->
          <rect x="45" y="180" width="60" height="50" fill="#2563eb" stroke="#1d4ed8" stroke-width="1" />
          <rect x="110" y="130" width="60" height="100" fill="#2563eb" stroke="#1d4ed8" stroke-width="1" />
          <rect x="175" y="70" width="60" height="160" fill="#3b82f6" stroke="#2563eb" stroke-width="1" />
          <rect x="240" y="110" width="60" height="120" fill="#2563eb" stroke="#1d4ed8" stroke-width="1" />
          <rect x="305" y="160" width="60" height="70" fill="#2563eb" stroke="#1d4ed8" stroke-width="1" />

          <!-- Method Pills -->
          <g transform="translate(20, 268)">
            <rect x="0" y="0" width="120" height="22" rx="4" fill="#1e293b" />
            <text x="60" y="15" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="10" font-weight="600">1. Native Chart</text>

            <rect x="135" y="0" width="120" height="22" rx="4" fill="#1e293b" />
            <text x="195" y="15" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="10" font-weight="600">2. Analysis ToolPak</text>

            <rect x="270" y="0" width="120" height="22" rx="4" fill="#1e293b" />
            <text x="330" y="15" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="10" font-weight="600">3. FREQUENCY ()</text>
          </g>
        </g>
      </g>
    `
  },
  {
    name: 'ap-statistics-cheat-sheet.png',
    badge: 'Exam Prep & Formulas',
    title: 'AP Statistics Cheat Sheet (Formulas + PDF)',
    desc: 'Complete College Board units reference: formulas, inference tests, and the SOCS framework',
    svg: `
      <g transform="translate(60, 25)">
        <text x="480" y="15" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">COLLEGE BOARD AP® STATS DEFINITIVE UNIT REFERENCE</text>

        <!-- Grid of 4 formula cards -->
        <!-- Card 1: SOCS Framework -->
        <g transform="translate(20, 35)">
          <rect width="440" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
          <rect x="15" y="15" width="80" height="24" rx="4" fill="#00d4aa" fill-opacity="0.2" />
          <text x="55" y="31" text-anchor="middle" fill="#00d4aa" font-family="'Inter', sans-serif" font-size="11" font-weight="700">UNIT 1: EDA</text>
          <text x="110" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700">The SOCS Framework</text>
          
          <text x="20" y="65" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="12">S — Shape</text>
          <text x="140" y="65" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">(Skewness, Modality, Symmetry)</text>
          
          <text x="20" y="85" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="12">O — Outliers</text>
          <text x="140" y="85" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">(1.5 × IQR Rule / 2σ Fence)</text>

          <text x="20" y="105" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="12">C — Center &amp; S — Spread</text>
          <text x="230" y="105" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">(Median/IQR vs Mean/SD)</text>
        </g>

        <!-- Card 2: Probability & Normal Model -->
        <g transform="translate(500, 35)">
          <rect width="440" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
          <rect x="15" y="15" width="85" height="24" rx="4" fill="#8b5cf6" fill-opacity="0.2" />
          <text x="57" y="31" text-anchor="middle" fill="#a78bfa" font-family="'Inter', sans-serif" font-size="11" font-weight="700">UNITS 3-5</text>
          <text x="115" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700">Standardized Z-Score &amp; Normal</text>
          
          <rect x="25" y="55" width="180" height="50" rx="6" fill="#0f172a" />
          <text x="115" y="85" text-anchor="middle" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700">z = (x - μ) / σ</text>

          <text x="230" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">Standard Error:</text>
          <text x="230" y="90" fill="#a78bfa" font-family="'JetBrains Mono', monospace" font-size="12">SE(x̄) = s / √n</text>
          <text x="230" y="110" fill="#a78bfa" font-family="'JetBrains Mono', monospace" font-size="12">SE(p̂) = √(p̂(1-p̂)/n)</text>
        </g>

        <!-- Card 3: Inference & Confidence Intervals -->
        <g transform="translate(20, 180)">
          <rect width="440" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
          <rect x="15" y="15" width="85" height="24" rx="4" fill="#38bdf8" fill-opacity="0.2" />
          <text x="57" y="31" text-anchor="middle" fill="#38bdf8" font-family="'Inter', sans-serif" font-size="11" font-weight="700">UNITS 6-7</text>
          <text x="115" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700">Inference &amp; Confidence Intervals</text>

          <rect x="25" y="55" width="230" height="50" rx="6" fill="#0f172a" />
          <text x="140" y="85" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700">Stat ± (CritVal)(SE)</text>

          <text x="275" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">Conditions Checklist:</text>
          <text x="275" y="88" fill="#e2e8f0" font-family="'Inter', sans-serif" font-size="11">✓ Random 10% Condition</text>
          <text x="275" y="105" fill="#e2e8f0" font-family="'Inter', sans-serif" font-size="11">✓ Large Counts: np ≥ 10</text>
        </g>

        <!-- Card 4: Chi-Square & Regression -->
        <g transform="translate(500, 180)">
          <rect width="440" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
          <rect x="15" y="15" width="85" height="24" rx="4" fill="#f59e0b" fill-opacity="0.2" />
          <text x="57" y="31" text-anchor="middle" fill="#fbbf24" font-family="'Inter', sans-serif" font-size="11" font-weight="700">UNITS 8-9</text>
          <text x="115" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700">Chi-Square &amp; Linear Slopes</text>

          <rect x="25" y="55" width="220" height="50" rx="6" fill="#0f172a" />
          <text x="135" y="85" text-anchor="middle" fill="#fbbf24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700">χ² = Σ (O - E)² / E</text>

          <text x="265" y="72" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">Regression Slope:</text>
          <text x="265" y="92" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13">b₁ = r (sy / sx)</text>
          <text x="265" y="110" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11">ŷ = b₀ + b₁x</text>
        </g>
      </g>
    `
  },
  {
    name: 'scatter-plot-deep-dive.png',
    badge: 'Bivariate Analysis',
    title: 'The Scatter Plot: Correlation, Patterns & Modeling',
    desc: 'Cartesian (X, Y) coordinates, Pearson r strength, trendline regression, and residual variance',
    svg: `
      <g transform="translate(60, 30)">
        <text x="480" y="15" text-anchor="middle" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="1">BIVARIATE CORRELATION &amp; LINEAR REGRESSION (r = 0.92)</text>

        <!-- Coordinate System -->
        <!-- Y Axis -->
        <line x1="120" y1="40" x2="120" y2="280" stroke="#475569" stroke-width="2" />
        <text x="80" y="160" text-anchor="middle" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="12" font-weight="700" transform="rotate(-90 80 160)">Response Variable (Y)</text>

        <!-- X Axis -->
        <line x1="120" y1="280" x2="880" y2="280" stroke="#475569" stroke-width="2" />
        <text x="500" y="325" text-anchor="middle" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="12" font-weight="700">Explanatory Variable (X)</text>

        <!-- Grid Lines -->
        ${[1, 2, 3, 4].map(i => `
          <line x1="120" y1="${40 + i * 48}" x2="880" y2="${40 + i * 48}" stroke="#1e293b" stroke-width="1" />
          <line x1="${120 + i * 152}" y1="40" x2="${120 + i * 152}" y2="280" stroke="#1e293b" stroke-width="1" />
        `).join('')}

        <!-- Best Fit Regression Line -->
        <line x1="150" y1="260" x2="850" y2="60" stroke="#38bdf8" stroke-width="3" />

        <!-- Confidence band -->
        <polygon points="150,280 850,90 850,30 150,240" fill="#38bdf8" fill-opacity="0.08" />

        <!-- Scatter Points (Positive Linear Relationship) -->
        ${[
          [160, 250], [180, 235], [210, 248], [240, 215], [270, 230], [290, 200],
          [330, 210], [360, 185], [390, 175], [420, 195], [450, 160], [480, 150],
          [520, 165], [550, 135], [580, 120], [610, 140], [640, 115], [680, 95],
          [710, 110], [740, 80],  [780, 90],  [810, 65],  [840, 75]
        ].map(([x, y]) => `
          <circle cx="${x}" cy="${y}" r="6.5" fill="#00d4aa" stroke="#ffffff" stroke-width="1.5" />
        `).join('')}

        <!-- Callout: Regression Formula & r -->
        <rect x="160" y="55" width="220" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
        <text x="270" y="80" text-anchor="middle" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">ŷ = 12.4 + 1.82 x</text>
        <text x="270" y="100" text-anchor="middle" fill="#00d4aa" font-family="'JetBrains Mono', monospace" font-size="12">r = +0.924 (Strong)</text>

        <!-- Residual arrow indicator -->
        <line x1="420" y1="195" x2="420" y2="183" stroke="#f43f5e" stroke-width="2" stroke-dasharray="2 2" />
        <rect x="430" y="195" width="125" height="24" rx="4" fill="#f43f5e" fill-opacity="0.2" />
        <text x="492" y="211" text-anchor="middle" fill="#fca5a5" font-family="'Inter', sans-serif" font-size="10" font-weight="600">Residual (y - ŷ)</text>
      </g>
    `
  }
];

async function generateAll() {
  for (const img of images) {
    const fullSvg = svgWrapper(img.badge, img.title, img.desc, img.svg);
    const dest = path.join(outDir, img.name);
    await sharp(Buffer.from(fullSvg))
      .png({ quality: 90 })
      .toFile(dest);
    console.log(`Generated: ${img.name}`);
  }
  console.log('All 12 featured images generated successfully!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
