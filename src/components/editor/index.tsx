import Canvas from "@/components/editor/canvas";
import Manager from "@/components/editor/manager";
import Toolbar from "@/components/editor/toolbar";
import Panel from "@/components/editor/panel/indext";

const Editor = () => {
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
