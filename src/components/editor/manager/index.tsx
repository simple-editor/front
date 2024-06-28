import styled from "@emotion/styled";
import DownloadSvg from "@/assets/icons/download.svg?react";
import FolderSvg from "@/assets/icons/folder-down.svg?react";
import RedoUndoSvg from "@/assets/icons/arrow-rotate-left.svg?react";
import useHistoryStore from "@/shared/store/history-store";
import RoundedButton from "@/shared/ui/rounded-button";
import IconButtonRadius from "@/shared/ui/icon-button-radius";
const Manager = () => {
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);

  return (
    <Wrapper>
      <TopToolBarContainer>
        <RedoUndoButtonGroup>
          <IconButtonRadius
            icon={<RedoUndoSvg />}
            onClick={undo}
            size={"large"}
          />
          <IconButtonRadius
            icon={<RedoUndoSvg />}
            onClick={redo}
            size={"large"}
          />
        </RedoUndoButtonGroup>
        <RightButtonGroup>
          <RoundedButton icon={<DownloadSvg />} />
          <RoundedButton icon={<FolderSvg />} />
        </RightButtonGroup>
      </TopToolBarContainer>
    </Wrapper>
  );
};

export default Manager;

const Wrapper = styled.div`
  height: 72px;
  max-width: 1440px;
  margin: auto;
  margin-top: 68px;
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
