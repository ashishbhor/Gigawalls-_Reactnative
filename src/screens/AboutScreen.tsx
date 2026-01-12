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
          <span className="text-white font-semibold">GigaWalls</span> is a
          fan-made wallpaper platform created for people who truly appreciate
          ultra-high-quality visuals. This project is built with passion for
          cinematic, artistic, and premium wallpapers designed for modern
          displays.
        </p>

        <p className="text-slate-300 leading-relaxed">
          The inspiration behind GigaWalls comes from the amazing work of
          <span className="text-white font-semibold"> UHDpaper</span>.
          As a huge fan of their platform, design philosophy, and wallpaper
          collection, this project exists as a tribute to the incredible effort
          put in by their founders, developers, and the artists who contribute
          such stunning artwork.
        </p>

        <p className="text-slate-300 leading-relaxed">
          <span className="text-white font-semibold">Important Credit Notice:
          All wallpaper images displayed on this website are the property of
          their respective creators. Full credit goes to the original artists
          and platforms (including UHDpaper) that make these artworks available.
          GigaWalls does not claim ownership of any artwork and is intended for
          educational, inspirational, and personal-use showcase purposes only.</span>{" "}
        </p>

        <p className="mt-3">
          <a
            href="https://www.uhdpaper.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
      inline-flex items-center gap-2
      px-4 py-2
      rounded-lg
      bg-slate-900 border border-slate-800
      text-blue-400
      hover:bg-slate-800 hover:text-blue-300
      transition
    "
          >
            Visit UHDpaper →
          </a>
        </p>

        <p className="text-slate-300 leading-relaxed">
          Our goal is to provide a clean, fast, and modern interface where users
          can explore wallpapers optimized for
          <span className="text-white font-semibold">
            {" "}HD, Full HD, 2K, and 4K
          </span>{" "}
          screens, while maintaining respect for the creators behind every
          piece of art.
        </p>

        <p className="text-slate-300 leading-relaxed">
          GigaWalls is built as a learning-driven and passion project — combining
          modern web technologies with a love for digital art, design, and user
          experience.
        </p>

        <p className="text-slate-400 text-sm pt-4 border-t border-slate-800">
          Built with ❤️ using React, TypeScript, Firebase, and Cloudinary. <br />
          Inspired by UHDpaper · Respecting Artists · Celebrating Creativity
        </p>
      </div>
    </div>
  );
}
