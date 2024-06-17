import styled from "@emotion/styled";
import Button from "../../shared/ui/button";
import { Stage, Layer, Group, Line } from "react-konva";
import { useRef, useState } from "react";
import Konva from "konva";
import useDrawing from "@/shared/hooks/use-dwaring";
import TransformableImage from "@/components/canvas/transformerble-image";
import { v4 as uuidv4 } from "uuid";
import useHistoryStore from "@/shared/store/history-store";
import DrawingLayer from "@/components/canvas/drawing-layer";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const groupRef = useRef(null); // 그룹 참조를 위한 ref
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const inputRef = useRef(null);
  const { onDrawStart, onDrawiong, onDrawEnd, currentLine } = useDrawing(
    shapes,
    setShapes
  );

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (event.target === stageRef.current) {
      setSelectedId(null);
    }
    onDrawStart(event);
  };
  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    onDrawiong(event);
  };

  const handleMouseUp = () => {
    onDrawEnd();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const newImage = {
        id: uuidv4(),
        type: "image",
        src: url,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
      };
      setShapes([...shapes, newImage]);
    }
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
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;

      img.onload = () => {
        const stage = stageRef.current;
        const stageWidth = stage.width();
        const stageHeight = stage.height();
        const aspectRatio = img.width / img.height;

        let newWidth, newHeight;
        if (stageWidth / stageHeight > aspectRatio) {
          newHeight = stageHeight;
          newWidth = stageHeight * aspectRatio;
        } else {
          newWidth = stageWidth;
          newHeight = stageWidth / aspectRatio;
        }

        const x = (stageWidth - newWidth) / 2;
        const y = (stageHeight - newHeight) / 2;

        const newImage = {
          id: uuidv4(),
          type: "image",
          src: url,
          x,
          y,
          width: newWidth,
          height: newHeight,
        };
        setShapes([...shapes, newImage]);
      };
    }
  };

  return (
    <WorkAreaContainer onDragOver={handleDragOver} onDrop={handleDrop}>
      {shapes.length === 0 && (
        <Box>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <CustomButton
            size="large"
            title="JPG 또는 JPGE 이미지 불러오기"
            onClick={() => inputRef.current.click()}
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
          <Group draggable ref={groupRef}>
            {shapes.map((shape) => {
              switch (shape.type) {
                case "image":
                  return (
                    <TransformableImage
                      key={shape.id}
                      image={shape}
                      isSelected={shape.id === selectedId}
                      onSelect={() => handleSelect(shape.id)}
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
