import Canvas from "@/components/editor/canvas";
import Manager from "@/components/editor/manager";
import Toolbar from "@/components/editor/toolbar";
import Panel from "@/components/editor/panel/indext";
import { useEffect } from "react";
import useHistoryStore from "@/shared/store/history-store";
import { loadFromLocalStorage } from "@/shared/services/storage";
import styled from "@emotion/styled";
import Upload from "./upload";

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
    <Main id="main">
      <Upload />
      <Body>
        <Manager />
        <Toolbar />
        <Canvas />
      </Body>
      <Panel />
    </Main>
  );
};

export default Editor;

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: 90rem;
  max-height: 50rem;
  min-height: 44rem;
  margin: auto;
`;

const Body = styled.section`
  display: grid;
  position: relative;
  grid-template-columns: 6em auto;
  grid-template-rows: min-content auto;
  @media (max-width: 624px) {
    display: none;
  }
`;
