import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';
import { Sparkles, Heart, ZoomIn, X, Calendar, UploadCloud, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface LuxuryGalleryProps {
  onOpenCustomizer: () => void;
}

export const LuxuryGallery: React.FC<LuxuryGalleryProps> = ({ onOpenCustomizer }) => {
  const { isDevMode } = useDevMode();
  const [localGallery, setLocalGallery] = useState<GalleryItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likesState, setLikesState] = useState<{ [id: string]: number }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);

  // States for editing a keepsake item in Developer Mode
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editStory, setEditStory] = useState('');

  // Ref for manual file picker integration in Developer Mode
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        // Map backend data to frontend format
        const items = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.imageUrl,
          aspectRatio: 'square',
          story: item.story || 'Beautiful memories captured forever.',
          date: item.date || new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          likes: item.likes || 0
        }));
        setLocalGallery(items);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load gallery', err);
        setIsLoading(false);
      });
  }, []);

  // Reset visible count when filter tag changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedTag]);

  const tags = ['All', 'Wedding Keepsakes', 'Resin Coasters', 'Floral Preservation', 'Pooja Thalis', 'Bookmarks', 'Preview', 'Resin Art'];

  const filteredGallery = selectedTag === 'All'
    ? localGallery
    : localGallery.filter((item) => item.category === selectedTag);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Securely upload files with developer secret token
  const uploadFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    
    imageFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ""));
      formData.append('category', selectedTag === 'All' ? 'Preview' : selectedTag);
      
      fetch('/api/gallery/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer yashoworld_developer_secret_key_2026'
        },
        body: formData,
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Upload failed. Unauthorized or server error.');
        }
        return res.json();
      })
      .then(data => {
        const newItem: GalleryItem = {
          id: data.id,
          title: data.title,
          category: data.category,
          image: data.imageUrl,
          aspectRatio: 'square',
          story: data.story || 'Preview image uploaded via Developer Mode.',
          date: data.date || new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          likes: data.likes || 0
        };
        setLocalGallery(prev => [newItem, ...prev]);
      })
      .catch(err => console.error('Upload failed:', err));
    });
  }, [selectedTag]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(Array.from(e.dataTransfer.files));
    }
  }, [uploadFiles]);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(Array.from(e.target.files));
    }
  }, [uploadFiles]);

  // Edit action triggers
  const handleEditClick = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditStory(item.story || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    try {
      const response = await fetch(`/api/gallery/${editingItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yashoworld_developer_secret_key_2026'
        },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          story: editStory
        })
      });
      
      if (response.ok) {
        const updated = await response.json();
        setLocalGallery(prev => prev.map(item => item.id === editingItem.id ? {
          ...item,
          title: updated.title,
          category: updated.category,
          story: updated.story
        } : item));
        setEditingItem(null);
      } else {
        console.error('Failed to update product details');
      }
    } catch (err) {
      console.error('Error updating:', err);
    }
  };

  // Delete action triggers
  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this exquisite memory keepsake from the gallery? This action is permanent.')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer yashoworld_developer_secret_key_2026'
          }
        });
        
        if (response.ok) {
          setLocalGallery(prev => prev.filter(item => item.id !== id));
        } else {
          console.error('Failed to delete item');
        }
      } catch (err) {
        console.error('Error deleting:', err);
      }
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#FAF7F2] dark:bg-[#231C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4A373]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
            <span className="text-xs font-semibold tracking-wide text-[#2D2421] dark:text-[#E8D8CD] uppercase">
              Pinterest Luxury Visual Journal
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2421] dark:text-[#FAF7F2] tracking-tight mb-4">
            Preserved Memory <span className="italic font-serif-body text-gold-gradient font-normal">Gallery</span>
          </h2>
          <p className="text-base text-[#3A3A3A] dark:text-[#E8D8CD] max-w-2xl mx-auto">
            Step inside our visual showcase. Floating glass frames exhibiting real bridal garlands, baby footprints, and custom residential entrance plates.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[#D4A373] to-[#D8B4E2] text-white shadow-md scale-105'
                  : 'bg-white/60 dark:bg-[#2B231F]/80 text-[#3A3A3A] dark:text-[#E8D8CD] hover:bg-white dark:hover:bg-[#2B231F]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Developer Mode Drop Zone */}
        {isDevMode && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`mb-8 border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-colors duration-300 ${isDragging ? 'border-green-500 bg-green-500/10' : 'border-[#D4A373]/50 bg-[#D4A373]/5'} cursor-pointer hover:bg-[#D4A373]/10`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-green-500' : 'text-[#D4A373]'}`} />
            <h3 className="font-serif-display text-lg font-bold text-[#2D2421] dark:text-[#FAF7F2] mb-1">
              {isDragging ? 'Drop images here' : 'Developer Upload (Click or Drag & Drop)'}
            </h3>
            <p className="text-xs text-[#3A3A3A] dark:text-[#E8D8CD] text-center max-w-md">
              Drag and drop images here or click to select files. They will be compressed to WebP and added dynamically. (Only visible in Dev Mode)
            </p>
          </div>
        )}

        {/* Masonry / Grid Container */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-12 text-[#3A3A3A] dark:text-[#E8D8CD] italic font-serif-body">
            New gallery images coming soon...
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredGallery.slice(0, visibleCount).map((item) => {
              const currentLikes = item.likes + (likesState[item.id] || 0);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveItem(item)}
                  className="glass-panel p-3 rounded-3xl border border-white/80 dark:border-[#D4A373]/25 overflow-hidden shadow-xl transition-all duration-500 cursor-pointer group relative flex flex-col justify-between"
                >
                  {/* Floating Glass Frame Wrap */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#FAF7F2] dark:bg-[#231C18]">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Golden Sparkle Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full glass-gold text-white text-[10px] font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className="p-2 rounded-full glass-panel text-white hover:text-red-400 transition-colors flex items-center gap-1 text-xs"
                        >
                          <Heart className="w-4 h-4 fill-current text-rose-500" />
                          <span>{currentLikes}</span>
                        </button>
                      </div>

                      <div>
                        <h4 className="font-serif-display text-lg font-bold text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/80 line-clamp-2 mb-3">
                          {item.story}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#D4A373]">
                          <ZoomIn className="w-4 h-4" /> Expand Memory Story
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dev Mode Actions Bar */}
                  {isDevMode && (
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#D4A373]/10 px-1 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(item);
                        }}
                        className="flex-1 py-1.5 px-3 bg-[#D4A373]/10 hover:bg-[#D4A373]/25 border border-[#D4A373]/30 text-[#8B4513] dark:text-[#E8D8CD] rounded-xl text-[11px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(item.id);
                        }}
                        className="flex-1 py-1.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Load More Button & High Traffic Statistics */}
          {filteredGallery.length > visibleCount && (
            <div className="flex flex-col items-center justify-center gap-4 mt-4 border-t border-[#D4A373]/10 pt-10">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#382E2B]/60 dark:text-[#E8D8CD]/60">
                Displaying <span className="text-[#8B4513] dark:text-[#F3C06B] font-bold">{Math.min(visibleCount, filteredGallery.length)}</span> of <span className="font-bold">{filteredGallery.length}</span> luxury keepsakes
              </div>
              
              <button
                onClick={() => {
                  setIsLoadMoreLoading(true);
                  setTimeout(() => {
                    setVisibleCount(prev => prev + 6);
                    setIsLoadMoreLoading(false);
                  }, 800);
                }}
                disabled={isLoadMoreLoading}
                className="relative px-8 py-4 bg-white dark:bg-[#2B231F] border border-[#8B4513]/30 dark:border-[#D4A373]/30 hover:border-[#8B4513] text-[#2D2421] dark:text-[#FAF7F2] rounded-full text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-75 disabled:pointer-events-none group"
              >
                {isLoadMoreLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-[#8B4513] dark:text-[#F3C06B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Optimizing Live Feed...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Memories</span>
                    <ArrowRight className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-6 mt-1 text-[10px] text-[#382E2B]/50 dark:text-[#E8D8CD]/50 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span>142 Active Collectors Browsing</span>
                </span>
                <span>•</span>
                <span>CDN Cache Status: HIT (0.01s latency)</span>
              </div>
            </div>
          )}
        </div>
        )}
      </div>

      {/* Interactive Edit Modal (Developer Mode only) */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl border border-[#D4A373]/40 shadow-2xl overflow-hidden z-10 p-6 sm:p-8 bg-[#FAF7F2] dark:bg-[#231C18]"
            >
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass-panel text-[#2D2421] dark:text-[#FAF7F2] hover:bg-[#D4A373]/15 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif-display text-2xl font-bold text-[#2D2421] dark:text-[#FAF7F2] mb-6 flex items-center gap-2">
                <Edit className="w-6 h-6 text-[#D4A373]" /> Edit Keepsake Memory
              </h3>

              <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-1.5">
                    Artwork Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-[#2D241E] border border-[#D4A373]/30 text-[#2D2421] dark:text-[#FAF7F2] focus:outline-none focus:border-[#D4A373] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-[#2D241E] border border-[#D4A373]/30 text-[#2D2421] dark:text-[#FAF7F2] focus:outline-none focus:border-[#D4A373] transition-colors text-sm"
                  >
                    <option value="Wedding Keepsakes">Wedding Keepsakes</option>
                    <option value="Pooja Thalis">Pooja Thalis</option>
                    <option value="Resin Coasters">Resin Coasters</option>
                    <option value="Floral Preservation">Floral Preservation</option>
                    <option value="Bookmarks">Bookmarks</option>
                    <option value="Preview">Preview</option>
                    <option value="Resin Art">Resin Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-1.5">
                    Bespoke Story Note
                  </label>
                  <textarea
                    value={editStory}
                    onChange={(e) => setEditStory(e.target.value)}
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-[#2D241E] border border-[#D4A373]/30 text-[#2D2421] dark:text-[#FAF7F2] focus:outline-none focus:border-[#D4A373] transition-colors text-sm font-serif-body italic"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="flex-1 py-3 bg-white dark:bg-[#2B231F] border border-[#8B4513]/30 text-xs font-bold uppercase tracking-wider rounded-xl text-[#2D241E] dark:text-[#FAF7F2] hover:bg-gray-100 dark:hover:bg-[#382E2B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-[#D4A373] to-[#D8B4E2] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md hover:scale-[1.02] transition-transform"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Story Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl glass-panel rounded-3xl border border-[#D4A373]/40 shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[85vh]"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass-panel text-[#2D2421] dark:text-[#FAF7F2]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square md:aspect-auto overflow-hidden bg-black">
                <SafeImage
                  src={activeItem.image}
                  alt={activeItem.title}
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#FAF7F2] dark:bg-[#231C18]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#F8E8EE] dark:bg-[#2B231F] text-[#D4A373] dark:text-[#D8B4E2] text-xs font-bold uppercase">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-[#3A3A3A] dark:text-[#E8D8CD] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {activeItem.date}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-bold text-[#2D2421] dark:text-[#FAF7F2] mb-4">
                    {activeItem.title}
                  </h3>

                  <div className="glass-panel p-4 rounded-2xl border border-[#D4A373]/20 mb-6">
                    <h4 className="text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-2">
                      Client Story Note
                    </h4>
                    <p className="text-sm text-[#3A3A3A] dark:text-[#E8D8CD] leading-relaxed italic font-serif-body">
                      "{activeItem.story}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4A373]/20 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onOpenCustomizer();
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#D8B4E2] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <span>Request Similar Custom Piece</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
