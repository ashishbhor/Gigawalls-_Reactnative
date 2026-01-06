import { useNavigate } from "react-router-dom";
import { Wallpaper } from "../types";

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
      className="cursor-pointer overflow-hidden rounded-xl bg-slate-800 shadow-lg hover:scale-[1.02] transition-transform"
    >
      <div className="aspect-[16/9]">
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
