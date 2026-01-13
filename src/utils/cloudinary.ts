import type { ResolutionLabel, ScreenRatio } from "../types";

export function buildCloudinaryUrl(
  originalUrl: string,
  resolution: ResolutionLabel,
  ratio: ScreenRatio
) {
  let width = 1920;
  let height = 1080;

  // Resolution handling
  if (resolution === "HD") {
    width = 1280;
    height = 720;
  }

  if (resolution === "Full HD") {
    width = 1920;
    height = 1080;
  }

  if (resolution === "4K") {
    width = 3840;
    height = 2160;
  }

  // Screen ratio override
  if (ratio === "mobile") {
    width = 1080;
    height = 1920;
  }

  if (ratio === "ultrawide") {
    width = 3440;
    height = 1440;
  }

  // Inject Cloudinary transformation
  return originalUrl.replace(
    "/upload/",
    `/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`
  );
}
