import {
  ICropShape,
  IImageShape,
  IShape,
} from "@/shared/store/history-store.types";
import Konva from "konva";

export const isKonvaNode = <T extends Konva.Node>(
  node: Konva.Node | null,
  constructor: new (...args: any[]) => T
): node is T => {
  return node !== null && node instanceof constructor;
};

export const isImageShape = (shape: IShape): shape is IImageShape =>
  shape.type === "image";
export const isCropShape = (shape: IShape): shape is ICropShape =>
  shape.type === "crop";
