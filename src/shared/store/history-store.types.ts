import { TextConfig } from "konva/lib/shapes/Text";

interface IBaseShape {
  id: string;
  type: "text" | "line" | "image" | "crop" | "emoji";
  x: number;
  y: number;
  draggable?: boolean;
}

export interface ITextShape extends TextConfig {
  type: "text";
}

export interface ILineShape extends IBaseShape {
  type: "line";
  points: number[];
  stroke: string;
  strokeWidth: number;
}

export interface IImageShape extends IBaseShape {
  type: "image";
  width: number;
  height: number;
}

export interface ICropShape extends IBaseShape {
  type: "crop";
  width: number;
  height: number;
}

export interface IEmojiShape extends IBaseShape {
  type: "emoji";
  text: string;
  fontSize: number;
}

// Union type for all shapes
export type IShape =
  | ITextShape
  | ILineShape
  | IImageShape
  | ICropShape
  | IEmojiShape;

export type IShapeState = IShape[];
