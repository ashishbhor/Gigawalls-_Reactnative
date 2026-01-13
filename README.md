# 🌌 GigaWalls — UHD Wallpapers Platform

GigaWalls is a modern, high-quality wallpaper browsing platform inspired by premium wallpaper websites like **UHDpaper**.  
The project focuses on **clean UI**, **smooth UX**, and **intelligent image delivery** optimized for different screen sizes and devices.

> ⚠️ **Note:** This project is actively under development. Some backend features are still in progress.

---

## ✨ Key Features (Implemented)

### 🖼️ Wallpaper Browsing
- Category-based browsing (Anime, Nature, Space, Movies, etc.)
- Clean 3-column grid layout inspired by UHDpaper
- Optimized thumbnail display
- Smooth hover effects with Preview & Download actions

### 🔍 Preview Experience
- Dedicated **Detail Screen** for each wallpaper
- Large preview with title
- Resolution-based download options (HD / Full HD / 4K)

### 📱 Responsive Design
- Optimized for desktop, tablet, and mobile screens
- Adaptive grid layout with proper spacing and margins
- Sticky category navigation with smooth scroll behavior

### 🎨 UI & UX Enhancements
- Animated empty-state with looping video and rotating messages
- Smooth transitions, blur effects, and shadows
- Minimal dark theme for focus on visuals
- Hidden hamburger menu with About page navigation

---

## ⬇️ Smart Download System (In Progress)

GigaWalls is designed to provide an **intelligent download experience**.

### Current Progress
- Download modal UI implemented
- Device-based selection planned:
  - 📱 Mobile
  - 💻 Laptop / Desktop
  - 🖥️ Ultrawide
- Resolution logic structure prepared:
  - HD
  - Full HD
  - 4K

### Planned Behavior
- User selects **device type**
- Wallpaper downloads in the **correct aspect ratio**
- Resolution is dynamically adjusted **from a single high-quality source image**

---

## ☁️ Cloudinary Integration (Ongoing)

Cloudinary is used as the image delivery and optimization layer.

### Advantages
- Automatic image resizing
- On-the-fly resolution transformation
- Optimized image delivery for performance
- One master image → multiple resolutions

### Current Status
- Cloudinary connected
- URL-based transformation logic implemented
- Full resolution mapping still in progress

---

## 🔥 Firebase (Firestore) Integration (Ongoing)

Firebase is used as the backend database for wallpaper metadata.

### Planned Data Structure
- Wallpaper ID
- Title
- Category
- Tags
- Cloudinary image reference
- Download configuration
- Created timestamps

### Current Status
- Firebase connected
- Initial data testing done
- Full data migration and automation **in progress**

---

## 🧠 Project Structure (Updated)

src/
├── assets/
├── components/
│   ├── WallpaperCard.tsx
│   ├── DownloadModal.tsx
│   └── CategoryTabs.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── DetailScreen.tsx
│   └── AboutScreen.tsx
├── utils/
│   └── cloudinary.ts
├── types/
│   └── media.d.ts
├── services/
│   └── wallpaperService.ts
└── main.tsx


## ❤️ Credits & Inspiration

### Important Credit Notice
All wallpaper images displayed on GigaWalls are the **property of their respective creators**.

- Full credit goes to the original artists and platforms
- **UHDpaper** is a major inspiration for this project
- This project is a **fan-made tribute** and does **not claim ownership** of any artwork

🔗 https://www.uhdpaper.com/

GigaWalls exists for **learning, inspiration, and personal showcase purposes only**.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Firestore)
- **Media CDN:** Cloudinary
- **Routing:** React Router

---

## 🚧 Current Status

- UI & layout: ✅ Mostly complete  
- Cloudinary logic: ⚠️ In progress  
- Firebase automation: ⚠️ In progress  
- Download intelligence: ⚠️ In progress  

This README will be updated as features are finalized.

---

## 📌 Developer Note

This project is part of a continuous learning process focused on:
- Modern frontend architecture
- Media optimization
- Real-world UI/UX patterns
- Scalable cloud-based image delivery
