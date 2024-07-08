import { isKonvaNode } from "@/components/editor/type-guards";
import useCanvasRefStore from "@/shared/store/canvas-ref-store";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";

const scaleBy = 1.02;

const useZoom = () => {
  const { stageRef } = useCanvasRefStore((state) => state);
  const [zoom, setZoom] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
  });

  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;

    if (isKonvaNode(stage, Konva.Stage)) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      if (!pointer) return;

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };
      const direction = e.evt.deltaY > 0 ? 1 : -1;
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      setZoom({
        stageScale: newScale,
        stageX: -(mousePointTo.x - pointer.x / newScale) * newScale,
        stageY: -(mousePointTo.y - pointer.y / newScale) * newScale,
      });
    }
  };
  return { handleZoom, zoom };
};

export default useZoom;
