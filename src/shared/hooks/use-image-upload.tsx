import { IShapeState } from "@/shared/store/history-store";
import { Stage } from "konva/lib/Stage";
import { v4 as uuidv4 } from "uuid";
import useToolbarStore from "../store/toolbar-store";

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
    if (file) {
      const locatedImage = await locateImageCenter(file);
      setShapes([...shapes, locatedImage]);
    }
  };
  function locateImageCenter(file: File): Promise<{
    id: string;
    type: string;
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        if (!stageRef.current) return;
        const stageWidth = stageRef.current.width();
        const stageHeight = stageRef.current.height();

        const imgWidth = img.width;
        const imgHeight = img.height;

        const x = (stageWidth - imgWidth) / 2;
        const y = (stageHeight - imgHeight) / 2;

        const newImage = {
          id: uuidv4(),
          type: "image",
          src: img.src,
          x,
          y,
          width: imgWidth,
          height: imgHeight,
        };

        resolve(newImage);
      };
    });
  }
  return { handleDragUploadStart, handleDragUploadEnd };
};

export default useImageUpload;
