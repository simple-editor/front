import Konva from "konva";
import { useState } from "react";

const useDrawing = () => {
  const [lines, setLines] = useState<Konva.ShapeConfig[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = () => setIsDrawing(true);
  const stopDrawing = () => setIsDrawing(false);

  const addLine = (line: Konva.ShapeConfig) => {
    setLines((prevLines) => [...prevLines, line]);
  };

  const updateLastLine = (point: Konva.LineConfig["points"]) => {
    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      const lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = lastLine.points.concat(point);
      return updatedLines;
    });
  };

  const handleDrawMouseDown = (
    tool: string,
    strokeColor: string,
    strokeWidth: number,
    event: any
  ) => {
    startDrawing();
    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    addLine({
      points: [point.x, point.y],
      stroke: tool === "eraser" ? "white" : strokeColor,
      strokeWidth: strokeWidth,
    });
  };

  const handleDrawMouseMove = (event: any) => {
    if (!isDrawing) return;

    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    updateLastLine([point.x, point.y]);
  };

  const handleDrawMouseUp = () => {
    stopDrawing();
  };

  return {
    lines,
    handleDrawMouseDown,
    handleDrawMouseMove,
    handleDrawMouseUp,
  };
};

export default useDrawing;
