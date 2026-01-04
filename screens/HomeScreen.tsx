
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, Image as ImageIcon } from 'lucide-react';
import { Wallpaper, CategoryType } from '../types';
import { wallpaperService } from '../services/wallpaperService';
import WallpaperCard from '../components/WallpaperCard';
import CategoryTabs from '../components/CategoryTabs';
import Footer from '../components/Footer';

const HomeScreen: React.FC = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWallpapers = useCallback(async (cat: CategoryType, query: string, p: number, append = false) => {
    setLoading(true);
    try {
      const data = await wallpaperService.getWallpapers(cat, query, p);
      if (data.length < 20) setHasMore(false);
      else setHasMore(true);

      if (append) {
        setWallpapers(prev => [...prev, ...data]);
      } else {
        setWallpapers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchWallpapers(activeCategory, searchQuery, 1, false);
  }, [activeCategory, searchQuery, fetchWallpapers]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWallpapers(activeCategory, searchQuery, nextPage, true);
    }
  };

  // Simple infinite scroll observer
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 500
      ) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-lg px-4 pt-4 pb-2 border-b border-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ImageIcon className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white italic">GIGAWALLS</h1>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search wallpapers, tags, themes..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <CategoryTabs 
        activeCategory={activeCategory} 
        onSelect={(cat) => setActiveCategory(cat)} 
      />

      {/* Grid Content */}
      <main className="flex-1 p-4">
        {wallpapers.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No wallpapers found</p>
            <p className="text-sm">Try searching for something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wallpapers.map((wall) => (
              <WallpaperCard key={wall.id} wallpaper={wall} />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        )}

        {!hasMore && wallpapers.length > 0 && (
          <div className="text-center py-10 text-slate-600 text-sm">
            You've reached the end of the galaxy.
          </div>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
