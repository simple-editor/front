import { IShapeState } from "@/shared/store/history-store.types";
import { v4 as uuidv4 } from "uuid";
import { createImageShape, updateIndexedDB } from "./use-image-upload.utils";

interface IProps {
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}

const useImageUpload = ({ shapes, setShapes }: IProps) => {
  const handleDragUploadStart = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragUploadEnd = async (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    try {
      const imageId = uuidv4();
      const imageDataURL = await updateIndexedDB(file, imageId); //indexed에 이미지를 업로드한다.
      const newImageShape = await createImageShape(imageId, imageDataURL); //이미지 데이터를 가공한다.

      setShapes([...shapes, newImageShape]);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const handleButtonUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageId = uuidv4();
      const imageDataURL = await updateIndexedDB(file, imageId); // IndexedDB에 이미지를 업로드
      const newImageShape = await createImageShape(imageId, imageDataURL); // 이미지 데이터를 가공
      setShapes([...shapes, newImageShape]);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return { handleDragUploadStart, handleDragUploadEnd, handleButtonUpload };
};

export default useImageUpload;
