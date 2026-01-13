import { useLocation, useNavigate } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Wallpaper, RESOLUTIONS, ResolutionLabel } from "../types";
import DownloadModal from "../components/DownloadModal";

export default function DetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const wallpaper = location.state as Wallpaper | undefined;

  const [open, setOpen] = useState(false);
  const [resolution, setResolution] =
    useState<ResolutionLabel>("HD");

  if (!wallpaper) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Wallpaper not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 bg-black/50 p-3 rounded-full"
      >
        <ArrowLeft />
      </button>

      <div className="aspect-[16/9]">
        <img
          src={wallpaper.thumbnail}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{wallpaper.title}</h1>

        {RESOLUTIONS.map((r) => (
          <button
            key={r.label}
            onClick={() => {
              setResolution(r.label);
              setOpen(true);
            }}
            className="flex justify-between w-full bg-slate-800 p-4 rounded-xl mb-3 hover:bg-slate-700"
          >
            {r.label}
            <Download />
          </button>
        ))}
      </div>

      <DownloadModal
        open={open}
        onClose={() => setOpen(false)}
        imageUrl={wallpaper.original}
        resolution={resolution}
        title={wallpaper.title}
      />
    </div>
  );
}
