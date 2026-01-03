
import { Wallpaper, CategoryType, CATEGORIES } from '../types';

// Mock dataset generator to simulate a large online database
const generateMockWallpapers = (count: number): Wallpaper[] => {
  return Array.from({ length: count }).map((_, i) => {
    const id = `wall-${i + 1}`;
    const categoryIndex = Math.floor(Math.random() * CATEGORIES.length);
    const category = CATEGORIES[categoryIndex];
    
    // Using high quality random image service for realistic visuals
    // Picsum is great, but we can append random seeds for uniqueness
    const seed = Math.floor(Math.random() * 10000);
    const thumbnailUrl = `https://picsum.photos/seed/${seed}/400/600`;
    
    const titles: Record<CategoryType, string[]> = {
      'Home': ['Minimal Interior', 'Cozy Morning', 'Modern Loft', 'Sunset View'],
      'Games': ['Cyber Knight', 'Valor Arena', 'Stealth Ops', 'Fantasy Quest'],
      'Anime': ['Neon City Soul', 'Magic High School', 'Mecha Battle', 'Forest Spirit'],
      'Movies': ['Gotham Dark', 'Interstellar Void', 'Epic Saga', 'Hero Origins'],
      'Series': ['Iron Throne', 'Breaking Point', 'Stranger Things', 'Regal Dynasty'],
      'Animals': ['Majestic Lion', 'Arctic Fox', 'Wild Stallion', 'Eagle Eye'],
      'Nature': ['Misty Mountains', 'Emerald Forest', 'Crystal Lake', 'Autumn Path'],
      'Celebrity': ['Red Carpet', 'Studio Session', 'Stage Presence', 'Candid Moment'],
      'Comic': ['Vigilante Night', 'Super Power', 'Graphic Novel', 'Retro Ink'],
      'Sci-Fi': ['Cyborg Dawn', 'Neon Future', 'Parallel World', 'Neural Link'],
      'Space': ['Supernova', 'Milky Way', 'Saturn Rings', 'Deep Cosmos']
    };

    const categoryTitles = titles[category] || ['Abstract Design'];
    const title = categoryTitles[Math.floor(Math.random() * categoryTitles.length)];

    return {
      id,
      title: `${title} #${Math.floor(Math.random() * 999)}`,
      category,
      thumbnailUrl,
      tags: [category.toLowerCase(), 'uhd', '4k', 'wallpaper'],
      author: `Creator_${Math.floor(Math.random() * 100)}`
    };
  });
};

const ALL_WALLPAPERS = generateMockWallpapers(200);

export const wallpaperService = {
  getWallpapers: async (category?: string, query?: string, page = 1, limit = 20): Promise<Wallpaper[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let filtered = [...ALL_WALLPAPERS];

    if (category && category !== 'Home') {
      filtered = filtered.filter(w => w.category === category);
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(w => 
        w.title.toLowerCase().includes(q) || 
        w.category.toLowerCase().includes(q) ||
        w.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  },

  getWallpaperById: async (id: string): Promise<Wallpaper | undefined> => {
    return ALL_WALLPAPERS.find(w => w.id === id);
  }
};
