import { create } from "zustand";
type TypeTool = "그리기" | "텍스트" | "이모지" | "프레임" | "필터" | "자르기";
export interface IToolbar extends IPanel {
  activeTool: TypeTool | string;
  setActiveTool: (tool: TypeTool) => void;
  setPanels: <T extends TypeTool>(
    tool: T,
    settings: Partial<IPanel["panels"][T]>
  ) => void;
}

interface ILineTools {
  type: string;
  strokeWidthTitle: string;
  strokeWidthValue: number;
  strokeColor: string;
}

interface ITextTools {
  fontSize: number;
  color: string;
}

export interface IPanel {
  panels: {
    그리기: ILineTools;
    텍스트: ITextTools;
    이모지?: object;
    프레임?: object;
    필터?: object;
    자르기?: object;
  };
}

type ToolSettings = ILineTools | ITextTools;

const useToolbarStore = create<IToolbar>()((set) => ({
  activeTool: "그리기",
  setActiveTool: (tool: TypeTool) => set({ activeTool: tool }),
  panels: {
    그리기: {
      type: "pen",
      strokeWidthTitle: "Medium",
      strokeWidthValue: 4,
      strokeColor: "black",
    },
    텍스트: { fontSize: 16, color: "#000000" },
  },

  setPanels: (tool: TypeTool, settings: Partial<ToolSettings>) =>
    set((state) => ({
      panels: {
        ...state.panels,
        [tool]: { ...state.panels[tool], ...settings },
      },
    })),
}));
export default useToolbarStore;
