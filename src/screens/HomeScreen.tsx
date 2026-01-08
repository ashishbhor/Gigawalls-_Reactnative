import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Wallpaper, CategoryType } from "../types";
import { wallpaperService } from "../services/wallpaperService";
import WallpaperCard from "../components/WallpaperCard";
import CategoryTabs from "../components/CategoryTabs";
import Footer from "../components/Footer";
import runnerVideo from "../assets/runner.webm";

export default function HomeScreen() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("Home");
  const [loading, setLoading] = useState(false);

  /* 🔁 Funny rotating messages */
  const emptyMessages = [
    "Running across the galaxy for wallpapers… 🏃‍♂️💫",
    "These pixels are playing hide & seek 👀",
    "Try switching category & explorer 🚀",
    "Your wallpaper is loading… somewhere 🌌",
    "Good things take time… like 4K wallpapers 😌",
    "Still running… don’t give up 🏃‍♂️",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (loading || wallpapers.length > 0) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % emptyMessages.length);
    }, 2800); // ~3 seconds

    return () => clearInterval(interval);
  }, [loading, wallpapers.length]);

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

      {/* Wallpapers Grid */}
      <main className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wallpapers.map((w) => (
          <WallpaperCard key={w.id} wallpaper={w} />
        ))}
      </main>
      {!loading && wallpapers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <video
            src={runnerVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-56 h-56 mb-6"
          />

          <p
            key={messageIndex}
            className="text-xl font-semibold text-center text-slate-300 drop-shadow-md transition-opacity duration-500">
            {emptyMessages[messageIndex]}
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
