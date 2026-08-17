import 'dotenv/config';
import express from 'express';
import path from 'path';
import { db } from './src/db/index';
import { gallery, products, testimonials, orders, orderItems } from './src/db/schema';
import { desc, eq, asc, and, or, ilike } from 'drizzle-orm';
import multer from 'multer';
import fs from 'fs';
import * as dbService from './src/services/dbService';

if (!process.env.DEVELOPER_SECRET) {
  console.error("ERROR: DEVELOPER_SECRET environment variable is missing.");
  console.error("Please add DEVELOPER_SECRET=your_secret to your .env file.");
  process.exit(1);
}

const app = express();

const PORT = 3001;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Security Authentication Middleware
const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const secretHeader = req.headers['x-developer-mode-key'];
  
  const expectedSecret = process.env.DEVELOPER_SECRET;
  
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
    const { page, limit, category, search, active } = req.query;
    
    // Default to active only, unless explicitly asked for all or inactive
    const isActiveVal = active === '0' ? 0 : (active === 'all' ? undefined : 1);
    
    const conditions = [];
    if (isActiveVal !== undefined) conditions.push(eq(products.isActive, isActiveVal));
    if (category) conditions.push(eq(products.category, category as string));
    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push(
        or(
          ilike(products.name, searchPattern),
          ilike(products.description, searchPattern)
        )
      );
    }
    
    let query = db.select().from(products).$dynamic();
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    query = query.orderBy(asc(products.id));
    
    if (limit) {
      const limitNum = parseInt(limit as string, 10);
      if (!isNaN(limitNum)) {
        query = query.limit(limitNum);
        if (page) {
          const pageNum = parseInt(page as string, 10);
          if (!isNaN(pageNum) && pageNum > 0) {
            query = query.offset((pageNum - 1) * limitNum);
          }
        }
      }
    }
    
    const data = await query;
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const data = await db.select().from(testimonials).orderBy(asc(testimonials.id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
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

// Order Endpoints
app.post('/api/orders', upload.single('referenceImage'), async (req, res) => {
  try {
    let { sessionId, customerName, email, totalAmount, items } = req.body;
    
    // Parse items if they were sent as a string (from FormData)
    if (typeof items === 'string') {
      try {
        items = JSON.parse(items);
      } catch (e) {
        items = [];
      }
    }
    
    if (!sessionId || !customerName || !email) {
      return res.status(400).json({ error: 'Missing required customer information' });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }
    
    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const qty = parseInt(item.quantity);
      if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }
    }
    
    let referenceImageBase64 = null;
    
    // Handle optional file upload
    if (req.file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'Invalid file type. Only JPG, PNG, and WEBP are allowed.' });
      }
      
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (req.file.size > maxSize) {
        return res.status(400).json({ error: 'File is too large. Maximum size is 5MB.' });
      }
      
      referenceImageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    
    // Create the order
    const newOrder = await db.insert(orders).values({
      sessionId,
      customerName,
      email,
      totalAmount: parseInt(totalAmount) || 0,
      status: 'pending',
      referenceImage: referenceImageBase64
    }).returning();
    
    const orderId = newOrder[0].id;
    
    // Insert order items
    if (items && items.length > 0) {
      const orderItemsToInsert = items.map((item: any) => ({
        orderId,
        productId: item.productId,
        quantity: parseInt(item.quantity) || 1,
        priceAtTime: parseInt(item.priceAtTime) || 0,
        customizations: typeof item.customizations === 'string' ? item.customizations : JSON.stringify(item.customizations || null)
      }));
      await db.insert(orderItems).values(orderItemsToInsert);
    }
    
    // Clear the cart
    await dbService.clearCart(sessionId);
    
    // Omit the massive base64 string from the response
    const { referenceImage, ...orderWithoutImage } = newOrder[0];
    res.status(201).json(orderWithoutImage);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Admin Order Endpoints
app.get('/api/admin/orders', checkAuth, async (req, res) => {
  try {
    // Exclude referenceImage from the select to save bandwidth
    const allOrders = await db.select({
      id: orders.id,
      sessionId: orders.sessionId,
      customerName: orders.customerName,
      email: orders.email,
      totalAmount: orders.totalAmount,
      status: orders.status,
      createdAt: orders.createdAt,
      // Map it to a boolean
      hasReferenceImage: orders.referenceImage
    }).from(orders).orderBy(desc(orders.createdAt));
    
    const allItems = await db.select().from(orderItems);
    
    const enrichedOrders = allOrders.map(order => {
      const itemsForOrder = allItems.filter(item => item.orderId === order.id);
      return { 
        ...order, 
        hasReferenceImage: !!order.hasReferenceImage, // Force boolean true/false
        items: itemsForOrder 
      };
    });
    
    res.json(enrichedOrders);
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Endpoint to fetch just the reference image securely
app.get('/api/admin/orders/:id/image', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await db.select({ referenceImage: orders.referenceImage })
      .from(orders)
      .where(eq(orders.id, parseInt(id)))
      .limit(1);
      
    if (order.length === 0 || !order[0].referenceImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.json({ image: order[0].referenceImage });
  } catch (error) {
    console.error('Error fetching order image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

app.get('/api/orders/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const userOrders = await db.select().from(orders).where(eq(orders.sessionId, sessionId)).orderBy(desc(orders.createdAt));
    
    // For simplicity, we manually fetch items. A full ORM query builder could use relation joins.
    const allItems = await db.select().from(orderItems);
    
    const enrichedOrders = userOrders.map(order => {
      const itemsForOrder = allItems.filter(item => item.orderId === order.id);
      return { ...order, items: itemsForOrder };
    });
    
    res.json(enrichedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});



app.patch('/api/admin/orders/:id/status', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['NEW', 'CONTACTED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const updatedOrder = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, parseInt(id)))
      .returning();
      
    if (updatedOrder.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(updatedOrder[0]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Python Language Backend Feature Endpoints
import { spawn } from 'child_process';

app.post('/api/python/search', (req, res) => {
  try {
    const pythonProcess = spawn('python3', [path.join(process.cwd(), 'backend/python_features/search_engine.py')]);
    let output = '';
    let errorOutput = '';

    pythonProcess.stdin.write(JSON.stringify(req.body));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0 && output) {
        try {
          res.json(JSON.parse(output));
        } catch (e) {
          res.status(500).json({ error: 'Invalid JSON response from Python engine' });
        }
      } else {
        console.error('Python search error:', errorOutput);
        res.status(500).json({ error: 'Python search engine execution failed' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error running Python feature' });
  }
});

app.post('/api/python/resin-calculator', (req, res) => {
  try {
    const pythonProcess = spawn('python3', [path.join(process.cwd(), 'backend/python_features/resin_calculator.py')]);
    let output = '';
    let errorOutput = '';

    pythonProcess.stdin.write(JSON.stringify(req.body));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0 && output) {
        try {
          res.json(JSON.parse(output));
        } catch (e) {
          res.status(500).json({ error: 'Invalid JSON from Python calculator' });
        }
      } else {
        console.error('Python calculator error:', errorOutput);
        res.status(500).json({ error: 'Python resin calculator execution failed' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error running Python feature' });
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
