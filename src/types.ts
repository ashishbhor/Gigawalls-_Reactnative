export type CategoryType =
  | "Home"
  | "Games"
  | "Anime"
  | "Movies"
  | "Series"
  | "Animals"
  | "Nature"
  | "Celebrity"
  | "Comic"
  | "Sci-Fi"
  | "Space";

export const CATEGORIES: CategoryType[] = [
  "Home",
  "Games",
  "Anime",
  "Movies",
  "Series",
  "Animals",
  "Nature",
  "Celebrity",
  "Comic",
  "Sci-Fi",
  "Space",
];

export interface Wallpaper {
  id: string;
  title: string;
  thumbnail: string;
  category: CategoryType;
  tags: string[];
  downloads?: {
    hd?: string;
  };
  author: string;
  slug: string;
}

export const RESOLUTIONS = [
  { label: "HD", width: 1280, height: 720 },
  { label: "Full HD", width: 1920, height: 1080 },
  { label: "4K", width: 3840, height: 2160 },
];
