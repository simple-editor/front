import styled from "@emotion/styled";
import Button from "../../shared/ui/button";
import { Stage, Layer, Group, Line } from "react-konva";
import { useRef, useState } from "react";
import Konva from "konva";
import useDrawing from "@/shared/hooks/use-dwaring";
import TransformableImage from "@/components/canvas/transformerble-image";
import useHistoryStore from "@/shared/store/history-store";
import DrawingLayer from "@/components/canvas/drawing-layer";
import useToolbarStore from "@/shared/store/toolbar-store";
import useFileUpload from "@/shared/hooks/use-file-upload";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const groupRef = useRef(null); // 그룹 참조를 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const activeTool = useToolbarStore((state) => state.activeTool);
  
  const { onDrawStart, onDrawiong, onDrawEnd, currentLine } = useDrawing(
    shapes,
    setShapes
  );

  const { handleDragUploadEnd, handleDragUploadStart } = useFileUpload({
    shapes,
    setShapes,
    stageRef,
  }); //이미지 드래그 업로드

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (event.target === stageRef.current) {
      setSelectedId(null);
    }

    if (activeTool === "그리기") onDrawStart(event);
  };
  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === "그리기") onDrawiong(event);
  };

  const handleMouseUp = () => {
    if (activeTool === "그리기") onDrawEnd();
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };
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

  return (
    <WorkAreaContainer
      onDragOver={handleDragUploadStart}
      onDrop={handleDragUploadEnd}
    >
      {shapes.length === 0 && (
        <Box>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
          />

          <CustomButton
            size="large"
            title="JPG 또는 JPGE 이미지 불러오기"
            onClick={() => inputRef.current!.click()}
          />
          <Description>또는 여기로 끌어놓기</Description>
        </Box>
      )}

      <Stage
        ref={stageRef}
        width={1440}
        height={704}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Group ref={groupRef}>
            {shapes.map((shape) => {
              switch (shape.type) {
                case "image":
                  return (
                    <TransformableImage
                      key={shape.id}
                      image={shape}
                      isSelected={shape.id === selectedId}
                      onSelect={() => handleSelect(String(shape.id))}
                      onChange={handleChange}
                    />
                  );
                case "circle":
                  return null;
                case "line":
                  return <DrawingLayer line={shape} key={shape.id} />;
                case "text":
                  return null;
                // 다른 shape 타입도 추가 가능
                default:
                  return null;
              }
            })}
            {currentLine && <Line {...{ ...currentLine }} />}
          </Group>
        </Layer>
      </Stage>
    </WorkAreaContainer>
  );
};

export default Canvas;
const WorkAreaContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray10};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 8px;
  max-width: 1440px;
  height: 704px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Description = styled.p`
  ${({ theme }) => theme.textStyles.p};
  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;
`;

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const CustomButton = styled(Button)``;
