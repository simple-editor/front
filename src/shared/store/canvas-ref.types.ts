interface IBaseShape {
  id: string;
  type: "text" | "line" | "image" | "crop" | "emoji";
  x: number;
  y: number;
  draggable?: boolean;
}

// Specific shape types
export interface ITextShape extends IBaseShape {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily?: string;
  fill?: string;
  width?: number;
  height?: number;
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
  src: string;
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

// Type guards
export const isTextShape = (shape: IShape): shape is ITextShape =>
  shape.type === "text";
export const isLineShape = (shape: IShape): shape is ILineShape =>
  shape.type === "line";
export const isImageShape = (shape: IShape): shape is IImageShape =>
  shape.type === "image";
export const isCropShape = (shape: IShape): shape is ICropShape =>
  shape.type === "crop";
