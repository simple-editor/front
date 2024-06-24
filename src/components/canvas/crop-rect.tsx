import React, { useRef, useEffect } from "react";
import { Rect, Transformer, Group } from "react-konva";

const CropRect = ({ crop, onChange, imageBounds, onClick }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, []);

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
    onChange({ ...crop, x: newX, y: newY });
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

    onChange({
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

  return (
    <Group>
      {/* Overlay rect */}

      {/* Crop area */}
      <Rect
        ref={shapeRef}
        x={crop.x}
        y={crop.y}
        width={crop.width}
        height={crop.height}
        stroke="blue"
        fill="#000"
        opacity={0.7}
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragMove={handleDragMove}
        onTransformEnd={handleTransform}
        onDblClick={onClick}
      />
      <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => newBox} />
    </Group>
  );
};

export default CropRect;
