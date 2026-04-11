import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

export type PublicGalleryImage = {
  alt: string;
  name: string;
  src: string;
};

export async function getPublicGalleryImages(
  folder: string,
): Promise<PublicGalleryImage[]> {
  const galleryPath = path.join(process.cwd(), "public", "galleries", folder);

  try {
    const entries = await readdir(galleryPath, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .filter((entry) =>
        IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => {
        const baseName = entry.name.replace(/\.[^.]+$/, "");
        const label = baseName.replace(/[-_]+/g, " ").trim();

        return {
          alt: label || "Gallery image",
          name: entry.name,
          src: `/galleries/${folder}/${entry.name}`,
        };
      });
  } catch {
    return [];
  }
}
