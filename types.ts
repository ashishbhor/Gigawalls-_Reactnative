
export type Resolution = 'HD' | 'Full HD' | 'QHD' | '4K';

export interface ResolutionConfig {
  label: Resolution;
  width: number;
  height: number;
}

export interface Wallpaper {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  tags: string[];
  author: string;
}

export type CategoryType = 
  | 'Home'
  | 'Games'
  | 'Anime'
  | 'Movies'
  | 'Series'
  | 'Animals'
  | 'Nature'
  | 'Celebrity'
  | 'Comic'
  | 'Sci-Fi'
  | 'Space';

export const CATEGORIES: CategoryType[] = [
  'Home',
  'Games',
  'Anime',
  'Movies',
  'Series',
  'Animals',
  'Nature',
  'Celebrity',
  'Comic',
  'Sci-Fi',
  'Space'
];

export const RESOLUTIONS: ResolutionConfig[] = [
  { label: 'HD', width: 1280, height: 720 },
  { label: 'Full HD', width: 1920, height: 1080 },
  { label: 'QHD', width: 2560, height: 1440 },
  { label: '4K', width: 3840, height: 2160 },
];
