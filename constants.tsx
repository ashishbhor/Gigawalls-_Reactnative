
import React from 'react';
import { 
  Home, 
  Gamepad2, 
  Tv, 
  Film, 
  PawPrint, 
  Trees, 
  User, 
  BookOpen, 
  Rocket, 
  Stars, 
  Sparkles 
} from 'lucide-react';
import { CategoryType } from './types';

export const getCategoryIcon = (category: CategoryType, size = 20) => {
  switch (category) {
    case 'Home': return <Home size={size} />;
    case 'Games': return <Gamepad2 size={size} />;
    case 'Anime': return <Sparkles size={size} />;
    case 'Movies': return <Film size={size} />;
    case 'Series': return <Tv size={size} />;
    case 'Animals': return <PawPrint size={size} />;
    case 'Nature': return <Trees size={size} />;
    case 'Celebrity': return <User size={size} />;
    case 'Comic': return <BookOpen size={size} />;
    case 'Sci-Fi': return <Rocket size={size} />;
    case 'Space': return <Stars size={size} />;
    default: return <Home size={size} />;
  }
};
