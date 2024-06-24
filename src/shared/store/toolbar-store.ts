import { create } from "zustand";
type DrawAction = "그리기" | "텍스트" | "이모지" | "프레임" | "필터" | "자르기";
export interface IToolbar extends IPanel {
  activeTool: DrawAction | string;
  setActiveTool: (tool: DrawAction | string) => void;
  setPanels: <T extends DrawAction>(
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
  fontSizeTitle: string;
  fontSizeValue: number;
  strokeColor: string;
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
  setActiveTool: (tool) => set({ activeTool: tool }),
  panels: {
    그리기: {
      type: "pen",
      strokeWidthTitle: "Medium",
      strokeWidthValue: 4,
      strokeColor: "black",
    },
    텍스트: {
      fontSizeTitle: "Medium",
      fontSizeValue: 16,
      strokeColor: "#000000",
    },
  },

  setPanels: (tool: DrawAction, settings: Partial<ToolSettings>) =>
    set((state) => ({
      panels: {
        ...state.panels,
        [tool]: { ...state.panels[tool], ...settings },
      },
    })),
}));
export default useToolbarStore;
