import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directories exist
const BACKEND_DIR = path.join(process.cwd(), 'backend');
const DATA_FILE = path.join(BACKEND_DIR, 'gallery.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');

if (!fs.existsSync(BACKEND_DIR)) {
  fs.mkdirSync(BACKEND_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Initialize data file with existing gallery data if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  const initialData = [
    {
      id: '1',
      title: 'Hero Resin Frame',
      category: 'Resin Art',
      imageUrl: '/images/gallery/hero_resin_frame.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Flower Preservation Art',
      category: 'Floral Preservation',
      imageUrl: '/images/gallery/flower_preservation_art.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Floral Memory Resin Art',
      category: 'Floral Preservation',
      imageUrl: '/images/gallery/floral_memory_resin_art.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Pooja Thali Lavender',
      category: 'Pooja Thali',
      imageUrl: '/images/gallery/pooja_thali_lavender.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Forever Rose Bookmark',
      category: 'Bookmarks',
      imageUrl: '/images/gallery/forever_rose_bookmark_real.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Thali Peacock Blue',
      category: 'Pooja Thali',
      imageUrl: '/images/gallery/thali_peacock_blue.jpg',
      created_at: new Date().toISOString()
    }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Multer setup
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'upload-' + uniqueSuffix + ext);
  }
});
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
app.get('/api/gallery', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    // Sort descending by created_at so newest uploads are always shown first!
    data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.post('/api/gallery/upload', checkAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { title, category } = req.body;
    const originalPath = req.file.path;
    const filenameWithoutExt = path.parse(req.file.filename).name;
    const webpFilename = `${filenameWithoutExt}.webp`;
    const webpPath = path.join(UPLOAD_DIR, webpFilename);

    // Compress and convert to webp using sharp
    await sharp(originalPath)
      .webp({ quality: 80 })
      .toFile(webpPath);

    // Clean up original uploaded file
    try {
      fs.unlinkSync(originalPath);
    } catch (err) {
      console.error('Failed to delete temporary original file:', err);
    }
    
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    
    const formattedTitle = title ? title.split(/[-_]/).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Bespoke Keepsake';
    
    const newItem = {
      id: Date.now().toString(),
      title: formattedTitle,
      category: category || 'Preview',
      imageUrl: '/images/gallery/' + webpFilename,
      story: `Bespoke resin art piece, handcrafted with premium high-gloss UV-protected crystal resin.`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      likes: Math.floor(Math.random() * 80) + 12,
      created_at: new Date().toISOString()
    };
    
    data.push(newItem);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Upload processing error:', error);
    res.status(500).json({ error: 'Failed to compress and upload image' });
  }
});

// Delete endpoint
app.delete('/api/gallery/:id', checkAuth, (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Attempt to delete image from disk
    const item = data[index];
    if (item.imageUrl && item.imageUrl.startsWith('/images/gallery/')) {
      const filename = path.basename(item.imageUrl);
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Failed to delete image file from disk:', err);
        }
      }
    }
    
    data.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'Item deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Patch endpoint
app.patch('/api/gallery/:id', checkAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, story } = req.body;
    
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const item = data[index];
    if (title !== undefined) item.title = title;
    if (category !== undefined) item.category = category;
    if (story !== undefined) item.story = story;
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

async function startServer() {
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
