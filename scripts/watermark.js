// scripts/watermark.js
// Aplica marca d'água em mosaico (tile) nas imagens do diretório SRC_ROOT
// Saída espelha a estrutura em DST_ROOT
//
// Requisitos: npm i -D sharp globby
//
// Como usar:
//   npm run wm
//
// Dica: deixe os ORIGINAIS fora do build e use as imagens marcadas (DST_ROOT) na galeria.

const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const { globby } = require("globby");

/* =============== CONFIG =============== */

// Raiz com as imagens ORIGINAIS (não marcadas)
const SRC_ROOT = "src/assets/img/espetaculos";
// Raiz de saída com IMAGENS MARCADAS
const DST_ROOT = "src/assets/img_wm/espetaculos";
// Arquivo do logo (PNG com transparência)
const LOGO_PATH = "src/assets/img/logo_gold.png";

// Intensidade/estilo do mosaico (versão forte)
const OPACITY = 1;   // transparência da marca (quanto maior, mais forte)
const ROTATE = -25;     // rotação do padrão
const TILE_RATIO = 0.15; // logo ocupa ~30% da largura da foto
const TILE_GAP = 0.30;   // apenas 15% de espaçamento entre tiles

// Extensões suportadas
const EXTENSIONS = "jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP";

/* =============== HELPERS =============== */
async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function dataUriFromBuffer(buf) {
  const base64 = buf.toString("base64");
  return `data:image/png;base64,${base64}`;
}

async function buildTiledSVGOverlay(imgWidth, imgHeight, logoBuf) {
  const tileW = Math.max(64, Math.round(imgWidth * TILE_RATIO));
  const gapPx = Math.round(tileW * TILE_GAP);
  const patternW = tileW + gapPx;
  const patternH = tileW + gapPx;
  const logoDataUri = dataUriFromBuffer(logoBuf);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${imgWidth}" height="${imgHeight}">
  <defs>
    <pattern id="wm" patternUnits="userSpaceOnUse"
             width="${patternW}" height="${patternH}"
             patternTransform="rotate(${ROTATE})">
      <image href="${logoDataUri}" x="0" y="0"
             width="${tileW}" height="${tileW}"
             opacity="${OPACITY}" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#wm)" />
</svg>`.trim();

  return Buffer.from(svg);
}

async function processOne(srcFile, dstFile, logoBuf) {
  const img = sharp(srcFile, { failOn: "none" });
  const meta = await img.metadata();
  if (!meta.width || !meta.height) {
    throw new Error(`Não foi possível ler dimensões da imagem: ${srcFile}`);
  }
  const overlay = await buildTiledSVGOverlay(meta.width, meta.height, logoBuf);
  await ensureDir(path.dirname(dstFile));
  await sharp(srcFile).composite([{ input: overlay }]).toFile(dstFile);
  console.log("✔︎", path.relative(process.cwd(), dstFile));
}

(async () => {
  const srcRootPosix = SRC_ROOT.replace(/\\/g, "/");
  const pattern = `${srcRootPosix}/**/*.{${EXTENSIONS}}`;

  console.log("🔎 Procurando por imagens em:", pattern);

  const files = await globby([pattern], { dot: false });

  if (!files.length) {
    console.log("Nenhuma imagem encontrada em", SRC_ROOT);
    process.exit(0);
  }

  const logoBuf = await fs.readFile(LOGO_PATH);

  console.log(`\nAplicando marca d'água (forte, mosaico) em ${files.length} arquivo(s)...\n`);
  for (const srcFile of files) {
    const rel = srcFile.replace(srcRootPosix + "/", "");
    const dstFile = path.join(DST_ROOT, rel).replace(/\\/g, "/");
    try {
      await processOne(srcFile, dstFile, logoBuf);
    } catch (err) {
      console.error("✖︎ Erro:", srcFile, "-", err.message);
    }
  }
  console.log("\n✅ Concluído.");
})().catch((err) => {
  console.error("Falha geral:", err);
  process.exit(1);
});
