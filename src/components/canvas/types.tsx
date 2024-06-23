import { IShapeState } from "@/shared/store/history-store";

export interface IShapeBase {
  shapes: IShapeState;
  setShapes: (state: IShapeState) => void;
}
