import styled from "@emotion/styled";
import Button from "../../shared/ui/button";
import { Stage } from "react-konva";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import useHistoryStore from "@/shared/store/history-store";
import useFileUpload from "@/shared/hooks/use-file-upload";
import useSelectStore from "@/shared/store/select-store";
import CanvasLayer from "@/components/canvas/canvas-layer";
import useMouseEventHandler from "@/shared/hooks/use-mouse-event-handler";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const image = shapes.find((shape) => shape.type === "image");
  const cancelSelection = useSelectStore((state) => state.cancelSelection);

  const { currentLine, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseEventHandler({ shapes, setShapes });

  const { handleDragUploadEnd, handleDragUploadStart } = useFileUpload({
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
  useEffect(() => {
    const stage = stageRef.current;
    const layer = stage?.children[0];

    if (image && layer) {
      // 클립 영역 설정

      layer.clip({
        x: image.x as number,
        y: image.y as number,
        width: image.width as number,
        height: image.height as number,
      });
    }
  }, [image]);

  const handleDragEnd = (e) => {
    const shape = e.target;
    const { x, y, width, height } = shape.getClientRect();
    // 이미지 영역 밖으로 나갔는지 체크
    if (
      x < 0 ||
      y < 0 ||
      x + width > image.width ||
      y + height > image.height
    ) {
      // 투명화 처리
      shape.opacity(0);
    } else {
      // 원래 투명도로 복원
      shape.opacity(1);
    }
    shape.getLayer().batchDraw();
  };

  return (
    <CanvasWrapper
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
            cancelSelection();
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDragEnd={handleDragEnd}
      >
        <CanvasLayer
          shapes={shapes}
          handleChange={handleChange}
          currentLine={currentLine}
        />
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
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;
