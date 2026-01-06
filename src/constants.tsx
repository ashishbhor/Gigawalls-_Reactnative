import { CategoryType } from "./types";
import {
  Home,
  Gamepad2,
  Film,
  Tv,
  PawPrint,
  Leaf,
  User,
  BookOpen,
  Rocket,
} from "lucide-react";

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

export const getCategoryIcon = (cat: CategoryType) => {
  switch (cat) {
    case "Games":
      return Gamepad2;
    case "Movies":
      return Film;
    case "Series":
      return Tv;
    case "Animals":
      return PawPrint;
    case "Nature":
      return Leaf;
    case "Celebrity":
      return User;
    case "Comic":
      return BookOpen;
    case "Sci-Fi":
    case "Space":
      return Rocket;
    default:
      return Home;
  }
};
