
import React from 'react';
import { Wallpaper } from '../types';
import { useNavigate } from 'react-router-dom';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/wallpaper/${wallpaper.id}`)}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-800 aspect-[2/3] transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg"
    >
      <img 
        src={wallpaper.thumbnailUrl} 
        alt={wallpaper.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
        <h3 className="text-white text-sm font-semibold truncate">{wallpaper.title}</h3>
        <p className="text-slate-300 text-xs">{wallpaper.category}</p>
      </div>
      
      {/* Mobile persistent labels (subtle) */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent md:hidden">
         <h3 className="text-white text-[10px] font-medium truncate">{wallpaper.title}</h3>
      </div>
    </div>
  );
};

export default WallpaperCard;
