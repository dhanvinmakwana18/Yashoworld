import { db } from './src/db/index';
import { products } from './src/db/schema';
import fs from 'fs';
import { eq } from 'drizzle-orm';

async function seedProductImage() {
  const imagePath = '/app/applet/src/assets/images/forever_rose_bookmark_1786282184579.jpg';
  
  if (fs.existsSync(imagePath)) {
    const base64Image = fs.readFileSync(imagePath).toString('base64');
    const mimeType = 'image/jpeg';
    const imageData = "data:" + mimeType + ";base64," + base64Image;

    try {
      await db.update(products).set({ imageData }).where(eq(products.id, 'yw-001'));
      await db.update(products).set({ imageData }).where(eq(products.id, 'yw-sig-01'));
      console.log('Successfully updated product image in Cloud SQL.');
    } catch (e) {
      console.error('Failed to update product:', e.message);
    }
  } else {
    console.error('Image file not found:', imagePath);
  }
  process.exit(0);
}

seedProductImage();
