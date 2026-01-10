import { useEffect, useState } from "react";
import { Search, Loader2, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Wallpaper, CategoryType } from "../types";
import { wallpaperService } from "../services/wallpaperService";
import WallpaperCard from "../components/WallpaperCard";
import CategoryTabs from "../components/CategoryTabs";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import runnerVideo from "../assets/runner.webm";

export default function HomeScreen() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("Home");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const emptyMessages = [
    "Running across the galaxy for wallpapers… 🏃‍♂️💫",
    "These pixels are playing hide & seek 👀",
    "Try switching category & explore 🚀",
    "Your wallpaper is loading… somewhere 🌌",
    "Good things take time… like 4K wallpapers 😌",
  ];

  /* Scroll shadow logic */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fetch wallpapers */
  useEffect(() => {
    setLoading(true);
    wallpaperService.getWallpapers(activeCategory).then((data) => {
      setWallpapers(data);
      setLoading(false);
    });
  }, [activeCategory]);

  /* Rotating empty messages */
  useEffect(() => {
    if (loading || wallpapers.length > 0) return;
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % emptyMessages.length);
    }, 2800);
    return () => clearInterval(id);
  }, [loading, wallpapers.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div
  onClick={() => navigate("/")}
  className="flex items-center gap-2 cursor-pointer"
>
  <img
    src={logo}
    alt="Gigawalls"
    className="w-8 h-8 object-contain"
  />
  <span className="text-xl font-black tracking-tight text-white">
    Giga<span className="text-blue-500">Walls</span>
  </span>
</div>

          <div className="relative flex-1 mx-4 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              placeholder="Search wallpapers..."
              className="w-full bg-slate-900 pl-10 pr-4 py-2 rounded-xl text-sm"
            />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-slate-800"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MENU */}
      <div
        className={`fixed top-[64px] right-4 z-50 w-48 rounded-xl
        bg-slate-900/95 backdrop-blur-lg border border-slate-800 shadow-xl
        transition-all duration-300
        ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/about");
          }}
          className="w-full px-4 py-3 text-left hover:bg-slate-800 rounded-xl"
        >
          About Us
        </button>
      </div>

      {/* CATEGORY BAR */}
      <div
        className={`sticky top-[72px] z-30 transition-all duration-300
        ${scrolled ? "bg-slate-950/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
      >
        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* GRID */}
      <main className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wallpapers.map((w) => (
          <WallpaperCard key={w.id} wallpaper={w} />
        ))}
      </main>

      {/* EMPTY */}
      {!loading && wallpapers.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <video
            src={runnerVideo}
            autoPlay
            loop
            muted
            className="w-40 h-40 mb-4"
          />
          <p className="text-xl font-semibold text-yellow-100 drop-shadow-md">
            {emptyMessages[messageIndex]}
          </p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin" size={32} />
        </div>
      )}

      <Footer />
    </div>
  );
}
