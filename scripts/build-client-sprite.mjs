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

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Single source of truth — names & URLs come from clients.js
import { clients as clientData } from '../src/data/clients.js';

// Build the clients array for the sprite (filter out any without a LOCAL_KEY entry later)
const clients = clientData.map(c => ({ name: c.name, url: c.url, domain: c.domain }));

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
  'ANZ Bank':                  'anz',
  'Auckland Council':          'auckland-council',
  'Belize Tax Administration': 'belize-tax',
  'Bhutan Revenue & Customs':  'bhutan-drc',
  'Capgemini':                 'capgemini-orig',
  'Cook Islands Revenue':      'cook-islands',
  'Cyprus Tax Dept':           'cyprus-tax',
  'DataTorque':                'datatorque-orig',
  'Guyana Revenue Authority':  'guyana-gra',
  'Mastercard':                'mastercard',
  'MBIE':                      'mbie',
  'Ministry of Education NZ':  'moe-nz',
  'NZ Police':                 'nz-police',
  'SMC Global':                'smc-global',
  'Smart Salary':              'smart-salary',
  'Toyota NZ':                 'toyota-orig',
  'Perpetual Guardian':        'perpetual-guardian',
  'Fire & Emergency NZ':       'fenz',
  'Itemize':                   'itemize',
};

async function fetchLogos() {
  const localMap = getLocalLogoMap();
  const buffers = [];

  for (const client of clients) {
    const localKey = (LOCAL_KEY[client.name] || '').toLowerCase();
    if (localKey && localMap[localKey]) {
      console.log(`  ✓  ${client.name}`);
      buffers.push(localMap[localKey]); // filepath — sharp accepts path strings directly
    } else {
      console.log(`  ✗  ${client.name} (no local file — using initials)`);
      buffers.push(null);
    }
  }

  return buffers;
}

// Dark card background colour matching --card: #161B22
const CARD_BG = { r: 22, g: 27, b: 34, alpha: 255 };

async function processLogo(buf, name) {
  const source = buf ?? makeInitialsSvg(name);

  // Trim transparent/white padding then resize — use 72px (SLOT-8) so logos aren't small
  const trimmed = await sharp(source)
    .trim({ background: '#ffffff', threshold: 30 })
    .png()
    .toBuffer()
    .catch(() => sharp(source).png().toBuffer());

  const logoArea = SLOT_W - 8; // 72px — larger than before (was 64px)

  const resized = await sharp(trimmed)
    .resize(logoArea, logoArea, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  const meta  = await sharp(resized).metadata();
  const left  = Math.round((SLOT_W - meta.width)  / 2);
  const top   = Math.round((SLOT_H - meta.height) / 2);

  // White backing so dark-coloured logos (NZ Police, MBIE, MoE NZ) are visible on dark themes
  const whiteBacking = await sharp({
    create: { width: SLOT_W - 4, height: SLOT_H - 4, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } },
  }).png().toBuffer();

  return sharp({
    create: { width: SLOT_W, height: SLOT_H, channels: 4, background: CARD_BG },
  })
    .composite([
      { input: whiteBacking, left: 2, top: 2 },
      { input: resized, left, top },
    ])
    .png()
    .toBuffer();
}

async function main() {
  console.log(`Building sprite from ${clients.length} local logos…\n`);
  const rawBuffers = await fetchLogos();

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
