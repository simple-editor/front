import styled from "@emotion/styled";
import DownloadSvg from "@/assets/icons/download.svg?react";
import RedoUndoSvg from "@/assets/icons/arrow-rotate-left.svg?react";
import DeleteSvg from "@/assets/icons/delete.svg?react";
import useHistoryStore from "@/shared/store/history-store";
import RoundedButton from "@/shared/ui/rounded-button";
import IconButtonRadius from "@/shared/ui/icon-button-radius";
import useCanvasRefStore from "@/shared/store/canvas-ref-store";
import { isKonvaNode } from "../type-guards";
import Konva from "konva";
import useToolbarStore from "@/shared/store/toolbar-store";

const ManagerForMobile = () => {
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);
  const reset = useHistoryStore((state) => state.reset);
  const setActiveTool = useToolbarStore((state) => state.setActiveTool);
  const stageRef = useCanvasRefStore((state) => state.stageRef);

  const downloadImage = () => {
    const layer = stageRef.current;
    if (!isKonvaNode(layer, Konva.Stage)) return;
    setActiveTool("");
    setTimeout(() => {
      const uri = layer.toDataURL({
        x: layer.clipX(),
        y: layer.clipY(),
        width: layer.clipWidth(),
        height: layer.clipHeight(),
      });
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <Wrapper>
      <MobileHeaderEndBtn onClick={reset}>닫기</MobileHeaderEndBtn>
      <RedoUndoButtonGroup>
        <IconButtonRadius
          icon={<RedoUndoSvg width={15} height={15} />}
          onClick={undo}
          size={"small"}
        />
        <IconButtonRadius
          icon={<RedoUndoSvg width={15} height={15} />}
          onClick={redo}
          size={"small"}
        />
      </RedoUndoButtonGroup>

      <RightButtonGroup>
        <RoundedButton
          icon={<DeleteSvg width={15} height={15} />}
          onClick={reset}
        />
        <RoundedButton
          icon={<DownloadSvg width={15} height={15} />}
          onClick={downloadImage}
        />
      </RightButtonGroup>
    </Wrapper>
  );
};

export default ManagerForMobile;
const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  overflow-wrap: normal;
  position: relative;
  z-index: 3;
  max-width: 100%;
  align-items: center;
  justify-content: space-between;
  grid-area: 1 / 1;
  padding: 12px 12px 0px;
  color: rgba(0, 0, 0, 0.9);
  direction: ltr;
  font-size: 16px;
  font-weight: 450;
  line-height: normal;
  text-align: left;
  background-color: rgb(255, 255, 255);
`;

const MobileHeaderEndBtn = styled.div`
  display: flex;
  box-sizing: content-box;
  overflow-wrap: normal;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  border-radius: 159984px;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 0px 0px 1px inset;
  color: rgba(0, 0, 0, 0.9);
  direction: ltr;
  font-size: 16px;
  font-weight: 450;
  line-height: normal;
  text-align: left;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
`;

const RedoUndoButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px; /* 둥근 테두리 */
  overflow: hidden; /* 자식 요소가 부모의 테두리를 넘지 않도록 */
  border: 1px solid ${({ theme }) => theme.colors.gray30};

  & > button:last-of-type {
    transform: scaleX(-1);
    border-right: 1px solid ${({ theme }) => theme.colors.gray30}; /* 버튼 사이의 경계선 */
  }
`;

const RightButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 사이의 간격 */
`;
