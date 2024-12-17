import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";

const useCrop = () => {
  const { crop, setCropTools } = useToolbarStore((state) => state);

  const handleDragMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setCropTools({ ...crop, x: e.target.x(), y: e.target.y() });
  };

  const handleTransform = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    setCropTools({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    });
  };

  return {
    handleDragMove,

    handleTransform,
  };
};

export default useCrop;
