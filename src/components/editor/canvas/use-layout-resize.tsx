import useCanvasRefStore from "@/shared/store/canvas-ref-store";
import { isImageShape } from "@/components/editor/type-guards";

const useLayoutResize = (shapes: any) => {
  const imageShape = shapes.find(isImageShape);
  const { stageRef } = useCanvasRefStore((state) => state);

  if (!stageRef?.current) {
    return { width: 0, height: 0, xOffset: 0, yOffset: 0 };
  }

  if (!imageShape) {
    return { width: 0, height: 0, xOffset: 0, yOffset: 0 };
  }

  // 비율 계산
  const hRatio = stageRef.current.width() / imageShape.width;
  const vRatio = stageRef.current.height() / imageShape.height;
  const ratio = Math.min(hRatio, vRatio);

  // 이미지 크기 및 Offset 계산
  const imageWidth = imageShape.width * ratio;
  const imageHeight = imageShape.height * ratio;
  const xOffset = (stageRef.current.width() - imageWidth) / 2;
  const yOffset = (stageRef.current.height() - imageHeight) / 2;

  return {
    imageWidth,
    imageHeight,
    xOffset,
    yOffset,
    ratio,
  };
};

export default useLayoutResize;
