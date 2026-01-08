import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Wallpaper, CategoryType } from "../types";
import { wallpaperService } from "../services/wallpaperService";
import WallpaperCard from "../components/WallpaperCard";
import CategoryTabs from "../components/CategoryTabs";
import Footer from "../components/Footer";

export default function HomeScreen() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("Home");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    wallpaperService.getWallpapers(activeCategory).then((data) => {
      setWallpapers(data);
      setLoading(false);
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search wallpapers..."
            className="w-full bg-slate-900 pl-10 pr-4 py-3 rounded-xl"
          />
        </div>
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <main className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wallpapers.map((w) => (
          <WallpaperCard key={w.id} wallpaper={w} />
        ))}
      </main>

      {!loading && wallpapers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500">
          <Search size={56} className="mb-4 opacity-30" />
          <p className="text-xl font-semibold">No wallpapers found</p>
          <p className="text-sm mt-1 text-slate-400">
            Try switching category or searching something else
          </p>
        </div>
      )}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Loader2 className="animate-spin mb-3" size={32} />
          <p className="text-sm">Loading wallpapers...</p>
        </div>
      )}
      <Footer />
    </div>
  );
}