import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useRef, useEffect } from "react";
import { Rect, Transformer, Group } from "react-konva";
import { v4 as uuidv4 } from "uuid";
const CropRect = ({ imageBounds, isRender }: any) => {
  const { crop, setCropTools } = useToolbarStore((state) => state);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (trRef.current && shapeRef.current) {
      const layer = trRef.current.getLayer();
      if (layer) {
        trRef.current.nodes([shapeRef.current]);
        layer.batchDraw();
      }
    }
  }, []);

  if (!isRender) return <></>;

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

  const dragBoundFunc = (pos: any) => {
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
        fill=""
        opacity={0}
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragMove={handleDragMove}
        onTransformEnd={handleTransform}
        onDblClick={handleDoubleClick}
      />
      <Transformer ref={trRef} boundBoxFunc={(_oldbox, newBox) => newBox} />
      <Rect
        x={0}
        y={0}
        width={window.innerWidth}
        height={crop.y}
        fill="rgba(0, 0, 0, 0.5)"
      />
      <Rect
        x={0}
        y={crop.y + crop.height}
        width={window.innerWidth}
        height={window.innerHeight - (crop.y + crop.height)}
        fill="rgba(0, 0, 0, 0.5)"
      />
      <Rect
        x={0}
        y={crop.y}
        width={crop.x}
        height={crop.height}
        fill="rgba(0, 0, 0, 0.5)"
      />
      <Rect
        x={crop.x + crop.width}
        y={crop.y}
        width={window.innerWidth - (crop.x + crop.width)}
        height={crop.height}
        fill="rgba(0, 0, 0, 0.5)"
      />
    </Group>
  );
};

export default CropRect;
