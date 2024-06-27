import {
  ICropShape,
  IImageShape,
  ILineShape,
  IShape,
  ITextShape,
} from "./history-store";

// Type guards
export const isTextShape = (shape: IShape): shape is ITextShape =>
  shape.type === "text";
export const isLineShape = (shape: IShape): shape is ILineShape =>
  shape.type === "line";
export const isImageShape = (shape: IShape): shape is IImageShape =>
  shape.type === "image";
export const isCropShape = (shape: IShape): shape is ICropShape =>
  shape.type === "crop";
