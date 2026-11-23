// Renders the PNG files listed by kit.py. Run from the repository root after kit.py:
//   node brand/build/raster.cjs
const path = require('node:path');
const fs = require('node:fs');
const sharp = require('sharp');
const jobsFile = path.join(__dirname, 'jobs.json');
const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
(async () => {
  for (const job of jobs) await sharp(Buffer.from(job.svg), { density: 72 }).png({ compressionLevel: 9 }).toFile(job.out);
  fs.unlinkSync(jobsFile);
  console.log(`wrote ${jobs.length} png files`);
})().catch((error) => { console.error(error); process.exit(1); });
