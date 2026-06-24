/**
 * Image generation script for Space Economy chapter.
 * Run: OPENAI_API_KEY=sk-... node scripts/generate-space-images.mjs
 */
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const images = [
  {
    filename: "space_hero_earth.png",
    prompt:
      "Ultra-cinematic satellite view of Earth from low orbit at night, Indian subcontinent glowing with city lights, deep black space, dramatic cloud swirls, photorealistic, 8k resolution, no text, dark moody atmosphere",
  },
  {
    filename: "space_ecosystem_orbital.png",
    prompt:
      "Abstract technical blueprint visualization of orbital satellite constellations around Earth, glowing teal circuit-board lines, dark navy background, no text, futuristic engineering aesthetic, highly detailed",
  },
  {
    filename: "space_jio_swarm.png",
    prompt:
      "Dense swarm of tiny LEO satellites orbiting Earth, hundreds of glowing nodes in precise orbital tracks, deep space backdrop, teal and white light trails, no text, cinematic sci-fi realism",
  },
  {
    filename: "space_value_chain.png",
    prompt:
      "Futuristic technical schematic showing a modular rocket disassembled into its engineering components, dark background, glowing teal annotation lines, blueprint aesthetic, no text, ultra clean",
  },
  {
    filename: "space_capital_flow.png",
    prompt:
      "Abstract visualization of financial flows as glowing energy streams, branching like rivers of light from a central government node to startups and industry nodes, dark background, teal and gold light paths, no text",
  },
  {
    filename: "space_matrix_bg.png",
    prompt:
      "Dark futuristic control room with glowing investment risk/reward matrices on screens, teal and amber hues, depth of field blur, no text, cinematic lighting",
  },
  {
    filename: "space_thesis_final.png",
    prompt:
      "Spectacular view of Earth rising from behind the Moon seen from deep space, stars blazing, dramatic shadows, photorealistic, awe-inspiring, vast scale, no text, ultra cinematic",
  },
];

async function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", reject);
  });
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌  Missing OPENAI_API_KEY environment variable.");
    console.error("    Run: OPENAI_API_KEY=sk-... node scripts/generate-space-images.mjs");
    process.exit(1);
  }

  console.log(`Generating ${images.length} images for Space Economy chapter...\n`);

  for (const img of images) {
    const outputPath = path.join(publicDir, img.filename);
    if (fs.existsSync(outputPath)) {
      console.log(`⏭  Skipping ${img.filename} (already exists)`);
      continue;
    }

    process.stdout.write(`🎨  Generating ${img.filename} ... `);
    try {
      const response = await client.images.generate({
        model: "dall-e-3",
        prompt: img.prompt,
        n: 1,
        size: "1792x1024",
        quality: "hd",
      });

      const url = response.data[0].url;
      await downloadImage(url, outputPath);
      console.log("✅");
    } catch (err) {
      console.log(`❌  ${err.message}`);
    }
  }

  console.log("\nDone! Images saved to /public/");
}

main();
