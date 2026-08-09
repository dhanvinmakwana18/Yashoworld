import { createPool } from '../db/index';

export const initDb = async () => {
  // Schema is managed by drizzle-kit push
};

export const saveCartItem = async (sessionId: string, productId: string, quantity: number, customizations: any) => {
  const pool = createPool();
  const query = `
    INSERT INTO cart_items (session_id, product_id, quantity, customizations)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [sessionId, productId, quantity, JSON.stringify(customizations)]);
  return result.rows[0];
};

export const getCartItems = async (sessionId: string) => {
  const pool = createPool();
  const query = `
    SELECT * FROM cart_items WHERE session_id = $1 ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [sessionId]);
  return result.rows;
};

export const updateCartItem = async (itemId: number, quantity: number, customizations: any) => {
  const pool = createPool();
  const query = `
    UPDATE cart_items
    SET quantity = $1, customizations = $2
    WHERE id = $3
    RETURNING *;
  `;
  const result = await pool.query(query, [quantity, JSON.stringify(customizations), itemId]);
  return result.rows[0];
};

export const deleteCartItem = async (itemId: number) => {
  const pool = createPool();
  const query = `
    DELETE FROM cart_items WHERE id = $1 RETURNING *;
  `;
  const result = await pool.query(query, [itemId]);
  return result.rows[0];
};

export const clearCart = async (sessionId: string) => {
  const pool = createPool();
  const query = `
    DELETE FROM cart_items WHERE session_id = $1 RETURNING *;
  `;
  const result = await pool.query(query, [sessionId]);
  return result.rows;
};
