import { isKonvaNode } from "@/components/editor/type-guards";
import useCrop from "@/shared/hooks/use-crop";
import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useRef, useEffect } from "react";
import { Rect, Transformer, Group } from "react-konva";
import { v4 as uuidv4 } from "uuid";

const CropRect = ({ imageShape, isRender }: any) => {
  const crop = useToolbarStore((state) => state.crop);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { handleDragMove, handleTransform, handledragBoundFunc } = useCrop({
    imageShape,
    shapeRef,
  });

  useEffect(() => {
    const rect = shapeRef.current;
    const tr = trRef.current;
    if (isKonvaNode(tr, Konva.Transformer) && isKonvaNode(rect, Konva.Rect)) {
      const layer = tr.getLayer();
      tr.nodes([rect]);
      layer?.batchDraw();
    }
  }, []);

  const handleDoubleClick = () => {
    if (crop && imageShape) {
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
    isRender && (
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
          dragBoundFunc={handledragBoundFunc}
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
    )
  );
};

export default CropRect;
