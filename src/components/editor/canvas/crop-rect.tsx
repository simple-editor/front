import useCrop from "@/shared/hooks/use-crop";
import { useTransformer } from "@/shared/hooks/use-transformer";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useRef, useMemo, memo, useCallback } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { debounce } from "lodash";
import { throttle } from "lodash";
import { KonvaEventObject } from "konva/lib/Node";

interface CropOverlayProps {
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imageShape: {
    width: number;
    height: number;
  };
}

const CropOverlay = memo(({ crop, imageShape }: CropOverlayProps) => {
  const overlayRects = [
    // 상단
    {
      x: 0,
      y: 0,
      width: imageShape.width,
      height: crop.y,
    },
    // 하단
    {
      x: 0,
      y: crop.y + crop.height,
      width: imageShape.width,
      height: imageShape.height - (crop.y + crop.height),
    },
    // 좌측
    {
      x: 0,
      y: crop.y,
      width: crop.x,
      height: crop.height,
    },
    // 우측
    {
      x: crop.x + crop.width,
      y: crop.y,
      width: imageShape.width - (crop.x + crop.width),
      height: crop.height,
    },
  ];

  return (
    <Group listening={false}>
      {overlayRects.map((rect, index) => (
        <Rect key={index} {...rect} fill="rgba(0, 0, 0, 0.35)" />
      ))}
    </Group>
  );
});

interface CropRectProps {
  imageShape: {
    width: number;
    height: number;
  };
  isRender: boolean;
}

const TRANSFORMER_CONFIG = {
  borderStroke: "#ffffff",
  borderStrokeWidth: 0.5,
  anchorFill: "#ffffff",
  anchorStroke: "#ffffff",
  anchorSize: 6,
  anchorCornerRadius: 50,
  enabledAnchors: [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ] as string[],
  rotateEnabled: false,
};

const ANIMATION_FRAME_RATE = 16; // ~60fps

const CropRect: React.FC<CropRectProps> = ({ imageShape, isRender }) => {
  const { crop, setCropTools } = useToolbarStore((state) => state);
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { handleTransform, handleDblClick } = useCrop(trRef, imageShape);

  useTransformer({
    isSelected: true,
    shapeRef: shapeRef,
    transformerRef: trRef,
  });

  const handleDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      requestAnimationFrame(() => {
        setCropTools({
          ...crop,
          x: e.target.x(),
          y: e.target.y(),
        });
      });
    },
    [crop, setCropTools]
  );

  const handleDragMoveOptimized = useMemo(
    () => debounce(handleDragMove, ANIMATION_FRAME_RATE),
    [handleDragMove]
  );

  const handleTransformOptimized = useMemo(
    () => throttle(handleTransform, ANIMATION_FRAME_RATE),
    [handleTransform]
  );

  if (!isRender) return null;

  return (
    <Group>
      <CropOverlay crop={crop} imageShape={imageShape} />
      <Group>
        <Rect
          ref={shapeRef}
          {...crop}
          draggable
          onDragEnd={handleDragMoveOptimized}
          onTransformEnd={handleTransformOptimized}
          onTransform={handleTransform}
          onDblClick={handleDblClick}
          perfectDrawEnabled={false}
          transformsEnabled="position"
          listening={true}
        />
        <Transformer
          ref={trRef}
          boundBoxFunc={(_oldbox, newBox) => newBox}
          {...TRANSFORMER_CONFIG}
        />
      </Group>
    </Group>
  );
};

export default CropRect;
