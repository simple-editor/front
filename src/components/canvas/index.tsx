import styled from "@emotion/styled";
import { Layer, Line, Stage } from "react-konva";
import { useEffect, useRef } from "react";
import Konva from "konva";
import useHistoryStore from "@/shared/store/history-store";
import useSelectStore from "@/shared/store/select-store";
import CanvasLayer from "@/components/canvas/canvas-layer";
import useMouseEventHandler from "@/shared/hooks/use-mouse-event-handler";
import useImageUpload from "@/shared/hooks/use-image-upload";
import useToolbarStore from "@/shared/store/toolbar-store";
import CropRect from "./crop-rect";
import useCrop from "@/shared/hooks/use-crop";
import { v4 as uuidv4 } from "uuid";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const { shapes, setShapes, updateShape } = useHistoryStore((state) => state);
  const image = shapes.find((shapes) => shapes.type === "image");
  const clips = shapes.filter((shape) => shape.type === "crop");
  const clip = clips[clips.length - 1];

  const activeTool = useToolbarStore((state) => state.activeTool);
  const cancelSelection = useSelectStore((state) => state.cancelSelection);

  const { crop, setCropTools } = useCrop({ imageShape: image });

  const { currentLine, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseEventHandler({ shapes, setShapes });

  const { handleDragUploadEnd, handleDragUploadStart } = useImageUpload({
    shapes,
    setShapes,
    stageRef,
  }); //이미지 드래그 업로드

  const handleChange = (newImage: Konva.ShapeConfig) => {
    const find = shapes.map((shape) => {
      if (shape.id === newImage.id) {
        return newImage;
      } else {
        return shape;
      }
    });

    setShapes(find);
  };

  const handleDoubleClick = () => {
    if (crop && image) {
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
          clipX={clip?.x}
          clipY={clip?.y}
          clipWidth={clip?.width}
          clipHeight={clip?.height}
        >
          <CanvasLayer
            shapes={shapes}
            handleChange={handleChange}
            currentLine={currentLine}
          />
          {currentLine && <Line {...{ ...currentLine }} />}
          {image && activeTool === "자르기" && (
            <CropRect
              crop={crop}
              imageBounds={clip || image}
              onChange={(newCrop) => setCropTools(newCrop)}
              onClick={handleDoubleClick}
            />
          )}
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
