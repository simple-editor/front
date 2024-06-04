import Canvas from "../components/canvas";
import Manager from "../components/manager";
import Button from "../components/shared/button";
import Header from "../components/shared/header";
import ToolBarItem from "../components/shared/toolbar-item";

const HomePage = () => {
  return (
    <div>
      <Button title="타이틀" size="small" />
      <ToolBarItem title="타이틀" />
      <Header />
      <Manager />
      <Canvas />
    </div>
  );
};

export default HomePage;
