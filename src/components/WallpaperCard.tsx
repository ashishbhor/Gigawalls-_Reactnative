import { useNavigate } from "react-router-dom";
import { Wallpaper } from "../types";
import { Eye, Download } from "lucide-react";

type Props = {
  wallpaper: Wallpaper;
};

export default function WallpaperCard({ wallpaper }: Props) {
  const navigate = useNavigate();

  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-800 shadow-lg">

      {/* Image */}
      <div className="aspect-[16/9]">
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Hover Overlay */}
      <div className="
        absolute inset-0
        bg-gradient-to-t from-black/70 via-black/30 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        flex items-end justify-between p-4
      ">

        {/* Preview */}
        <button
          onClick={() =>
            navigate(`/wallpaper/${wallpaper.id}`, { state: wallpaper })
          }
          className="flex items-center gap-1 text-sm bg-white/10 backdrop-blur px-3 py-1.5 rounded-full hover:bg-white/20 transition"
        >
          <Eye size={14} />
          Preview
        </button>

        {/* Download */}
        {wallpaper.downloads?.hd && (
          <a
            href={wallpaper.downloads.hd}
            download
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm bg-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-500 transition"
          >
            <Download size={14} />
            HD
          </a>
        )}
      </div>
    </div>
  );
}
