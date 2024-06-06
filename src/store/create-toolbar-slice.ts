import { StateCreator } from "zustand";

type TypeTool = "그리기" | "텍스트" | "이모티콘" | "프레임" | "필터" | "자르기";

export interface IToolbarSlice {
  activeTool: TypeTool;
  setActiveTool: (tool: TypeTool) => void;
}
export const createToolbarSlice: StateCreator<IToolbarSlice> = (set) => ({
  activeTool: "그리기", // 현재 활성화된 툴
  setActiveTool: (tool) => set({ activeTool: tool }),
});
