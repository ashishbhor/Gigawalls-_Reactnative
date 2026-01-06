import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { Wallpaper, CategoryType } from "../types";

export const wallpaperService = {
  async getWallpapers(category: CategoryType): Promise<Wallpaper[]> {
    let q;

    if (category !== "Home") {
      q = query(
        collection(db, "wallpapers"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(20)
      );
    } else {
      q = query(
        collection(db, "wallpapers"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
    }

    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Wallpaper, "id">),
    }));
  },
};