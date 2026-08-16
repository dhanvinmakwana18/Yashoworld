import 'dotenv/config';
import { db } from './index';
import { products, testimonials } from './schema';
import { PRODUCTS_DATA } from '../data/products';
import { TESTIMONIALS_DATA } from '../data/testimonials';

export async function seedDatabase() {
  console.log('🌱 Starting database seeding process...');

  let productsInserted = 0;
  let testimonialsInserted = 0;

  // 1. Seed Products
  for (const item of PRODUCTS_DATA) {
    try {
      await db.insert(products).values({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice ?? null,
        rating: item.rating ? String(item.rating) : '5.0',
        reviewsCount: item.reviewsCount ?? 0,
        description: item.description,
        features: JSON.stringify(item.features || []),
        dimensions: item.dimensions || null,
        craftingTime: item.craftingTime || null,
        customizableOptions: JSON.stringify(item.customizableOptions || []),
        isBestSeller: item.isBestSeller ? 1 : 0,
        isNewArrival: item.isNewArrival ? 1 : 0,
        resinClarity: item.resinClarity || null,
        imageData: item.image || null,
      }).onConflictDoUpdate({
        target: products.id,
        set: {
          name: item.name,
          category: item.category,
          price: item.price,
          originalPrice: item.originalPrice ?? null,
          rating: item.rating ? String(item.rating) : '5.0',
          reviewsCount: item.reviewsCount ?? 0,
          description: item.description,
          features: JSON.stringify(item.features || []),
          dimensions: item.dimensions || null,
          craftingTime: item.craftingTime || null,
          customizableOptions: JSON.stringify(item.customizableOptions || []),
          isBestSeller: item.isBestSeller ? 1 : 0,
          isNewArrival: item.isNewArrival ? 1 : 0,
          resinClarity: item.resinClarity || null,
          imageData: item.image || null,
        },
      });
      productsInserted++;
    } catch (err) {
      console.error(`Failed to insert/upsert product ${item.id}:`, err);
    }
  }

  // 2. Seed Testimonials
  for (const item of TESTIMONIALS_DATA) {
    try {
      await db.insert(testimonials).values({
        id: item.id,
        author: item.author,
        role: item.role,
        location: item.location,
        content: item.content,
        productOrdered: item.productOrdered,
        rating: Math.round(item.rating),
      }).onConflictDoUpdate({
        target: testimonials.id,
        set: {
          author: item.author,
          role: item.role,
          location: item.location,
          content: item.content,
          productOrdered: item.productOrdered,
          rating: Math.round(item.rating),
        },
      });
      testimonialsInserted++;
    } catch (err) {
      console.error(`Failed to insert/upsert testimonial ${item.id}:`, err);
    }
  }

  console.log(`✅ Seeded ${productsInserted} products.`);
  console.log(`✅ Seeded ${testimonialsInserted} testimonials.`);
  return { productsInserted, testimonialsInserted };
}

// Execute directly if run via CLI
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('src/db/seed.ts')) {
  seedDatabase()
    .then(() => {
      console.log('✨ Seed completed successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Seed failed:', err);
      process.exit(1);
    });
}
