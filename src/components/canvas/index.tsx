import styled from "@emotion/styled";
import Button from "../../shared/ui/button";
import { Stage, Layer } from "react-konva";
import { useRef } from "react";
import DrawingLayer from "@/components/canvas/drawing-layer";

import Konva from "konva";
import useDrawing from "@/shared/hooks/use-dwaring";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const { handleDrawMouseDown, handleDrawMouseMove, handleDrawMouseUp, lines } =
    useDrawing();

  const handleMouseDown = (event: any) => {
    handleDrawMouseDown("pen", "black", 5, event);
  };
  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    handleDrawMouseMove(event);
  };

  const handleMouseUp = () => {
    handleDrawMouseUp();
  };

  return (
    <WorkAreaContainer>
      <Box>
        <Button size="large" title="JPG 또는 JPGE 이미지 불러오기" />
        <Description>또는 여기로 끌어놓기</Description>
      </Box>
      <Stage
        ref={stageRef}
        width={1440}
        height={704}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <DrawingLayer lines={lines} />
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
`;
