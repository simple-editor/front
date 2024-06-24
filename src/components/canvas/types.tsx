import { IShapeState } from "@/shared/store/history-store";
import Konva from "konva";

export interface IShapeBase {
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}

export interface ICanvasLayerProps {
  shapes: IShapeState;
  currentLine: Konva.ShapeConfig | null;
  handleChange: (newImage: Konva.ShapeConfig) => void;
}
