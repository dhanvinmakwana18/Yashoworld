import { db } from '../db/index';
import { cartItems } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

export const initDb = async () => {
  // Schema is managed by index.ts PGlite initialization
};

export const saveCartItem = async (sessionId: string, productId: string, quantity: number, customizations: any) => {
  const customStr = typeof customizations === 'string' ? customizations : JSON.stringify(customizations || null);
  
  const result = await db.insert(cartItems).values({
    sessionId,
    productId,
    quantity,
    customizations: customStr,
  }).returning();
  
  return result[0];
};

export const getCartItems = async (sessionId: string) => {
  const result = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId)).orderBy(desc(cartItems.createdAt));
  return result;
};

export const updateCartItem = async (itemId: number, quantity: number, customizations: any) => {
  const customStr = typeof customizations === 'string' ? customizations : JSON.stringify(customizations || null);
  
  const result = await db.update(cartItems)
    .set({ quantity, customizations: customStr })
    .where(eq(cartItems.id, itemId))
    .returning();
    
  return result[0];
};

export const deleteCartItem = async (itemId: number) => {
  const result = await db.delete(cartItems).where(eq(cartItems.id, itemId)).returning();
  return result[0];
};

export const clearCart = async (sessionId: string) => {
  const result = await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId)).returning();
  return result;
};
