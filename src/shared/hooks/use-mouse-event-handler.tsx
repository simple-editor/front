import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ILineShape } from "../store/history-store.types";
const useMouseEventHandler = ({ shapes, setShapes }: any) => {
  const [currentLine, setCurrentLine] = useState<ILineShape | null>(null);
  const { activeTool, line: lineTools } = useToolbarStore((state) => state);

  const isDrawingRef = useRef(false);
  const currentShapeRef = useRef<string>();

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!(activeTool === "그리기")) return;

    const stage = event.target.getLayer();
    const point = stage?.getRelativePointerPosition();

    // Stage 밖인지 체크
    if (!point || point.x < 0 || point.y < 0) return;

    isDrawingRef.current = true;

    const { type, strokeColor, strokeWidthValue } = lineTools;
    const id = uuidv4();
    currentShapeRef.current = id;

    const update: ILineShape = {
      id,
      type: "line",
      x: 0,
      y: 0,
      points: [point.x, point.y],
      stroke: type === "eraser" ? "white" : strokeColor,
      strokeWidth: strokeWidthValue,
    };

    setCurrentLine(update);
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawingRef.current || !currentLine) return;

    const stage = event.target.getLayer();
    const point = stage?.getRelativePointerPosition();

    // Stage 밖인지 체크
    if (!point || point.x < 0 || point.y < 0) {
      isDrawingRef.current = false; // 드로잉 중지
      return;
    }

    const updatedLine: ILineShape = {
      ...currentLine,
      points: [...currentLine!.points, point.x, point.y],
    };

    setCurrentLine(updatedLine);
  };

  const handleMouseUp = useCallback(() => {
    isDrawingRef.current = false;

    if (currentLine) {
      setShapes([...shapes, currentLine]);
      setCurrentLine(null);
    }
  }, [currentLine, setShapes, shapes]);

  return { handleMouseDown, handleMouseMove, handleMouseUp, currentLine };
};

export default useMouseEventHandler;
