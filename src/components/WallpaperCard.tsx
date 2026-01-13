import { useNavigate } from "react-router-dom";
import { Wallpaper } from "../types";
import { Eye, Download } from "lucide-react";

type Props = {
  wallpaper: Wallpaper;
};

export default function WallpaperCard({ wallpaper }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/wallpaper/${wallpaper.id}`, { state: wallpaper })
      }
      className="
        relative group cursor-pointer
        overflow-hidden rounded-xl
        bg-slate-800 shadow-lg
        transition-transform
        hover:scale-[1.02]
      "
    >
      {/* Image */}
      <div className="aspect-[16/10]">
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Hover overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-black/70 via-black/30 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Preview button (fixed UI) */}
      <div
        className="
          absolute bottom-3 left-3
          opacity-0 group-hover:opacity-100
          translate-y-2 group-hover:translate-y-0
          transition-all duration-200
        "
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/wallpaper/${wallpaper.id}`, { state: wallpaper });
          }}
          className="
            flex items-center gap-2
            px-3 py-1.5
            rounded-full
            text-xs font-medium
            text-white
            bg-white/10 backdrop-blur-md
            border border-white/20
            hover:bg-white/20
          "
        >
          <Eye size={14} />
          Preview
        </button>
      </div>

      {/* Download button (unchanged, slightly polished) */}
      {wallpaper.downloads?.hd && (
        <div
          className="
            absolute bottom-3 right-3
            opacity-0 group-hover:opacity-100
            translate-y-2 group-hover:translate-y-0
            transition-all duration-200
          "
        >
          <a
            href={wallpaper.downloads.hd}
            download
            onClick={(e) => e.stopPropagation()}
            className="
              flex items-center gap-1
              text-xs font-semibold
              bg-blue-600/90
              px-3 py-1.5
              rounded-full
              text-white
              hover:bg-blue-500
              transition
            "
          >
            <Download size={14} />
            
          </a>
        </div>
      )}
    </div>
  );
}
