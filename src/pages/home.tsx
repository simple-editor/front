import styled from "@emotion/styled";
import Canvas from "../components/canvas";
import Manager from "../components/manager";
import Toolbar from "../components/toolbar";
import Panel from "../components/panel/indext";

const HomePage = () => {
  return (
    <Main>
      <Toolbar />
      <Manager />
      <Canvas />
      <Panel />
    </Main>
  );
};

export default HomePage;

const Main = styled.main`
  position: relative;
`;
