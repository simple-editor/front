import { IShapeState } from "@/shared/store/history-store.types";
import { Stage } from "konva/lib/Stage";
import { v4 as uuidv4 } from "uuid";
import { createImageShape, updateIndexedDB } from "./use-image-upload.utils";

interface IProps {
  stageRef: React.RefObject<Stage>;
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}

const useImageUpload = ({ stageRef, shapes, setShapes }: IProps) => {
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
      const newImageShape = await createImageShape(
        imageId,
        imageDataURL,
        stageRef
      ); //이미지 데이터를 가공한다.

      setShapes([...shapes, newImageShape]);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return { handleDragUploadStart, handleDragUploadEnd };
};

export default useImageUpload;
