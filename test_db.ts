import { db } from './src/db/index';
import { products } from './src/db/schema';
import { eq } from 'drizzle-orm';
async function run() {
  const p = await db.select().from(products).where(eq(products.id, 'yw-sig-01'));
  console.log(p.length > 0 ? "Found product" : "Product not found");
  process.exit(0);
}
run();
