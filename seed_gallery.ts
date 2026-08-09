import { db } from './src/db/index';
import { gallery } from './src/db/schema';
import fs from 'fs';
import path from 'path';

async function seedGallery() {
  const imagePath = '/app/applet/src/assets/images/forever_rose_bookmark_1786282184579.jpg';
  
  if (fs.existsSync(imagePath)) {
    const base64Image = fs.readFileSync(imagePath).toString('base64');
    const mimeType = 'image/jpeg';
    const imageData = "data:" + mimeType + ";base64," + base64Image;

    try {
      await db.insert(gallery).values({
        title: '"Forever" Rose Resin Bookmark',
        category: 'Bookmarks',
        imageData: imageData,
        story: 'Real Dried Rose • Gold Foil • Optical Clarity',
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        likes: 120,
      });
      console.log('Successfully inserted image into Cloud SQL gallery table.');
    } catch (e) {
      console.error('Failed to insert into gallery:', e.message);
    }
  } else {
    console.error('Image file not found:', imagePath);
  }
  process.exit(0);
}

seedGallery();
