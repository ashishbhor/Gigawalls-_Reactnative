
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Info, 
  CheckCircle2, 
  Loader2,
  Maximize2,
  X
} from 'lucide-react';
import { Wallpaper, RESOLUTIONS } from '../types';
import { wallpaperService } from '../services/wallpaperService';

const DetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  
  // Zoom & Pan State
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (id) {
      wallpaperService.getWallpaperById(id).then(data => {
        setWallpaper(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleDownload = (resLabel: string) => {
    setDownloading(resLabel);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = wallpaper?.thumbnailUrl || '';
      link.download = `GigaWalls_${id}_${resLabel}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(null);
    }, 1500);
  };

  // Panning Logic
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || scale === 1) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.current.x,
      y: clientY - dragStart.current.y
    });
  };

  const toggleZoom = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (!wallpaper) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Wallpaper Not Found</h2>
        <button onClick={() => navigate('/')} className="bg-blue-600 px-6 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  const highResUrl = wallpaper.thumbnailUrl.replace('400/600', '1200/1800');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Zoom Modal Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden touch-none">
          <button 
            onClick={() => { setIsZoomed(false); setScale(1); setPosition({x:0, y:0}); }}
            className="absolute top-6 right-6 z-[110] p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div 
            className="relative w-full h-full flex items-center justify-center cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={() => setIsDragging(false)}
            onClick={(e) => { if (e.detail === 2) toggleZoom(); }}
          >
            <img 
              src={highResUrl} 
              alt={wallpaper.title}
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)'
              }}
              className="max-w-full max-h-full object-contain pointer-events-none select-none"
            />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <button onClick={() => { setScale(Math.max(1, scale - 0.5)); if (scale <= 1.5) setPosition({x:0,y:0}); }} className="p-2 hover:bg-white/10 rounded-full">-</button>
            <span className="text-sm font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(Math.min(5, scale + 0.5))} className="p-2 hover:bg-white/10 rounded-full">+</button>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white pointer-events-auto active:scale-90 transition-transform shadow-lg border border-white/10"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white pointer-events-auto active:scale-90 transition-transform shadow-lg border border-white/10"
        >
          <Share2 size={24} />
        </button>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full aspect-[3/4] md:aspect-[16/9] overflow-hidden">
        <img 
          src={highResUrl} 
          alt={wallpaper.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        {/* Maximize Trigger */}
        <button 
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-20 right-6 p-4 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-900/40 text-white active:scale-90 transition-transform z-20"
        >
          <Maximize2 size={24} />
        </button>

        <div className="absolute bottom-8 left-6 right-6">
          <h1 className="text-4xl font-black tracking-tight mb-2 drop-shadow-2xl">{wallpaper.title}</h1>
          <div className="flex flex-wrap gap-2">
            {wallpaper.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/5 uppercase tracking-widest">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Details & Download Section */}
      <div className="flex-1 px-6 pb-20 -mt-6 relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-2xl">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg">
              {wallpaper.author[0]}
            </div>
            <div>
              <p className="text-slate-400 text-sm">Created by</p>
              <p className="font-bold text-lg">{wallpaper.author}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-400">
              <Download size={20} />
              <h2 className="font-bold uppercase tracking-wider text-sm">Download Options</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {RESOLUTIONS.map((res) => (
                <button
                  key={res.label}
                  disabled={downloading !== null}
                  onClick={() => handleDownload(res.label)}
                  className={`flex items-center justify-between p-4 rounded-2xl border border-slate-700 transition-all active:scale-[0.98] ${
                    downloading === res.label ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800/40 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-slate-100">{res.label}</span>
                    <span className="text-xs text-slate-400">{res.width} × {res.height}</span>
                  </div>
                  
                  {downloading === res.label ? (
                    <Loader2 className="animate-spin text-blue-500" size={20} />
                  ) : (
                    <div className="bg-blue-600 p-2 rounded-xl">
                      <Download size={18} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-slate-500 mb-4">
              <Info size={18} />
              <h3 className="font-semibold text-sm uppercase tracking-wider">Wallpaper Specs</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/20 rounded-2xl">
                <p className="text-slate-500 text-xs mb-1">Category</p>
                <p className="font-bold text-sm">{wallpaper.category}</p>
              </div>
              <div className="p-4 bg-slate-800/20 rounded-2xl">
                <p className="text-slate-500 text-xs mb-1">License</p>
                <p className="font-bold text-sm">Free for personal use</p>
              </div>
              <div className="p-4 bg-slate-800/20 rounded-2xl">
                <p className="text-slate-500 text-xs mb-1">Rating</p>
                <div className="flex items-center text-yellow-500">
                  <CheckCircle2 size={14} className="mr-1 text-blue-500" />
                  <span className="font-bold text-sm">Verified UHD</span>
                </div>
              </div>
              <div className="p-4 bg-slate-800/20 rounded-2xl">
                <p className="text-slate-500 text-xs mb-1">Format</p>
                <p className="font-bold text-sm">JPG / WebP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-600 text-xs px-10">
          All images are sourced from public creative databases. GigaWalls does not host copyright material without permission.
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
