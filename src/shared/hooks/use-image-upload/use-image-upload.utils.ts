import { readFileAndSaveToIndexedDB } from "@/shared/services/storage";
import { Stage } from "konva/lib/Stage";

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

export const createImageShape = async (
  imageId: string,
  dataURL: string,
  stageRef: React.RefObject<Stage>
) => {
  const img = await loadImage(dataURL);
  const stageWidth = stageRef.current!.width();
  const stageHeight = stageRef.current!.height();
  const imgWidth = img.width;
  const imgHeight = img.height;
  const x = (stageWidth - imgWidth) / 2;
  const y = (stageHeight - imgHeight) / 2;

  const newImage = {
    id: imageId,
    type: "image" as "image",
    x,
    y,
    width: imgWidth,
    height: imgHeight,
  };
  return newImage;
};
