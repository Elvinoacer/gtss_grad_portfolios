import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Regenerate with: node scripts/generate-og-image.mjs
// Use the real portfolio artwork and GTSS mark rather than invented mockups.
const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "public/og");
await mkdir(output, { recursive: true });

async function screenshot(name) {
  const data = await sharp(path.join(root, "public/project_screenshots", name))
    .resize(760, 428, { fit: "cover" })
    .png()
    .toBuffer();
  return `data:image/png;base64,${data.toString("base64")}`;
}

const civil = await screenshot("faith-wanjiru-civil.png");
const electronics = await screenshot("ian-kamau-electronics.png");
const mark = (await readFile(path.join(root, "public/gtss-mark.svg"))).toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow"><stop stop-color="#E2A84B" stop-opacity=".15"/><stop offset="1" stop-color="#E2A84B" stop-opacity="0"/></radialGradient>
    <linearGradient id="base" x2="1" y2="1"><stop stop-color="#11151B"/><stop offset="1" stop-color="#080A0D"/></linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#F4F6F8" stroke-opacity=".025"/></pattern>
    <clipPath id="card"><rect x="0" y="0" width="380" height="214" rx="8"/></clipPath>
    <filter id="shadow" x="-30%" y="-40%" width="160%" height="190%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity=".65"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#base)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <ellipse cx="1000" cy="305" rx="450" ry="430" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="5" fill="#E2A84B"/>
  <g font-family="DejaVu Sans, sans-serif">
    <image href="data:image/svg+xml;base64,${mark}" x="60" y="46" width="48" height="48"/>
    <text x="124" y="68" fill="#F4F6F8" font-size="21" font-weight="700" letter-spacing="1">GTSS</text>
    <text x="124" y="91" fill="#B2BCC8" font-size="15" letter-spacing="1.7">GRADUATE PORTFOLIOS</text>
    <text x="1140" y="75" text-anchor="end" fill="#E2A84B" font-size="13" letter-spacing="1.6">THE MOI UNIVERSITY COLLECTION</text>

    <text x="60" y="199" fill="#B2BCC8" font-size="35" letter-spacing="-1">More than a degree.</text>
    <text x="56" y="285" fill="#F4F6F8" font-size="76" font-weight="700" letter-spacing="-3.8">Show what</text>
    <text x="56" y="373" fill="#E2A84B" font-size="76" font-weight="700" letter-spacing="-3.8">you can do.</text>
    <text x="60" y="428" fill="#B2BCC8" font-size="22">Graduate portfolios built around your</text>
    <text x="60" y="460" fill="#B2BCC8" font-size="22">projects, skills and ambition.</text>

    <g transform="translate(744 146) rotate(4 190 107)" filter="url(#shadow)">
      <rect x="-1" y="-25" width="382" height="240" rx="10" fill="#151922" stroke="#444039"/>
      <circle cx="13" cy="-12" r="3" fill="#E2A84B"/><circle cx="25" cy="-12" r="3" fill="#59616C"/><circle cx="37" cy="-12" r="3" fill="#59616C"/>
      <text x="367" y="-8" text-anchor="end" fill="#B2BCC8" font-size="9" letter-spacing="1">ENGINEERING</text>
      <image href="${civil}" width="380" height="214" clip-path="url(#card)"/>
    </g>
    <g transform="translate(698 332) rotate(-5 190 107)" filter="url(#shadow)">
      <rect x="-1" y="-25" width="382" height="240" rx="10" fill="#151922" stroke="#645035"/>
      <circle cx="13" cy="-12" r="3" fill="#E2A84B"/><circle cx="25" cy="-12" r="3" fill="#59616C"/><circle cx="37" cy="-12" r="3" fill="#59616C"/>
      <text x="367" y="-8" text-anchor="end" fill="#B2BCC8" font-size="9" letter-spacing="1">ELECTRICAL &amp; ELECTRONICS</text>
      <image href="${electronics}" width="380" height="214" clip-path="url(#card)"/>
    </g>

    <rect x="60" y="497" width="294" height="49" rx="6" fill="#E2A84B"/>
    <text x="81" y="528" fill="#0B0C0F" font-size="18" font-weight="700">Explore the portfolios</text>
    <path d="M320 522h15m-6-6 6 6-6 6" fill="none" stroke="#0B0C0F" stroke-width="2"/>
    <path d="M60 574H1140" stroke="#2E3540"/>
    <text x="60" y="607" fill="#8B97A5" font-size="14" letter-spacing=".5">Built for your profession. Ready to share.</text>
    <text x="1140" y="607" text-anchor="end" fill="#B2BCC8" font-size="14">portfolios.gtss.software</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(output, "graduate-portfolios-v2.jpg"));
console.log("Created public/og/graduate-portfolios-v2.jpg (1200 × 630)");
