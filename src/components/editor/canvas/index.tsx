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

const Canvas = () => {
  const { layerRef, stageRef } = useCanvasRefStore((state) => state);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const activeTool = useToolbarStore((state) => state.activeTool);
  const cancelSelection = useSelectStore((state) => state.cancelSelection);

  const { currentLine, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseEventHandler({ shapes, setShapes });

  const { handleZoom, zoom } = useZoom();

  const { handleDragUploadEnd, handleDragUploadStart } = useImageUpload({
    shapes,
    setShapes,
    stageRef,
  }); //이미지 드래그 업로드

  const { cropedLayerSize, imageShape } = useInitializeCropPos({ shapes });

  return (
    <CanvasWrapper
      onDragOver={handleDragUploadStart}
      onDrop={handleDragUploadEnd}
    >
      <CustomStage
        id="stage"
        ref={stageRef}
        width={1440}
        height={704}
        scaleX={zoom.stageScale}
        scaleY={zoom.stageScale}
        x={zoom.stageX}
        y={zoom.stageY}
        onClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            cancelSelection();
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleZoom}
      >
        <Layer
          ref={layerRef}
          clipX={cropedLayerSize?.x || imageShape?.x}
          clipY={cropedLayerSize?.y || imageShape?.y}
          clipWidth={cropedLayerSize?.width || imageShape?.width}
          clipHeight={cropedLayerSize?.height || imageShape?.height}
        >
          <ShapeList shapes={shapes} />
          {currentLine && <Line {...currentLine} />}
          <CropRect
            imageShape={cropedLayerSize || imageShape}
            isRender={imageShape && activeTool === "자르기"}
          />
        </Layer>
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
  max-width: 1440px;
  height: 704px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const CustomStage = styled(Stage)`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;
