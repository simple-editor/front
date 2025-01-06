import styled from "@emotion/styled";
import { Layer, Line, Stage } from "react-konva";
import useHistoryStore from "@/shared/store/history-store";
import useSelectStore from "@/shared/store/select-store";
import useMouseEventHandler from "@/shared/hooks/use-mouse-event-handler";
import useImageUpload from "@/shared/hooks/use-image-upload";
import useToolbarStore from "@/shared/store/toolbar-store";
import CropRect from "./crop-rect";
import useInitializeCropPos from "@/shared/hooks/use-Initialize-crop-pos";
import useCanvasRefStore from "@/shared/store/canvas-ref-store";
import ShapeList from "./shape-list";
import useZoom from "@/shared/hooks/use-zoom";
import useKeybordAction from "@/shared/hooks/use-keybord-action";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useLayoutResize from "@/components/editor/canvas/use-layout-resize";
import useClip from "@/shared/hooks/use-clip";

const Canvas = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { stageRef, layerRef } = useCanvasRefStore((state) => state);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const { currentLine, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseEventHandler({ shapes, setShapes });
  const activeTool = useToolbarStore((state) => state.activeTool);

  const { cancelSelection, selectedId } = useSelectStore((state) => state);

  useClip(layerRef.current, shapes);

  const { handleZoom } = useZoom();
  // 이미지 업로드
  const { handleDragUploadEnd, handleDragUploadStart } = useImageUpload({
    shapes,
    setShapes,
  });
  // 이미지 위치 조정
  const { imageShape } = useInitializeCropPos({ shapes });
  // 키보드 액션
  useKeybordAction({ selectedId, cancelSelection });
  const { xOffset, yOffset, ratio } = useLayoutResize(shapes);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        setWidth(parentRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize); // 윈도우 리사이즈 이벤트에 핸들러 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 클린업
    };
  }, [stageRef]);

  // 드래그 및 사이즈 조절 이벤트

  // Crop 기능

  useEffect(() => {
    if (imageShape) {
      stageRef.current?.batchDraw();
    }
  }, [imageShape, stageRef]);

  return (
    <CanvasWrapper
      onDragOver={handleDragUploadStart}
      onDrop={handleDragUploadEnd}
      ref={parentRef}
      id="parent"
    >
      <CustomStage
        id="stage"
        width={width}
        height={500}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // scaleX={parentRef.current.offsetWidth / imageShape?.width}
        // scaleY={parentRef.current.offsetWidth / imageShape?.width}

        onClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            cancelSelection();
          }
        }}
        onWheel={handleZoom}
      >
        {imageShape && (
          <Layer
            ref={layerRef}
            scaleX={ratio}
            scaleY={ratio}
            x={xOffset}
            y={yOffset}
          >
            <ShapeList shapes={shapes} />

            <CropRect
              imageShape={imageShape}
              isRender={imageShape && activeTool === "자르기"}
            />
            {currentLine && <Line {...currentLine} />}
          </Layer>
        )}
      </CustomStage>
    </CanvasWrapper>
  );
};

export default Canvas;
const CanvasWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray10};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 8px;
  grid-row: 2;
  grid-column: 2;
  height: 500px;
  display: grid;
  grid-template-columns: 1fr;
  box-sizing: border-box;
`;

const CustomStage = styled(Stage)`
  width: 100%;
  & > .konvajs-content {
    width: 100% !important;
  }
  & .konvajs-content > canvas {
    width: calc(100% - 2px) !important;
    height: 100% !important;
  }
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;
