import { create } from "zustand";

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

interface IHistoryState {
  shapes: IShapeState;
  history: IShapeState[];
  future: IShapeState[];
}

interface IHistoryAction {
  setShapes: (newShapes: IShapeState) => void;
  updateShape: (updatedShape: IShape) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
}

const useHistoryStore = create<IHistoryState & IHistoryAction>()((set) => ({
  shapes: [],
  history: [],
  future: [],

  setShapes: (newShapes: IShapeState) =>
    set((state) => {
      const newHistroy = [...state.history, state.shapes];
      return { shapes: newShapes, history: newHistroy, future: [] };
    }),

  updateShape: (updatedShape: IShape) =>
    set((state) => {
      const newShapes = state.shapes.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      );
      const newHistory = [...state.history, state.shapes];
      return { shapes: newShapes, history: newHistory, future: [] };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const prevState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      const newFuture = [state.shapes, ...state.future];

      return { shapes: prevState, history: newHistory, future: newFuture };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const nextState = state.future[0];
      const newFutrue = state.future.slice(1); //1부터 끝까지 자른다.
      const newHistroy = [...state.history, state.shapes];

      return { shapes: nextState, history: newHistroy, future: newFutrue };
    }),

  reset: () => set(() => ({ shapes: [], history: [], future: [] })),
}));
export default useHistoryStore;
