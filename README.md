# GigaWalls – Wallpaper Application

GigaWalls is a modern wallpaper browsing application built with React (web-first, scalable to React Native) that allows users to explore and download high-quality wallpapers across multiple categories such as Nature, Anime, Movies, Series, Games, Sci-Fi, Space, and more.

The app focuses on fast performance, clean UI, and scalable backend architecture using cloud services.

---

## ✨ Key Features

- Browse wallpapers by category
- Infinite scrolling grid layout
- Search wallpapers by name or tags
- High-quality image previews
- Multiple download options (HD / FHD / UHD)
- Clean, dark-themed UI
- No login required (open access)

---

## 🧩 Categories Supported

- Home (combined feed)
- Nature
- Anime
- Movies
- Series
- Games
- Animals
- Celebrity
- Comics
- Sci-Fi
- Space

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend / Services
- Firebase Firestore (metadata storage)
- Cloudinary (image hosting & CDN)

---

## 📦 Project Structure

src/
├── components/
│ ├── WallpaperCard.tsx
│ ├── CategoryTabs.tsx
│ └── Footer.tsx
├── screens/
│ ├── HomeScreen.tsx
│ └── DetailScreen.tsx
├── services/
│ └── wallpaperService.ts (mock, to be replaced)
├── types.ts
└── App.tsx


---

## 🔥 Current Development Status

### ✅ Completed
- Core UI layout
- Category-based navigation
- Infinite scroll implementation
- Wallpaper grid & detail screens
- Footer component
- Cloudinary folder-based image organization
- Firebase project & Firestore database setup
- Metadata structure finalized for wallpapers

### 🚧 In Progress
- Bulk upload automation from Cloudinary → Firestore
- Replacing mock wallpaper service with Firestore data
- Real-time fetching of wallpapers from Firestore
- Download buttons wired to Cloudinary URLs

---

## ☁️ Cloudinary Workflow (Image Storage)

- All wallpapers are stored in **Cloudinary**
- Images are organized by folders matching categories:

Category/Gigawalls/
├── Nature/
├── Anime/
├── Movie/
├── Series/
├── Game/
├── Sci-Fi/
└── Space/


- Each image is uploaded **once**
- Cloudinary dynamically serves:
  - Thumbnail (w_400)
  - HD (w_1280)
  - FHD (w_1920)
  - UHD / 4K (w_3840)

No duplicate image uploads are required.

---

## 🔥 Firestore Data Structure (Metadata Only)

Firestore stores **only metadata and image URLs**, not images.

### Collection: `wallpapers`

Each document follows this structure:

```json
{
  "title": "Misty Forest",
  "category": "Nature",
  "slug": "misty-forest-01",
  "thumbnail": "CLOUDINARY_THUMBNAIL_URL",
  "downloads": {
    "hd": "CLOUDINARY_HD_URL",
    "fhd": "CLOUDINARY_FHD_URL",
    "uhd": "CLOUDINARY_UHD_URL"
  },
  "tags": ["nature", "forest", "misty"],
  "createdAt": "timestamp"
}
