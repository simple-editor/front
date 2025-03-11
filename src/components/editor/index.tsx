import Canvas from "@/components/editor/canvas";
import Manager from "@/components/editor/manager";
import Toolbar from "@/components/editor/toolbar";
import Panel from "@/components/editor/panel/indext";
import { useEffect } from "react";
import useHistoryStore from "@/shared/store/history-store";
import { loadFromLocalStorage } from "@/shared/services/storage";
import styled from "@emotion/styled";
import Upload from "./upload";
import MobileCanvas from "./mobile/mobile-canvas";
import useViewport from "@/shared/hooks/use-viewport";

const Editor = () => {
  const { isMobile } = useViewport();
  const localShapes = loadFromLocalStorage("simple-shapes");

  useEffect(() => {
    if (localShapes) {
      useHistoryStore.setState({
        shapes: localShapes,
        history: [],
        future: [],
      });
    }
  }, [localShapes]);

  return (
    <Main id="main" isMobile={isMobile}>
      <Upload />

      {isMobile ? (
        <MobileWrapper>
          <MobileCanvas />
        </MobileWrapper>
      ) : (
        <>
          <Body>
            <Manager />
            <Toolbar />
            <Canvas />
          </Body>
          <Panel />
        </>
      )}
    </Main>
  );
};

const Main = styled.main<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "100%" : "calc(100% - 2rem)")};
  max-width: ${({ isMobile }) => (isMobile ? "none" : "90rem")};
  max-height: ${({ isMobile }) => (isMobile ? "none" : "50rem")};
  min-height: ${({ isMobile }) => (isMobile ? "100vh" : "44rem")};
  margin: auto;
  background: ${({ isMobile }) => (isMobile ? "#f8fafc" : "transparent")};
`;

const MobileWrapper = styled.div`
  padding: 16px;
  height: calc(100vh - 32px);
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

export default Editor;
