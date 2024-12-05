import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useCallback } from "react";

const useCrop = () => {
  const { crop, setCropTools } = useToolbarStore((state) => state);

  const handleDragMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      setCropTools({ ...crop, x: e.target.x(), y: e.target.y() });
    },
    [crop, setCropTools]
  );

  const handleTransform = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);

      setCropTools({
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
      });
    },
    [setCropTools]
  );

  return {
    handleDragMove,
    handleTransform,
  };
};

export default useCrop;
