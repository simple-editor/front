import { IShapeState } from "@/shared/store/canvas-ref.types";

export interface IShapeBase {
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}

export interface ICanvasLayerProps {
  shapes: IShapeState;
}
