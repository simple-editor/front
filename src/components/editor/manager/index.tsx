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

const Manager = () => {
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
      <TopToolBarContainer>
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
      </TopToolBarContainer>
    </Wrapper>
  );
};

export default Manager;

const Wrapper = styled.div`
  grid-row: 1;
  grid-column: 1 / span 2;
  padding: 15px 0;
`;

const TopToolBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RedoUndoButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px; /* 둥근 테두리 */
  overflow: hidden; /* 자식 요소가 부모의 테두리를 넘지 않도록 */
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
