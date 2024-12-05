import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ILineShape } from "../store/history-store.types";
const useMouseEventHandler = ({ shapes, setShapes, updateShape }: any) => {
  const [currentLine, setCurrentLine] = useState<ILineShape | null>(null);
  const { activeTool, line: lineTools } = useToolbarStore((state) => state);

  const isDrawingRef = useRef(false);
  const currentShapeRef = useRef<string>();

  const handleMouseDown = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      if (!(activeTool === "그리기")) return;

      isDrawingRef.current = true;
      const stage = event.target.getLayer();
      const point = stage?.getRelativePointerPosition();
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
    },
    [activeTool, lineTools, setShapes, shapes]
  );
  const handleMouseMove = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawingRef.current || !currentLine) return;
      const stage = event.target.getLayer();
      const point = stage?.getRelativePointerPosition();
      const x = point?.x || 0;
      const y = point?.y || 0;

      const updatedLine: ILineShape = {
        ...currentLine,
        points: [...currentLine!.points, x, y],
      };

      setCurrentLine(updatedLine);
    },
    [currentLine]
  );

  const handleMouseUp = useCallback(() => {
    isDrawingRef.current = false;

    if (currentLine) {
      updateShape(currentLine);
      setCurrentLine(null);
    }
  }, [currentLine, updateShape]);

  const currentLineMemo = useMemo(() => {
    return currentLine;
  }, [currentLine]);

  return { handleMouseDown, handleMouseMove, handleMouseUp, currentLineMemo };
};

export default useMouseEventHandler;
