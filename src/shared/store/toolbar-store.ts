import { create } from "zustand";
type TypeTool = "그리기" | "텍스트" | "이모지" | "프레임" | "필터" | "자르기";
export interface IToolbar extends IPanel {
  activeTool: TypeTool | string;
  setActiveTool: (tool: TypeTool) => void;
}

export interface IPanel {
  toolSettings: {
    그리기: { type: string; strokeWidth: number; stroke: string };
    텍스트: { fontSize: number; stroke: string };
    이모지?: object;
    프레임?: object;
    필터?: object;
    자르기?: object;
  };
}

const useToolbarStore = create<IToolbar>()((set) => ({
  activeTool: "draw",
  setActiveTool: (tool: TypeTool) => set({ activeTool: tool }),
  toolSettings: {
    그리기: { type: "pen", strokeWidth: 2, stroke: "black" },
    텍스트: { fontSize: 16, stroke: "#000000" },
  },
  setToolSettings: (tool: TypeTool, settings: IPanel) =>
    set((state) => ({
      toolSettings: {
        ...state.toolSettings,
        [tool]: { ...state.toolSettings[tool], ...settings },
      },
    })),
}));
export default useToolbarStore;
