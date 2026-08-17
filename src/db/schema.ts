import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'gallery' table
export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  imageData: text('image_data'), // Base64 image data
  story: text('story'),
  date: text('date'),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'products' table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  rating: text('rating'), // Storing as text or numeric. Let's use text to simplify or real.
  reviewsCount: integer('reviews_count'),
  description: text('description').notNull(),
  features: text('features'), // JSON stringified array
  dimensions: text('dimensions'),
  craftingTime: text('crafting_time'),
  customizableOptions: text('customizable_options'), // JSON stringified array
  isBestSeller: integer('is_best_seller').default(0), // 0 or 1 for boolean
  isNewArrival: integer('is_new_arrival').default(0),
  isActive: integer('is_active').default(1), // 1 for active, 0 for inactive
  resinClarity: text('resin_clarity'),
  imageData: text('image_data'), // Base64 image data
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'testimonials' table
export const testimonials = pgTable('testimonials', {
  id: text('id').primaryKey(),
  author: text('author').notNull(),
  role: text('role').notNull(),
  location: text('location').notNull(),
  content: text('content').notNull(),
  productOrdered: text('product_ordered').notNull(),
  rating: integer('rating').notNull().default(5),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  productId: text('product_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
  customizations: text('customizations'), // Store as JSON string or JSONB
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relations for 'users'
export const usersRelations = relations(users, ({ many }) => ({
  // Define relations here if user-owned records are added later
}));

// Define the 'orders' table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  customerName: text('customer_name'),
  email: text('email'),
  totalAmount: integer('total_amount').notNull(),
  status: text('status').notNull().default('pending'), // pending, completed, cancelled
  referenceImage: text('reference_image'), // Base64 image string for custom orders
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'order_items' table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: text('product_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
  priceAtTime: integer('price_at_time').notNull(),
  customizations: text('customizations'), // Store as JSON string or JSONB
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations for orders and orderItems
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
