import { create } from "zustand";

export type DrawAction =
  | "그리기"
  | "텍스트"
  | "이모지"
  | "프레임"
  | "필터"
  | "자르기"
  | "";

interface ILineTools {
  type: string;
  strokeWidthTitle: string;
  strokeWidthValue: number;
  strokeColor: string;
}

interface ITextTools {
  fontSizeTitle: string;
  fontSizeValue: number;
  strokeColor: string;
  fontFamily: string;
  textAlign: "left" | "center" | "right";
  fontStyle: "normal" | "bold" | "italic";
}

interface ICrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IFilter {
  filterTitle: string;
}

interface IToolbar {
  activeTool: DrawAction;
  setActiveTool: (tool: DrawAction) => void;
  line: ILineTools;
  text: ITextTools;
  crop: ICrop;
  filter: IFilter;
  setLineTools: (settings: Partial<ILineTools>) => void;
  setTextTools: (settings: Partial<ITextTools>) => void;
  setCropTools: (settings: Partial<ICrop>) => void;
  setFilterTools: (settings: Partial<IFilter>) => void;
}

const useToolbarStore = create<IToolbar>()((set) => ({
  activeTool: "",
  setActiveTool: (tool) => set({ activeTool: tool }),
  line: {
    type: "pen",
    strokeWidthTitle: "M",
    strokeWidthValue: 2,
    strokeColor: "#2563eb",
  },
  text: {
    fontSizeTitle: "Large",
    fontSizeValue: 48,
    strokeColor: "#000000",
    fontFamily: "Roboto",
    textAlign: "left",
    fontStyle: "normal",
  },
  crop: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  filter: {
    filterTitle: "default",
  },
  setLineTools: (settings) =>
    set((state) => ({ line: { ...state.line, ...settings } })),
  setTextTools: (settings) =>
    set((state) => ({ text: { ...state.text, ...settings } })),
  setCropTools: (settings) =>
    set((state) => ({ crop: { ...state.crop, ...settings } })),

  setFilterTools: (settings) =>
    set((state) => ({ filter: { ...state.filter, ...settings } })),
}));

export default useToolbarStore;
