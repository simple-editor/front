import useHistoryStore from "@/shared/store/history-store";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { RefObject } from "node_modules/@types/react";
import { Transformer } from "node_modules/konva/lib/shapes/Transformer";
import { v4 as uuidv4 } from "uuid";

const useCrop = (trRef: RefObject<Transformer>, imageShape: any) => {
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const { crop, setCropTools } = useToolbarStore((state) => state);
  const updateLayerClip = (
    layer: Konva.Layer | null,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    if (layer) {
      layer.clip({
        x,
        y,
        width,
        height,
      });
      layer.batchDraw(); // 즉시 렌더링
    }
  };

  const handleDblClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    //자르기 조건은 transformer가 활성화 된 상태에서만 발동해야함
    if (!trRef.current || trRef.current.nodes().length === 0) return;
    const target = e.target; // 더블 클릭된 객체
    const layer = target.getLayer(); // 부모 Layer 가져오기
    const { x, y, width, height } = crop;
    if (crop && imageShape) {
      const newShape = {
        id: uuidv4(),
        type: "crop" as const,
        ...crop,
      };
      setCropTools({
        width: crop.width / 2,
        height: crop.height / 2,
      });
      setShapes([...shapes, newShape]);
    }
    updateLayerClip(layer, x, y, width, height);
  };

  const handleDragMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const target = e.target; // 드래그된 객체

    const x = target.x();
    const y = target.y();
    setCropTools({ ...crop, x, y });
  };

  const handleTransform = (e: Konva.KonvaEventObject<MouseEvent>) => {
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
  };

  return {
    handleDragMove,
    handleDblClick,
    handleTransform,
  };
};

export default useCrop;
