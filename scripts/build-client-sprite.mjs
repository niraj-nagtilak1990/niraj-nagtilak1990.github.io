/**
 * Fetches client logos via a real Chromium browser (Playwright) so Clearbit
 * serves them as it would to a normal visitor, then stitches them into a
 * single PNG sprite using sharp.
 *
 * Run with:  node scripts/build-client-sprite.mjs
 */

import sharp from 'sharp';
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'file:///C:/Users/nirajn/AppData/Local/npm-cache/_npx/5e2e484947874241/node_modules/playwright/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const clients = [
  { name: 'ANZ Bank',                 domain: 'anz.com',                  url: 'https://www.anz.co.nz' },
  { name: 'Auckland Council',         domain: 'aucklandcouncil.govt.nz',  url: 'https://www.aucklandcouncil.govt.nz' },
  { name: 'Belize Tax Administration',domain: 'btb.gov.bz',               url: 'https://www.btb.gov.bz' },
  { name: 'Bhutan Revenue & Customs', domain: 'drcsm.gov.bt',             url: 'https://www.drcsm.gov.bt' },
  { name: 'Capgemini',                domain: 'capgemini.com',            url: 'https://www.capgemini.com' },
  { name: 'Cook Islands Revenue',     domain: 'revenue.gov.ck',           url: 'https://www.revenue.gov.ck' },
  { name: 'Cyprus Tax Dept',          domain: 'mof.gov.cy',               url: 'https://www.mof.gov.cy' },
  { name: 'DataTorque',               domain: 'datatorque.com',           url: 'https://www.datatorque.com' },
  { name: 'Guyana Revenue Authority', domain: 'gra.gov.gy',               url: 'https://www.gra.gov.gy' },
  { name: 'Mastercard',               domain: 'mastercard.com',           url: 'https://www.mastercard.com' },
  { name: 'MBIE',                     domain: 'mbie.govt.nz',             url: 'https://www.mbie.govt.nz' },
  { name: 'Ministry of Education NZ', domain: 'education.govt.nz',        url: 'https://www.education.govt.nz' },
  { name: 'NZ Police',                domain: 'police.govt.nz',           url: 'https://www.police.govt.nz' },
  { name: 'SMC Global',               domain: 'smcglobal.com',            url: 'https://www.smcglobal.com' },
  { name: 'Smart Salary',             domain: 'smartsalary.com.au',       url: 'https://www.smartsalary.com.au' },
  { name: 'Toyota NZ',                domain: 'toyota.co.nz',             url: 'https://www.toyota.co.nz' },
];

const SLOT_W = 80;
const SLOT_H = 80;

function makeInitialsSvg(name) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return Buffer.from(`<svg width="${SLOT_W}" height="${SLOT_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${SLOT_W}" height="${SLOT_H}" rx="10" fill="#1e1e1e"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="#C8A96E"
      font-family="Arial, sans-serif" font-size="22" font-weight="bold">${initials}</text>
  </svg>`);
}

const LOCAL_LOGOS_DIR = resolve(ROOT, 'public', 'images', 'logos');

// Build a map of stem→filepath from local logos folder
function getLocalLogoMap() {
  if (!existsSync(LOCAL_LOGOS_DIR)) return {};
  return Object.fromEntries(
    readdirSync(LOCAL_LOGOS_DIR).map(f => [f.replace(extname(f), '').toLowerCase(), resolve(LOCAL_LOGOS_DIR, f)])
  );
}

// Keys that map each client to its local file stem (must match filename without extension)
const LOCAL_KEY = {
  'DataTorque':               'DataTorque',
  'SMC Global':               'SMCGlobal',
  'Smart Salary':             'SmartSalary',
  'Ministry of Education NZ': 'EducationNZ',
  'Bhutan Revenue & Customs': 'BhutanDRC',
  'Belize Tax Administration':'BelizeBTB',
  'Cook Islands Revenue':     'CookIslands',
};

async function fetchLogosViaBrowser() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const localMap = getLocalLogoMap();
  const buffers = [];

  for (const client of clients) {
    // 1. Try local file first
    const localKey = (LOCAL_KEY[client.name] || '').toLowerCase();
    if (localKey && localMap[localKey]) {
      console.log(`  ✓  ${client.name} (local file)`);
      buffers.push(resolve(localMap[localKey])); // push path string — handled below
      continue;
    }

    // 2. Fall back to Google favicon via browser
    const logoUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${client.domain}&size=256`;
    try {
      const response = await page.goto(logoUrl, { waitUntil: 'networkidle', timeout: 10000 });
      if (response && response.ok()) {
        const buf = await response.body();
        if (buf.length > 500) {
          console.log(`  ✓  ${client.name} (web)`);
          buffers.push(buf);
          continue;
        }
      }
    } catch { /* fall through */ }

    console.log(`  ✗  ${client.name} (using initials)`);
    buffers.push(null);
  }

  await browser.close();
  return buffers;
}

// Dark card background colour matching --card: #161B22
const CARD_BG = { r: 22, g: 27, b: 34, alpha: 255 };

async function processLogo(buf, name) {
  const source = buf ?? makeInitialsSvg(name);

  // Trim transparent/white padding baked into the source, then resize to fill slot
  const trimmed = await sharp(source)
    .trim({ background: '#ffffff', threshold: 40 })
    .png()
    .toBuffer()
    .catch(() => sharp(source).png().toBuffer()); // fallback if trim fails

  const resized = await sharp(trimmed)
    .resize(SLOT_W - 16, SLOT_H - 16, {
      fit: 'contain',
      background: CARD_BG,
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  // Composite the resized logo centred over a solid dark card background
  const meta = await sharp(resized).metadata();
  const left = Math.round((SLOT_W - meta.width) / 2);
  const top  = Math.round((SLOT_H - meta.height) / 2);

  return sharp({
    create: { width: SLOT_W, height: SLOT_H, channels: 4, background: CARD_BG },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toBuffer();
}

async function main() {
  console.log(`Fetching ${clients.length} logos via browser…\n`);
  const rawBuffers = await fetchLogosViaBrowser();

  const processed = await Promise.all(
    rawBuffers.map((buf, i) => processLogo(buf, clients[i].name))
  );

  const spriteW = SLOT_W * clients.length;

  const composites = processed.map((buf, i) => ({
    input: buf,
    left: i * SLOT_W,
    top: 0,
  }));

  mkdirSync(resolve(ROOT, 'public', 'images'), { recursive: true });

  await sharp({
    create: {
      width: spriteW,
      height: SLOT_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png()
    .toFile(resolve(ROOT, 'public', 'images', 'client-sprite.png'));

  console.log(`\n✓ Sprite saved → public/images/client-sprite.png (${spriteW}×${SLOT_H}px)`);

  const dataOut = `// Auto-generated by scripts/build-client-sprite.mjs — do not edit manually
export const SLOT_W = ${SLOT_W};
export const SLOT_H = ${SLOT_H};
export const SPRITE_TOTAL_W = ${spriteW};
export const clientSprite = ${JSON.stringify(
    clients.map((c, i) => ({ name: c.name, url: c.url, x: i * SLOT_W })),
    null, 2
  )};
`;

  writeFileSync(resolve(ROOT, 'src', 'data', 'clientSprite.js'), dataOut);
  console.log('✓ Position data saved → src/data/clientSprite.js');
}

main().catch(e => { console.error(e); process.exit(1); });
