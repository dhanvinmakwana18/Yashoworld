import { db } from './src/db/index';
import { products } from './src/db/schema';
import { PRODUCTS_DATA } from './src/data/products';

async function seed() {
  for (const product of PRODUCTS_DATA) {
    try {
      await db.insert(products).values({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating?.toString(),
        reviewsCount: product.reviewsCount,
        description: product.description,
        features: JSON.stringify(product.features),
        dimensions: product.dimensions,
        craftingTime: product.craftingTime,
        customizableOptions: JSON.stringify(product.customizableOptions),
        isBestSeller: product.isBestSeller ? 1 : 0,
        isNewArrival: product.isNewArrival ? 1 : 0,
        resinClarity: product.resinClarity,
      });
      console.log('Inserted', product.id);
    } catch(e) {
      console.error('Failed to insert', product.id, e.message);
    }
  }
  process.exit(0);
}
seed();
