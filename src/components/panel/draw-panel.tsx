import styled from "@emotion/styled";

interface IButtonProps {
  isActive: boolean;
}

const DrawPanel = () => {
  return (
    <>
      <ColorPicker>
        <span>색상</span>
        <ColorCircle />
      </ColorPicker>
      <ThicknessPicker>
        <span>두께</span>
        <ThicknessSelect>
          <option value="xs">Extra small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra large</option>
        </ThicknessSelect>
      </ThicknessPicker>
      <ToolPicker>
        <span>도구</span>
        <ToolButtonGroup>
          <ToolButton isActive={true}>✏️</ToolButton>
          <ToolButton isActive={false}>🧽</ToolButton>
        </ToolButtonGroup>
      </ToolPicker>
    </>
  );
};

export default DrawPanel;
const ColorPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray70};
`;

const ColorCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: red;
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray30};
  margin-bottom: 5px;
`;

const ThicknessPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray70};
`;

const ThicknessSelect = styled.select`
  font-size: 1rem;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 20px;
  width: 150px;
`;

const ToolPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray70};
`;

const ToolButtonGroup = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 20px;
  overflow: hidden;
`;

const ToolButton = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.gray20 : theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* 아이콘 크기 조정 */
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray30}; /* 버튼 사이의 경계선 */
  }
`;
