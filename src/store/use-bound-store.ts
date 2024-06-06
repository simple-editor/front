import { create } from "zustand";
import { IToolbarSlice, createToolbarSlice } from "./create-toolbar-slice";

export const useBoundStore = create<IToolbarSlice>((...a) => ({
  ...createToolbarSlice(...a),
}));
