import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Wallpaper, CategoryType } from "../types";

export const wallpaperService = {
  async getWallpapers(category: CategoryType): Promise<Wallpaper[]> {
    const ref = collection(db, "wallpapers");
    const q =
      category === "Home"
        ? ref
        : query(ref, where("category", "==", category));

    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Wallpaper, "id">),
    }));
  },
};
