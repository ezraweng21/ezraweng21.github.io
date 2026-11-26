import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Input layout: Blue Lock above One Piece, three equally sized panels per row.
const input = process.argv[2];
if (!input) throw new Error("Pass the path to the 3-by-2 storyboard.");
const { width, height } = await sharp(input).metadata();
const cell = Math.floor(width / 3);
if (height !== cell * 2) throw new Error("Expected two rows of square panels.");
const destination = path.resolve("public/watch-edits");
await mkdir(destination, { recursive: true });
for (const [row, series] of ["blue-lock", "one-piece"].entries()) {
  const frames = [], delay = [];
  for (let shot = 0; shot < 3; shot++) {
    const still = await sharp(input).extract({ left: cell * shot + 2, top: cell * row + 2, width: cell - 4, height: cell - 4 }).png().toBuffer();
    await sharp(still).webp({ quality: 91 }).toFile(path.join(destination, `${series}-${shot}.webp`));
    for (let beat = 0; beat < 8; beat++) {
      const inset = Math.round((shot === 1 ? 7 - beat : beat) * (shot === 2 ? 4 : 3));
      frames.push(await sharp(still).extract({ left: inset, top: Math.round(inset * .7), width: cell - 4 - inset * 2, height: cell - 4 - inset * 2 })
        .resize(400, 400).png().toBuffer());
      delay.push(beat === 7 ? [310, 170, 480][shot] : 60);
    }
  }
  await sharp(frames, { join: { animated: true } }).gif({ loop: 0, delay, colours: 64, dither: .2 }).toFile(path.join(destination, `${series}.gif`));
}
