// vite-plugin-resize-images.js
import fs, { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import sharp from 'sharp';

function resizeImagesPlugin(options = {}) {
    const inputDir = options.inputDir || 'dist';
    const width = options.width || 1920;

    async function resizeFile(filePath) {
        const ext = extname(filePath).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

        try {
            const data = await sharp(filePath).resize({ width, withoutEnlargement: true }).toBuffer();

            await fs.promises.writeFile(filePath, data);
            console.log(`✔ resized: ${filePath}`);
        } catch (err) {
            console.warn(`✖ skip: ${filePath} (${err.message})`);
        }
    }

    function walkDir(dir) {
        for (const file of readdirSync(dir)) {
            const filePath = join(dir, file);
            const stats = statSync(filePath);
            if (stats.isDirectory()) {
                walkDir(filePath);
            } else {
                resizeFile(filePath);
            }
        }
    }

    return {
        name: 'vite-plugin-resize-images',
        closeBundle() {
            walkDir(inputDir);
        },
    };
}

export default resizeImagesPlugin;
