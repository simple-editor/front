import styled from "@emotion/styled";
import downloadSvg from "@/assets/icons/download.svg";
import folderSvg from "@/assets/icons/folder-down.svg";
import redoUndoSvg from "@/assets/icons/arrow-rotate-left.svg";
import useHistoryStore from "@/shared/store/history-store";
const Manager = () => {
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);

  return (
    <Wrapper>
      <TopToolBarContainer>
        <RedoUndoButtonGroup>
          <UndoButton onClick={undo} />
          <RedoButton onClick={redo} />
        </RedoUndoButtonGroup>
        <RightButtonGroup>
          <FileIconButton />
          <LibrayIconButton />
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
`;

const RedoUndoIconBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
  &:first-of-type {
    border-right: 1px solid ${({ theme }) => theme.colors.gray30}; /* 버튼 사이의 경계선 */
  }
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: center;
`;

const UndoButton = styled(RedoUndoIconBase)`
  background-image: url(${redoUndoSvg});
`;
const RedoButton = styled(RedoUndoIconBase)`
  background-image: url(${redoUndoSvg});
  transform: scaleX(-1);
`;

const RightButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 사이의 간격 */
`;

const RightBaseIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  cursor: pointer;
  font-size: 1.5rem; /* 아이콘 크기 조정 */
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }

  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: center;
`;

const FileIconButton = styled(RightBaseIcon)`
  background-image: url(${downloadSvg});
`;
const LibrayIconButton = styled(RightBaseIcon)`
  background-image: url(${folderSvg});
`;
