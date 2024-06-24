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
    const file = event.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
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

        setShapes([...shapes, newImage]);
      };
    }
  };

  return { handleDragUploadStart, handleDragUploadEnd };
};

export default useFileUpload;
