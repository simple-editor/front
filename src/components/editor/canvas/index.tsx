import styled from "@emotion/styled";
import { Layer, Line, Stage } from "react-konva";
import { useRef } from "react";
import Konva from "konva";
import useHistoryStore from "@/shared/store/history-store";
import useSelectStore from "@/shared/store/select-store";
import CanvasLayer from "@/components/editor/canvas/canvas-layer";
import useMouseEventHandler from "@/shared/hooks/use-mouse-event-handler";
import useImageUpload from "@/shared/hooks/use-image-upload";
import useToolbarStore from "@/shared/store/toolbar-store";
import CropRect from "./crop-rect";
import useInitializeCrop from "@/shared/hooks/use-Initialize-crop";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const image = shapes.find((shapes) => shapes.type === "image");
  const clips = shapes.filter((shape) => shape.type === "crop");
  const clip = clips[clips.length - 1];

  const activeTool = useToolbarStore((state) => state.activeTool);
  const cancelSelection = useSelectStore((state) => state.cancelSelection);

  const { currentLine, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseEventHandler({ shapes, setShapes });

  const { handleDragUploadEnd, handleDragUploadStart } = useImageUpload({
    shapes,
    setShapes,
    stageRef,
  }); //이미지 드래그 업로드

  useInitializeCrop({ imageShape: image });

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
        onClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            cancelSelection();
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer
          ref={layerRef}
          clipX={clip?.x || image?.x}
          clipY={clip?.y || image?.y}
          clipWidth={clip?.width || image?.width}
          clipHeight={clip?.height || image?.height}
        >
          <CanvasLayer shapes={shapes} currentLine={currentLine} />
          {currentLine && <Line {...{ ...currentLine }} />}
          <CropRect
            imageBounds={clip || image}
            isRender={image && activeTool === "자르기"}
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
