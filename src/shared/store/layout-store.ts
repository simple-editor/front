import { create } from "zustand";

interface State {
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const useLayoutStore = create<State>()((set) => ({
  width: 0,
  height: 0,
  setWidth: (width: number) => set({ width }),
  setHeight: (height: number) => set({ height }),
}));

export default useLayoutStore;
