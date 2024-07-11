import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ILineShape } from "../store/history-store.types";
const useMouseEventHandler = ({ shapes, setShapes, updateShape }: any) => {
  const [currentLine, setCurrentLine] = useState<ILineShape | null>(null);
  const { activeTool, line: lineTools } = useToolbarStore((state) => state);

  const isDrawingRef = useRef(false);
  const currentShapeRef = useRef<string>();

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!(activeTool === "그리기")) return;

    isDrawingRef.current = true;
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    const x = point?.x || 0;
    const y = point?.y || 0;
    const id = uuidv4();
    currentShapeRef.current = id;

    const { type, strokeColor, strokeWidthValue } = lineTools;

    const update: ILineShape = {
      id,
      type: "line",
      x: 0,
      y: 0,
      points: [x, y],
      stroke: type === "eraser" ? "white" : strokeColor,
      strokeWidth: strokeWidthValue,
    };
    setShapes([...shapes, update]);
    setCurrentLine(update);
  };
  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawingRef.current || !currentLine) return;
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    const x = point?.x || 0;
    const y = point?.y || 0;

    const updatedLine: ILineShape = {
      ...currentLine,
      points: [...currentLine!.points, x, y],
    };

    setCurrentLine(updatedLine);
  };

  const handleMouseUp = useCallback(() => {
    isDrawingRef.current = false;

    if (currentLine) {
      updateShape(currentLine);
      setCurrentLine(null);
    }
  }, [isDrawingRef.current, currentLine]);

  return { handleMouseDown, handleMouseMove, handleMouseUp, currentLine };
};

export default useMouseEventHandler;
