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

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <Footer />
    </div>
  );
}