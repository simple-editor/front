import { isKonvaNode } from "@/components/editor/type-guards";
import Konva from "konva";
import React, { useEffect } from "react";

export const useTransformer = <T extends Konva.Shape>({
  isSelected,
  shapeRef,
  transformerRef,
}: {
  isSelected?: boolean;
  shapeRef: React.RefObject<T>;
  transformerRef: React.RefObject<Konva.Transformer>;
}) => {
  const shape = shapeRef.current;
  const transfomrer = transformerRef.current;
  useEffect(() => {
    if (
      isSelected &&
      isKonvaNode(transfomrer, Konva.Transformer) &&
      isKonvaNode(shape, Konva.Shape)
    ) {
      const layer = transfomrer.getLayer();
      transfomrer.nodes([shape]);
      layer?.batchDraw();
    }
  }, [isSelected, shape, transfomrer]);
};
