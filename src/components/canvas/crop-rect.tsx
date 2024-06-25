import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import { useRef, useEffect } from "react";
import { Rect, Transformer, Group } from "react-konva";
import { v4 as uuidv4 } from "uuid";
const CropRect = ({ imageBounds, isRender }) => {
  const { crop, setCropTools } = useToolbarStore((state) => state);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, []);

  if (!isRender) return <></>;

  const handleDragMove = (e) => {
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

  const handleTransform = (e) => {
    const node = shapeRef.current;
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

  const dragBoundFunc = (pos) => {
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

  const handleDoubleClick = () => {
    if (crop && imageBounds) {
      setShapes([
        ...shapes,
        {
          id: uuidv4(),
          type: "crop",
          ...crop,
        },
      ]);
    }
  };

  return (
    <Group>
      <Rect
        ref={shapeRef}
        x={crop.x}
        y={crop.y}
        width={crop.width}
        height={crop.height}
        stroke="blue"
        strokeWidth={2}
        fill="#000"
        opacity={0.3}
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragMove={handleDragMove}
        onTransformEnd={handleTransform}
        onDblClick={handleDoubleClick}
      />
      <Transformer ref={trRef} boundBoxFunc={(_oldbox, newBox) => newBox} />
    </Group>
  );
};

export default CropRect;
