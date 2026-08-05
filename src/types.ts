export type ProductCategory =
  | 'All'
  | 'Memory Frames'
  | 'Flower Preservation'
  | 'Wedding Keepsakes'
  | 'Photo Frames'
  | 'Name Plates'
  | 'Resin Clocks'
  | 'Wall Decor'
  | 'Bookmarks'
  | 'Keychains'
  | 'Home Decor'
  | 'Festival Gifts';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages?: string[];
  description: string;
  features: string[];
  dimensions: string;
  craftingTime: string;
  customizableOptions: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  resinClarity: 'Ultra Crystal 100%' | 'UV Protected Glass-Grade' | 'Diamond Gloss';
}

export interface CustomizerSelection {
  shape: 'Hexagon' | 'Arch' | 'Circle' | 'Rectangle' | 'Heart';
  size: '8x8 Inches' | '10x10 Inches' | '12x12 Inches' | '15x15 Inches Grand';
  baseWood: 'Walnut Dark Wood' | 'Golden Brass Trim' | 'White Italian Marble' | 'Clear Floating Glass';
  memoryItems: string[];
  goldFoil: 'None' | 'Subtle Gold Specks' | 'Full Golden Leaf Flakes' | 'Rose Gold Accent';
  engravingText?: string;
  estimatedPrice: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  story: string;
  date: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  content: string;
  productOrdered: string;
  rating: number;
  avatar: string;
  image?: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizationDetails?: {
    names?: string;
    date?: string;
    specialNotes?: string;
    customImageName?: string;
  };
}

export interface TimelineStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  duration: string;
}
