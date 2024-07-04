import Canvas from "@/components/editor/canvas";
import Manager from "@/components/editor/manager";
import Toolbar from "@/components/editor/toolbar";
import Panel from "@/components/editor/panel/indext";
import { useEffect } from "react";
import useHistoryStore from "@/shared/store/history-store";
import {
  initializeIndexedDB,
  loadFromLocalStorage,
} from "@/shared/services/storage";

const Editor = () => {
  useEffect(() => {
    initializeIndexedDB().then((db) => {
      const localShapes = loadFromLocalStorage("simple-shapes");

      useHistoryStore.setState({
        shapes: localShapes,
        history: [],
        future: [],
      });
    });
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
