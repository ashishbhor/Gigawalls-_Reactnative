import { Laptop, Smartphone, Monitor, X } from "lucide-react";
import { ScreenRatio, ResolutionLabel } from "../types";
import { buildCloudinaryUrl } from "../utils/cloudinary";

type Props = {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  resolution: ResolutionLabel;
  title: string;
};

export default function DownloadModal({
  open,
  onClose,
  imageUrl,
  resolution,
  title,
}: Props) {
  if (!open) return null;

  const handleDownload = (ratio: ScreenRatio) => {
    const url = buildCloudinaryUrl(imageUrl, resolution, ratio);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}-${resolution}-${ratio}.jpg`;
    a.click();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center">
      <div className="bg-slate-900 rounded-2xl p-6 w-[90%] max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-semibold text-center mb-4">
          Choose Screen Ratio
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleDownload("laptop")}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-800 hover:bg-slate-700"
          >
            <Laptop />
            <span className="text-xs">Laptop</span>
            <span className="text-[11px] text-slate-400">16:9</span>
          </button>

          <button
            onClick={() => handleDownload("mobile")}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-800 hover:bg-slate-700"
          >
            <Smartphone />
            <span className="text-xs">Mobile</span>
            <span className="text-[11px] text-slate-400">9:16</span>
          </button>

          <button
            onClick={() => handleDownload("ultrawide")}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-800 hover:bg-slate-700"
          >
            <Monitor />
            <span className="text-xs">UltraWide</span>
            <span className="text-[11px] text-slate-400">21:9</span>
          </button>
        </div>
      </div>
    </div>
  );
}
