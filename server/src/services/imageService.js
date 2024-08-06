import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { wrapText } from '../utils/textUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createOgImage = async (title, plainTextContent, firstImageUrl) => {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1200, 630);

  const logo = await loadImage(path.join(__dirname, '..', '..', 'assets', 'logo.png'));
  const logoSize = 50;
  ctx.drawImage(logo, 1200 - logoSize - 20, 20, logoSize, logoSize);

  let y = 60 + logoSize;

  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#000000';
  y = wrapText(ctx, title, 20, y, 1160, 56);

  ctx.font = '24px Arial';
  ctx.fillStyle = '#555555';
  y = wrapText(ctx, plainTextContent.substring(0, 200) + '...', 20, y + 20, 1160, 28);

  if (firstImageUrl) {
    try {
      const img = await loadImage(firstImageUrl);
      const aspectRatio = img.width / img.height;
      const maxWidth = 560;
      const maxHeight = 315;
      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      const x = (1200 - width) / 2;
      y += 40;
      ctx.drawImage(img, x, y, width, height);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }

  return canvas.toBuffer('image/png');
};