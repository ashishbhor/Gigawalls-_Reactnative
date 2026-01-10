import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AboutScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">
      
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-black tracking-tight">
          About <span className="text-blue-500">GigaWalls</span>
        </h1>

        <p className="text-slate-300 leading-relaxed">
          GigaWalls is a premium wallpaper platform built for people who
          love high-quality visuals. From minimal designs to cinematic
          landscapes, we focus on clarity, performance, and style.
        </p>

        <p className="text-slate-300 leading-relaxed">
          Every wallpaper is carefully curated and optimized for
          <span className="text-white font-semibold"> HD, Full HD, and 4K </span>
          displays — ensuring the best experience on every screen.
        </p>

        <p className="text-slate-400 text-sm">
          Built with ❤️ using React, Firebase, and Cloudinary.
        </p>
      </div>
    </div>
  );
}
