import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";

const useCrop = ({ imageBounds, shapeRef }: any) => {
  const { crop, setCropTools } = useToolbarStore((state) => state);

  const handleDragMove = (e: any) => {
    const { x, y } = e.target.position();
    const newX = Math.max(
      imageBounds.x,
      Math.min(x, imageBounds.x + imageBounds.width - crop.width)
    );
    const newY = Math.max(
      imageBounds.y,
      Math.min(y, imageBounds.y + imageBounds.height - crop.height)
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
      imageBounds.x,
      Math.min(node.x(), imageBounds.x + imageBounds.width - newWidth)
    );
    const newY = Math.max(
      imageBounds.y,
      Math.min(node.y(), imageBounds.y + imageBounds.height - newHeight)
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
      imageBounds.x,
      Math.min(pos.x, imageBounds.x + imageBounds.width - crop.width)
    );
    const newY = Math.max(
      imageBounds.y,
      Math.min(pos.y, imageBounds.y + imageBounds.height - crop.height)
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
