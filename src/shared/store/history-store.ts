import {
  resetIndexedDB,
  resetLocalStorage,
  saveToLocalStorage,
} from "../services/storage";
import { IShape } from "./history-store.types";
import { IShapeState } from "./history-store.types";
import { create } from "zustand";

interface IHistoryState {
  shapes: IShapeState;
  history: IShapeState[];
  future: IShapeState[];
}

interface IHistoryAction {
  setShapes: (newShapes: IShapeState) => void;
  updateShape: (updatedShape: IShape) => void;
  deleteShape: (deleteShapeId: string) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
}

const useHistoryStore = create<IHistoryState & IHistoryAction>()((set) => ({
  shapes: [],
  history: [],
  future: [],

  setShapes: (newShapes: IShape[]) => {
    set((state) => {
      const newHistory = [...state.history, state.shapes];
      const newState = { shapes: newShapes, history: newHistory, future: [] };
      saveToLocalStorage("simple-shapes", newShapes);
      return newState;
    });
  },

  updateShape: (updatedShape: IShape) => {
    set((state) => {
      const newShapes = state.shapes.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      );
      const newHistory = [...state.history, state.shapes];
      const newState = { shapes: newShapes, history: newHistory, future: [] };
      saveToLocalStorage("simple-shapes", newShapes);
      return newState;
    });
  },

  deleteShape: (deleteShapeId: string) => {
    set((state) => {
      const newShapes = state.shapes.filter(
        (shape) => shape.id !== deleteShapeId
      );

      const newHistory = [...state.history];
      const newState = { shapes: newShapes, history: newHistory, future: [] };
      saveToLocalStorage("simple-shapes", newShapes);
      return newState;
    });
  },

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const prevState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      const newFuture = [state.shapes, ...state.future];
      saveToLocalStorage("simple-shapes", prevState);
      return { shapes: prevState, history: newHistory, future: newFuture };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const nextState = state.future[0];
      const newFutrue = state.future.slice(1); //1부터 끝까지 자른다.
      const newHistroy = [...state.history, state.shapes];
      saveToLocalStorage("simple-shapes", nextState);
      return { shapes: nextState, history: newHistroy, future: newFutrue };
    }),

  reset: async () => {
    resetLocalStorage();
    await resetIndexedDB();
    set(() => ({ shapes: [], history: [], future: [] }));
  },
}));
export default useHistoryStore;
