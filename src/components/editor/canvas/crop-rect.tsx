import useCrop from "@/shared/hooks/use-crop";
import { useTransformer } from "@/shared/hooks/use-transformer";
import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useRef } from "react";
import { Rect, Transformer } from "react-konva";
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

  useTransformer({
    isSelected: true,
    shapeRef: shapeRef,
    transformerRef: trRef,
  });

  const handleDoubleClick = () => {
    //자르기 조건은 transformer가 활성화 된 상태에서만 발동해야함
    if (!trRef.current || trRef.current.nodes().length === 0) return;
    if (crop && imageShape) {
      const newShape = {
        id: uuidv4(),
        type: "crop" as "crop",
        ...crop,
      };

      setShapes([...shapes, newShape]);
    }
  };

  return (
    isRender && (
      <>
        <Rect
          ref={shapeRef}
          x={crop.x}
          y={crop.y}
          width={crop.width}
          height={crop.height}
          stroke="blue"
          strokeWidth={2}
          fill="black"
          opacity={0.3}
          draggable
          dragBoundFunc={handledragBoundFunc}
          onDragMove={handleDragMove}
          onTransformEnd={handleTransform}
          onDblClick={handleDoubleClick}
        />
        <Transformer ref={trRef} boundBoxFunc={(_oldbox, newBox) => newBox} />
      </>
    )
  );
};

export default CropRect;
