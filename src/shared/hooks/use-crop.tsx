import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";

const useCrop = ({ imageShape, shapeRef }: any) => {
  const { crop, setCropTools } = useToolbarStore((state) => state);

  const handleDragMove = (e: any) => {
    const { x, y } = e.target.position();
    const newX = Math.max(
      imageShape.x,
      Math.min(x, imageShape.x + imageShape.width - crop.width)
    );
    const newY = Math.max(
      imageShape.y,
      Math.min(y, imageShape.y + imageShape.height - crop.height)
    );
    setCropTools({ ...crop, x: newX, y: newY });
  };

  const handleTransform = () => {
    const node = shapeRef.current as Konva.Rect;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    const newWidth = Math.max(5, node.width() * scaleX);
    const newHeight = Math.max(5, node.height() * scaleY);

    const newX = Math.max(
      imageShape.x,
      Math.min(node.x(), imageShape.x + imageShape.width - newWidth)
    );
    const newY = Math.max(
      imageShape.y,
      Math.min(node.y(), imageShape.y + imageShape.height - newHeight)
    );

    setCropTools({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
  };

  const handledragBoundFunc = (pos: any) => {
    const newX = Math.max(
      imageShape.x,
      Math.min(pos.x, imageShape.x + imageShape.width - crop.width)
    );
    const newY = Math.max(
      imageShape.y,
      Math.min(pos.y, imageShape.y + imageShape.height - crop.height)
    );
    return { x: newX, y: newY };
  };
  return {
    handleDragMove,
    handledragBoundFunc,
    handleTransform,
  };
};

export default useCrop;
