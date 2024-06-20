import { IShapeState } from "@/shared/store/history-store";
import { Stage } from "konva/lib/Stage";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  stageRef: React.RefObject<Stage>;
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}

const useFileUpload = ({ stageRef, shapes, setShapes }: IProps) => {
  const handleDragUploadStart = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragUploadEnd = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;

      img.onload = () => {
        const stage = stageRef.current;
        const stageWidth = stage!.width();
        const stageHeight = stage!.height();
        const aspectRatio = img.width / img.height;

        let newWidth, newHeight;
        if (stageWidth / stageHeight > aspectRatio) {
          newHeight = stageHeight;
          newWidth = stageHeight * aspectRatio;
        } else {
          newWidth = stageWidth;
          newHeight = stageWidth / aspectRatio;
        }

        const x = (stageWidth - newWidth) / 2;
        const y = (stageHeight - newHeight) / 2;

        const newImage = {
          id: uuidv4(),
          type: "image",
          src: url,
          x,
          y,
          width: newWidth,
          height: newHeight,
        };
        setShapes([...shapes, newImage]);
      };
    }
  };

  return { handleDragUploadStart, handleDragUploadEnd };
};

export default useFileUpload;
