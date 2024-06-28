import { IShapeState } from "@/shared/store/history-store.types";

export interface IShapeBase {
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}

export interface ICanvasLayerProps {
  shapes: IShapeState;
}
