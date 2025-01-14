import styled from "@emotion/styled";
import ToolbarForMobile from "./toolbar-for-mobile";
import Panel from "../panel/indext";
import CanvasForMobile from "./canvas-for-mobile";
import ManagerForMobile from "./manager-for-mobile";
const Mobile = () => {
  return (
    <Wrapper>
      <MobileContainer>
        <ManagerForMobile />
        <MobileContent>
          <CanvasForMobile></CanvasForMobile>
          <Panel />
        </MobileContent>
        <MobileNav>
          <div>
            <div>
              <ToolbarForMobile />
            </div>
          </div>
        </MobileNav>
      </MobileContainer>
    </Wrapper>
  );
};

export default Mobile;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 2147483646;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  z-index: 2147483646;
`;

const MobileContainer = styled.div`
  display: grid;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.9);
  contain: strict;
  direction: ltr;
  font-size: 16px;
  font-weight: 450;
  height: 683px;
  line-height: normal;
  max-height: none;
  max-width: none;
  outline-color: rgb(0, 0, 0);
  overflow: hidden;
  position: relative;
  text-align: left;
  text-rendering: optimizelegibility;
  touch-action: manipulation;
  transition: background-color 0.001s, outline-color 0.001s,
    color 0.1s ease-in-out, dir 0.001s;
  user-select: none;
  width: 516px;
  grid-template-columns: 516px;
  grid-template-rows: 40px 591px 52px;
`;

const MobileNav = styled.div`
  display: flex;
  box-sizing: content-box;
  overflow-wrap: normal;
  position: relative;
  z-index: 3;
  overflow: hidden;
  grid-area: 3 / 1;
  justify-content: center;
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.9);
  direction: ltr;
  font-size: 16px;
  font-weight: 450;
  line-height: normal;
  text-align: left;
  background-color: rgb(255, 255, 255);

  & > div {
    display: inline-flex;
    box-sizing: content-box;
    overflow-wrap: normal;
    position: relative;
    vertical-align: top;
    transform: none;
    color: rgba(0, 0, 0, 0.9);
    direction: ltr;
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 450;
    line-height: normal;
    text-align: left;
    background-color: rgb(255, 255, 255);
    & > div {
      border-radius: 16px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
      box-sizing: content-box;
      overflow-wrap: normal;
      background: none 0% 0% / auto repeat scroll padding-box border-box
        rgba(0, 0, 0, 0);
      color: rgba(0, 0, 0, 0.9);
      font-size: 10px;
      line-height: normal;
      text-decoration: none solid rgba(0, 0, 0, 0.9);
      width: 40px;
      transition: background-color 0.1s ease-out, color 0.1s ease-out,
        box-shadow 0.1s ease-out;
      flex: 1 1 0%;
      justify-content: center;
      min-height: 40px;
      min-width: 40px;
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      outline: rgba(0, 0, 0, 0) none 0px;
      direction: ltr;
      font-weight: 400;
      text-align: center;
    }
  }
`;

const MobileContent = styled.div`
  display: flex;
  cursor: grab;
  box-sizing: content-box;
  overflow-wrap: normal;
  padding: 8px 16px;
  min-height: 1px;
  touch-action: none;
  flex: 1 1 0%;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
  font-weight: 450;
  line-height: normal;
  text-align: left;
  background-color: rgb(255, 255, 255);
`;
