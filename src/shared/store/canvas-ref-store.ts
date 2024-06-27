import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { createRef } from "react";
import { create } from "zustand";

interface IState {
  stageRef: React.RefObject<Stage>;
  layerRef: React.RefObject<Layer>;
}

const useCanvasRefStore = create<IState>()(() => ({
  stageRef: createRef<Stage>(),
  layerRef: createRef<Layer>(),
}));

export default useCanvasRefStore;
