import styled from "@emotion/styled";
import DrawToolbar from "./draw-panel";

const Panel = () => {
  return (
    <PanelContainer>
      <DrawToolbar />
    </PanelContainer>
  );
};

export default Panel;

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 460px;
  height: 130px;
  box-sizing: border-box;
  margin: auto;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
`;
