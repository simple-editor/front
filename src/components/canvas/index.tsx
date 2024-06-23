import styled from "@emotion/styled";
import Button from "../../shared/ui/button";
import { Stage, Layer, Group, Line } from "react-konva";
import { useRef, useState } from "react";
import Konva from "konva";
import useDrawing from "@/shared/hooks/use-dwaring";
import TransformableImage from "@/components/canvas/transformerble-image";
import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import useFileUpload from "@/shared/hooks/use-file-upload";
import EditableText from "@/components/canvas/editable-text";
import FreeDrawing from "@/components/canvas/free-drawing";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const groupRef = useRef(null); // 그룹 참조를 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);
  const activeTool = useToolbarStore((state) => state.activeTool);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { shapes, setShapes, updateShape } = useHistoryStore((state) => state);

  const { handleDrawStart, handleDrawEnd, handleDrawiong, currentLine } =
    useDrawing({
      shapes,
      setShapes,
    });

  const { handleDragUploadEnd, handleDragUploadStart } = useFileUpload({
    shapes,
    setShapes,
    stageRef,
  }); //이미지 드래그 업로드

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (event.target === stageRef.current) {
      setSelectedId(null);
    }

    if (activeTool === "그리기") handleDrawStart(event);
  };
  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === "그리기") handleDrawiong(event);
  };

  const handleMouseUp = () => {
    if (activeTool === "그리기") handleDrawEnd();
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

      <CustomStage
        id="stage"
        ref={stageRef}
        width={1440}
        height={704}
        onClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            setSelectedId(null);
          }
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
                  return <FreeDrawing line={shape} key={shape.id} />;
                case "text":
                  return (
                    <EditableText
                      shape={shape}
                      updateShape={updateShape}
                      isSelected={shape.id === selectedId}
                      onSelect={handleSelect}
                    />
                  );
                // 다른 shape 타입도 추가 가능
                default:
                  return null;
              }
            })}
            {currentLine && <Line {...{ ...currentLine }} />}
          </Group>
        </Layer>
      </CustomStage>
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

const CustomStage = styled(Stage)`
  position: "absolute";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
