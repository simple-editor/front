import { readFileAndSaveToIndexedDB } from "@/shared/services/storage";

export const loadImage = (dataURL: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.src = dataURL;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const updateIndexedDB: (
  file: File,
  imageId: string
) => Promise<string> = async (file, imageId) => {
  const dataURL: string = await readFileAndSaveToIndexedDB(file, imageId);
  return dataURL;
};

export const createImageShape = async (imageId: string, dataURL: string) => {
  const img = await loadImage(dataURL);
  const imgWidth = img.width;
  const imgHeight = img.height;

  const newImage = {
    id: imageId,
    type: "image" as "image",
    width: imgWidth,
    height: imgHeight,
    x: 0,
    y: 0,
  };
  return newImage;
};
