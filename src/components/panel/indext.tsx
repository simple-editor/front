import styled from "@emotion/styled";
import DrawToolbar from "./draw-panel";
// import FramePanel from "./frame-panel";

const Panel = () => {
  return (
    <PanelContainer>
      <DrawToolbar />
      {/* <FramePanel /> */}
    </PanelContainer>
  );
};

export default Panel;

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 130px;
  box-sizing: border-box;
  margin: auto;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
`;
