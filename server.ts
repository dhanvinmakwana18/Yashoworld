import express from 'express';
import path from 'path';
import { db } from './src/db/index';
import { gallery, products } from './src/db/schema';
import { desc, eq, asc } from 'drizzle-orm';
import multer from 'multer';
import fs from 'fs';
import * as dbService from './src/services/dbService';

const app = express();

const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Security Authentication Middleware
const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const secretHeader = req.headers['x-developer-mode-key'];
  
  const expectedSecret = process.env.DEV_MODE_SECRET || 'yashoworld_developer_secret_key_2026';
  
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (typeof secretHeader === 'string') {
    token = secretHeader;
  }
  
  if (token === expectedSecret) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Developer mode credentials required.' });
  }
};

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const data = await db.select().from(products).orderBy(asc(products.id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Update product image endpoint
app.post('/api/products/:id/image', checkAuth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const imageData = `data:${mimeType};base64,${base64Image}`;
    
    await db.update(products).set({ imageData }).where(eq(products.id, id));
    res.json({ success: true, message: 'Product image updated' });
  } catch (error) {
    console.error('Error updating product image:', error);
    res.status(500).json({ error: 'Failed to update product image' });
  }
});
app.get('/api/gallery', async (req, res) => {
  try {
    const data = await db.select().from(gallery).orderBy(desc(gallery.createdAt));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.post('/api/gallery/upload', checkAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, category, story } = req.body;
    const formattedTitle = title ? title.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Bespoke Keepsake';
    let imageData = '';
    if (req.file) {
      imageData = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64');
    }
    const result = await db.insert(gallery).values({
      title: formattedTitle,
      category: category || 'Preview',
      imageData: imageData,
      story: story || 'Bespoke resin art piece, handcrafted with premium high-gloss UV-protected crystal resin.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      likes: Math.floor(Math.random() * 80) + 12,
    }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Upload processing error:', error);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

// Delete endpoint
app.delete('/api/gallery/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(gallery).where(eq(gallery.id, parseInt(id)));
    res.json({ message: 'Item deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Patch endpoint
app.patch('/api/gallery/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, story } = req.body;
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (story !== undefined) updateData.story = story;
    
    if (Object.keys(updateData).length > 0) {
      const result = await db.update(gallery)
        .set(updateData)
        .where(eq(gallery.id, parseInt(id)))
        .returning();
      if (result.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(result[0]);
    } else {
      res.status(400).json({ error: 'No update data provided' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Cart Endpoints
app.get('/api/cart/:sessionId', async (req, res) => {
  try {
    const items = await dbService.getCartItems(req.params.sessionId);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get cart items' });
  }
});

app.post('/api/cart/:sessionId', async (req, res) => {
  try {
    const { productId, quantity, customizations } = req.body;
    const item = await dbService.saveCartItem(req.params.sessionId, productId, quantity, customizations);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save cart item' });
  }
});

app.put('/api/cart/:itemId', async (req, res) => {
  try {
    const { quantity, customizations } = req.body;
    const item = await dbService.updateCartItem(parseInt(req.params.itemId), quantity, customizations);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

app.delete('/api/cart/:itemId', async (req, res) => {
  try {
    await dbService.deleteCartItem(parseInt(req.params.itemId));
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

app.delete('/api/cart/session/:sessionId', async (req, res) => {
  try {
    await dbService.clearCart(req.params.sessionId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

async function startServer() {
  try {
    await dbService.initDb();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
