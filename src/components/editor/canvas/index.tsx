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
import useLayoutResize from "./use-layout-resize";

const Canvas = () => {
  const { layerRef, stageRef } = useCanvasRefStore((state) => state);
  const { shapes, setShapes, updateShape } = useHistoryStore((state) => state);
  const { currentLineMemo, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseEventHandler({ shapes, setShapes, updateShape });
  const activeTool = useToolbarStore((state) => state.activeTool);
  const { cancelSelection, selectedId } = useSelectStore((state) => state);
  // 선 그리기

  //줌
  const { handleZoom, zoom } = useZoom();
  // 이미지 업로드
  const { handleDragUploadEnd, handleDragUploadStart, handleButtonUpload } =
    useImageUpload({
      shapes,
      setShapes,
    });
  // 이미지 위치 조정
  const { currentLayerSize, imageShape } = useInitializeCropPos({ shapes });
  // 키보드 액션
  useKeybordAction({ selectedId, cancelSelection });

  //캔버스 반응형 레이아웃 조정
  const { width, height, parentRef } = useLayoutResize();

  const groupX = (width - imageShape?.width) / 2 || 0;
  const groupY = (height - imageShape?.height) / 2 || 0;

  return (
    <CanvasWrapper
      onDragOver={handleDragUploadStart}
      onDrop={handleDragUploadEnd}
      ref={parentRef}
    >
      {!imageShape && (
        <ImageUploadButton style={{}}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleButtonUpload}
          />
        </ImageUploadButton>
      )}
      <CustomStage
        id="stage"
        ref={stageRef}
        width={width}
        height={height}
        scaleX={zoom.stageScale}
        scaleY={zoom.stageScale}
        x={zoom.stageX}
        y={zoom.stageY}
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
            x={groupX}
            y={groupY}
            width={imageShape.width || 0}
            height={imageShape.height || 0}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            clipFunc={
              currentLayerSize
                ? (ctx) => {
                    ctx.rect(
                      currentLayerSize.x,
                      currentLayerSize.y,
                      currentLayerSize.width,
                      currentLayerSize.height
                    );
                    ctx.clip();
                  }
                : undefined
            }
          >
            <ShapeList shapes={shapes} />

            <CropRect
              imageShape={imageShape}
              isRender={imageShape && activeTool === "자르기"}
            />
            {currentLineMemo && <Line {...currentLineMemo} />}
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

const ImageUploadButton = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: inline-flex;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  height: 48px;
  z-index: 10;
`;
