import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/noir';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function gen(prompt: string, size: string, file: string) {
  const zai = await ZAI.create();
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await zai.images.generations.create({ prompt, size });
      const b64 = res.data[0].base64;
      const buf = Buffer.from(b64, 'base64');
      const outPath = path.join(OUT_DIR, file);
      fs.writeFileSync(outPath, buf);
      console.log(`✓ ${file} (${(buf.length / 1024).toFixed(1)} KB)`);
      return;
    } catch (e) {
      lastErr = e;
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`  attempt ${attempt} failed for ${file}: ${msg.slice(0, 120)}`);
      // backoff: 8s, 12s, 18s, 25s
      await sleep(8000 * attempt);
    }
  }
  throw lastErr;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const jobs: Array<{ prompt: string; size: string; file: string }> = [
    {
      prompt:
        'Cinematic film-noir detective desk at night, a single brass gooseneck desk lamp casting a warm amber pool of light onto scattered case files, photographs and a coffee mug, deep shadows, dark mahogany wood, moody chiaroscuro lighting, volumetric dust in the light beam, 1940s atmosphere, photorealistic, high detail, dark background fading to black at edges',
      size: '1344x768',
      file: 'hero-desk.png',
    },
    {
      prompt:
        'Vintage 1940s police mugshot, portrait of an elegant wealthy heiress in her 40s wearing a fur stole and pearl necklace, cold calculating gaze, holding a booking number board, harsh flash photography against height chart background, black and white noir film grain, high contrast',
      size: '864x1152',
      file: 'suspect-heiress.png',
    },
    {
      prompt:
        'Vintage 1940s police mugshot, portrait of a stern elderly butler in formal black tailcoat with bow tie, gaunt face, steel-grey eyes, holding a booking number board, harsh flash photography against height chart background, black and white noir film grain, high contrast',
      size: '864x1152',
      file: 'suspect-butler.png',
    },
    {
      prompt:
        'Vintage 1940s police mugshot, portrait of a glamorous jazz club singer in her 30s with finger-wave hairstyle and a sequined dress, smoky eyeliner, enigmatic half-smile, holding a booking number board, harsh flash photography against height chart background, black and white noir film grain, high contrast',
      size: '864x1152',
      file: 'suspect-singer.png',
    },
    {
      prompt:
        'Vintage 1940s police mugshot, portrait of a middle-aged doctor with round spectacles and a trimmed beard, tweed jacket, tired intelligent eyes, holding a booking number board, harsh flash photography against height chart background, black and white noir film grain, high contrast',
      size: '864x1152',
      file: 'suspect-doctor.png',
    },
    {
      prompt:
        'Vintage 1940s police mugshot, portrait of a young working-class chauffeur in a peaked cap and leather jacket, rugged jaw, suspicious squint, holding a booking number board, harsh flash photography against height chart background, black and white noir film grain, high contrast',
      size: '864x1152',
      file: 'suspect-chauffeur.png',
    },
  ];

  for (let i = 0; i < jobs.length; i++) {
    const j = jobs[i];
    if (fs.existsSync(path.join(OUT_DIR, j.file))) {
      console.log(`• skip ${j.file} (exists)`);
      continue;
    }
    console.log(`→ generating ${j.file} (${i + 1}/${jobs.length})`);
    await gen(j.prompt, j.size, j.file);
    // gentle delay between successes to avoid rate limits
    await sleep(3000);
  }
  console.log('ALL DONE');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
