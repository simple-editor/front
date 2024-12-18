import useCrop from "@/shared/hooks/use-crop";
import { useTransformer } from "@/shared/hooks/use-transformer";
import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useRef } from "react";
import { Rect, Transformer } from "react-konva";

const CropRect = ({ imageShape, isRender }: any) => {
  const { crop } = useToolbarStore((state) => state);

  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { handleDragMove, handleTransform, handleDblClick } = useCrop(
    trRef,
    imageShape
  );

  useTransformer({
    isSelected: true,
    shapeRef: shapeRef,
    transformerRef: trRef,
  });

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
          onDragEnd={handleDragMove}
          onTransformEnd={handleTransform}
          onTransform={handleTransform}
          onDblClick={handleDblClick}
        />
        <Transformer ref={trRef} boundBoxFunc={(_oldbox, newBox) => newBox} />
      </>
    )
  );
};

export default CropRect;
