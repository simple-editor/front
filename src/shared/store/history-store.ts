import { IShape } from "./canvas-ref.types";
import { IShapeState } from "@/shared/store/canvas-ref.types";
import { create } from "zustand";

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
