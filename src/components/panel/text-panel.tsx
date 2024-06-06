import styled from "@emotion/styled";

const TextPanel = () => {
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
        <span>추가</span>
        <BaseIcon>✏️</BaseIcon>
      </ToolPicker>
    </>
  );
};

export default TextPanel;
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

const BaseIcon = styled.button`
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
