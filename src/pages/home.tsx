import Canvas from "../components/canvas";
import Manager from "../components/manager";
import Button from "../components/shared/button";
import Header from "../components/shared/header";
import SideBar from "../components/sidebar";

const HomePage = () => {
  return (
    <div>
      <Button title="타이틀" size="small" />
      <SideBar />
      <Header />
      <Manager />
      <Canvas />
    </div>
  );
};

export default HomePage;
