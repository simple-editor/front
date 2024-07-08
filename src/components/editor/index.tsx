import Canvas from "@/components/editor/canvas";
import Manager from "@/components/editor/manager";
import Toolbar from "@/components/editor/toolbar";
import Panel from "@/components/editor/panel/indext";
import { useEffect } from "react";
import useHistoryStore from "@/shared/store/history-store";
import { loadFromLocalStorage } from "@/shared/services/storage";

const Editor = () => {
  useEffect(() => {
    const localShapes = loadFromLocalStorage("simple-shapes");
    if (localShapes) {
      useHistoryStore.setState({
        shapes: localShapes,
        history: [],
        future: [],
      });
    } else return;
  }, []);

  return (
    <>
      <Toolbar />
      <Manager />
      <Canvas />
      <Panel />
    </>
  );
};

export default Editor;
