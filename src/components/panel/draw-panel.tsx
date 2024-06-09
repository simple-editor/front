import styled from "@emotion/styled";
import IconButtonRadius from "../shared/icon-button-radius";
import PencilSvg from "@/assets/icons/sidebar-pencil.svg?react";
import EraserSvg from "@/assets/icons/eraser.svg?react";

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
          <IconButtonRadius size="small" icon={<CustomPencilSvg />} />
          <IconButtonRadius size="small" icon={<CustomEraserSvg />} />
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
const CustomPencilSvg = styled(PencilSvg)`
  width: 18px;
  height: 18px;
  & path {
    fill: black;
  }
`;

const CustomEraserSvg = styled(EraserSvg)`
  width: 18px;
  height: 18px;
  & path {
    fill: black;
  }
`;
