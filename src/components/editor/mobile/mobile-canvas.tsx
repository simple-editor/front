import styled from "@emotion/styled";
import { Stage, Layer } from "react-konva";
import useHistoryStore from "@/shared/store/history-store";
import useViewport from "@/shared/hooks/use-viewport";
import { useEffect, useState } from "react";
import FreeDrawing from "../canvas/free-drawing";

import useToolbarStore from "@/shared/store/toolbar-store";
import UploadedImage from "../canvas/uploaded-image";

const MobileCanvas = () => {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shapes = useHistoryStore((state) => state.shapes);
  const { width } = useViewport();
  const activeTool = useToolbarStore((state) => state.activeTool);

  const imageShape = shapes.find((shape) => shape.type === "image");

  useEffect(() => {
    if (!imageShape) return;

    const padding = 32;
    const availableWidth = width - padding;
    const availableHeight = window.innerHeight - 120;

    setStageSize({
      width: availableWidth,
      height: availableHeight,
    });

    const scaleX = availableWidth / (imageShape as any).width;
    const scaleY = availableHeight / (imageShape as any).height;

    let newScale = Math.min(scaleX, scaleY);

    const MIN_SCALE = 0.3;
    const MAX_SCALE = 2.0;

    newScale = Math.min(scaleX, scaleY) * 0.8;

    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

    const xOffset = (availableWidth - (imageShape as any).width * newScale) / 2;
    const yOffset =
      (availableHeight - (imageShape as any).height * newScale) / 2;

    setScale(newScale);
    setPosition({
      x: xOffset,
      y: yOffset,
    });
  }, [width, imageShape]);

  const renderShape = (shape: any, i: number) => {
    switch (shape.type) {
      case "image":
        return <UploadedImage key={`image-${i}`} image={shape} />;
      case "line":
        return (
          <FreeDrawing
            key={`line-${i}`}
            line={{
              ...shape,
              strokeWidth: shape.strokeWidth / scale,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MobileCanvasWrapper>
      <CanvasContainer>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          style={{
            touchAction: activeTool === "그리기" ? "none" : "auto",
          }}
        >
          <Layer x={position.x} y={position.y} scaleX={scale} scaleY={scale}>
            {shapes.map((shape, i) => renderShape(shape, i))}
          </Layer>
        </Stage>
      </CanvasContainer>
      <ToolbarOverlay>
        <ToolButton>
          <span>그리기</span>
        </ToolButton>
        <ToolButton>
          <span>지우기</span>
        </ToolButton>
      </ToolbarOverlay>
    </MobileCanvasWrapper>
  );
};

const MobileCanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #f8fafc;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
  padding: 16px;
  box-sizing: border-box;

  .konvajs-content {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    border-radius: 12px;
    overflow: hidden;
  }
`;

const ToolbarOverlay = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const ToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    background: #e2e8f0;
    transform: scale(0.98);
  }
`;

export default MobileCanvas;
