import { IShapeBase } from "@/components/editor/canvas/types";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ILineShape } from "@/shared/store/canvas-ref.types";
const useMouseEventHandler = ({ shapes, setShapes }: IShapeBase) => {
  const [currentLine, setCurrentLine] = useState<ILineShape | null>(null);
  const { activeTool, line: lineTools } = useToolbarStore((state) => state);

  const isPaintRef = useRef(false);
  const currentShapeRef = useRef<string>();

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isPaintRef.current = true;
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    const x = point?.x || 0;
    const y = point?.y || 0;
    const id = uuidv4();
    currentShapeRef.current = id;

    const { type, strokeColor, strokeWidthValue } = lineTools;
    switch (activeTool) {
      case "그리기": {
        const update: ILineShape = {
          id,
          type: "line",
          x: 0,
          y: 0,
          points: [x, y],
          stroke: type === "eraser" ? "white" : strokeColor,
          strokeWidth: strokeWidthValue,
        };
        setCurrentLine(update);
      }
    }

    // if (activeTool === "그리기") handleDrawStart(event);
  };
  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // if (activeTool === "그리기") handleDrawiong(event);
    if (!isPaintRef.current) return;
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    const x = point?.x || 0;
    const y = point?.y || 0;
    const id = currentShapeRef.current;
    if (id && currentLine)
      switch (activeTool) {
        case "그리기": {
          const updatedLine: ILineShape = {
            ...currentLine,
            id,
            points: [...currentLine!.points, x, y],
          };
          setCurrentLine(updatedLine);
        }
      }
  };

  const handleMouseUp = useCallback(() => {
    isPaintRef.current = false;

    if (currentLine) setShapes([...shapes, currentLine]);
  }, [currentLine, setShapes, shapes]);

  return { handleMouseDown, handleMouseMove, handleMouseUp, currentLine };
};

export default useMouseEventHandler;
