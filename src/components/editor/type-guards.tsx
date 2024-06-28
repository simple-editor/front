import Konva from "konva";

export const isKonvaNode = (node: Konva.Node | null): node is Konva.Node => {
  return node !== null && node instanceof Konva.Node;
};

export const isKonvaLayer = (
  layer: Konva.Layer | null
): layer is Konva.Layer => {
  return layer !== null && layer instanceof Konva.Layer;
};

export const isKonvaTransformer = (
  transformer: Konva.Transformer | null
): transformer is Konva.Transformer => {
  return transformer !== null && transformer instanceof Konva.Transformer;
};

export const isKonvaRect = (rect: Konva.Rect | null): rect is Konva.Rect => {
  return rect !== null && rect instanceof Konva.Rect;
};
