import { create } from "zustand";

interface IState {
  selectedId: string | null;
}

interface IAction {
  setSelectedId: (id: string) => void;
  cancelSelection: () => void;
}

const useSelectStore = create<IState & IAction>()((set) => ({
  selectedId: null,
  setSelectedId: (id: string) => set({ selectedId: id }),
  cancelSelection: () => set({ selectedId: null }),
}));

export default useSelectStore;
