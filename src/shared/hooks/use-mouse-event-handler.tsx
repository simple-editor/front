import { IShapeBase } from "@/components/canvas/types";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const useMouseEventHandler = ({ shapes, setShapes }: IShapeBase) => {
  const [currentLine, setCurrentLine] = useState<Konva.ShapeConfig | null>(
    null
  );
  const { activeTool, panels } = useToolbarStore((state) => state);

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

    const drawType = panels.그리기.type;
    switch (activeTool) {
      case "그리기": {
        const update = {
          id,
          type: "line",
          x: 0,
          y: 0,
          points: [x, y],
          stroke: drawType === "eraser" ? "white" : panels.그리기.strokeColor,
          strokeWidth: panels.그리기.strokeWidthValue,
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

    switch (activeTool) {
      case "그리기": {
        const updatedLine = {
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