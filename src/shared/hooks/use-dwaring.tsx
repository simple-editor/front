import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IShapeBase } from "@/components/canvas/types";

const useDrawing = ({ shapes, setShapes }: IShapeBase) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<Konva.ShapeConfig | null>(
    null
  );
  const { panels } = useToolbarStore((state) => state);

  const startDrawing = () => setIsDrawing(true);
  const stopDrawing = () => setIsDrawing(false);

  const handleDrawStart = (event: Konva.KonvaEventObject<MouseEvent>) => {
    startDrawing();
    const stage = event.target.getStage();

    const point = stage!.getPointerPosition();
    const update = {
      id: uuidv4(),
      type: "line",
      x: 0,
      y: 0,
      points: [point!.x, point!.y],
      stroke:
        panels.그리기.type === "eraser" ? "white" : panels.그리기.strokeColor,
      strokeWidth: panels.그리기.strokeWidthValue,
    };
    setCurrentLine(update);
  };

  const handleDrawiong = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = event.target.getStage();
    const point = stage!.getPointerPosition();
    const updatedLine = {
      ...currentLine,
      points: [...currentLine!.points, point!.x, point!.y],
    };
    setCurrentLine(updatedLine);
  };

  const handleDrawEnd = () => {
    stopDrawing();
    if (currentLine) {
      setShapes([...shapes, currentLine]);
      setCurrentLine(null);
    }
  };

  return {
    currentLine,
    handleDrawStart,
    handleDrawEnd,
    handleDrawiong,
  };
};

export default useDrawing;
