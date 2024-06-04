import styled from "@emotion/styled";

const Manager = () => {
  return (
    <Wrapper>
      <TopToolBarContainer>
        <CenteredItem>
          <RedoUndoButtonGroup>
            <RedoUndoIconButton>↻</RedoUndoIconButton>
            <RedoUndoIconButton>↻</RedoUndoIconButton>
          </RedoUndoButtonGroup>
        </CenteredItem>
        <RightItem>
          <FileButtonGroup>
            <FileIconButton />
            <FileIconButton />
          </FileButtonGroup>
        </RightItem>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CenteredItem = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const RedoUndoButtonGroup = styled.div`
  display: flex;
  align-items: center;
  border-radius: 30px; /* 둥근 테두리 */
  overflow: hidden; /* 자식 요소가 부모의 테두리를 넘지 않도록 */
  border: 1px solid ${({ theme }) => theme.colors.gray30};
`;

const RedoUndoIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* 아이콘 크기 조정 */
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
  &:first-of-type {
    border-right: 1px solid ${({ theme }) => theme.colors.gray30}; /* 버튼 사이의 경계선 */
  }
`;

const FileButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 사이의 간격 */
`;

const FileIconButton = styled.button`
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
`;
