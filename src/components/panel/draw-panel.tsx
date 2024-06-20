import styled from "@emotion/styled";
import IconButtonRadius from "../../shared/ui/icon-button-radius";
import PencilSvg from "@/assets/icons/sidebar-pencil.svg?react";
import EraserSvg from "@/assets/icons/eraser.svg?react";
import DropDown from "@/shared/ui/drop-down";
import { useState } from "react";
import useToolbarStore from "@/shared/store/toolbar-store";

const lineSizes = [
  { title: "Extra small", value: 1 },
  { title: "Small", value: 2 },
  { title: "Medium", value: 4 },
  { title: "Large", value: 8 },
  { title: "Extra large", value: 16 },
];
const DrawPanel = () => {
  const [selected, setSelected] = useState(lineSizes[2]);
  const activeTool = useToolbarStore((state) => state.activeTool);
  const setPanels = useToolbarStore((state) => state.setPanels);
  const toolType = useToolbarStore((state) => state.panels.그리기.type);
  
  const handleSelectToolType = (type: "pen" | "eraser") => {
    setPanels("그리기", { type: type });
  };

  const handleDropDown = (item: { title: string; value: number | string }) => {
    if (typeof item.value === "number") {
      setPanels("그리기", {
        strokeWidthTitle: item.title,
        strokeWidthValue: item.value,
      });
    }
  };

  return (
    <>
      <ColorPicker>
        <SubTitle>색상</SubTitle>
        <ColorCircle />
      </ColorPicker>
      <ThicknessPicker>
        <SubTitle>두께</SubTitle>
        <DropDown
          data={lineSizes}
          selected={selected}
          onClick={handleDropDown}
        />
      </ThicknessPicker>
      <ToolPicker>
        <SubTitle>도구</SubTitle>
        <ToolButtonGroup>
          <IconButtonRadius
            isActive={toolType === "pen"}
            size="small"
            onClick={() => handleSelectToolType("pen")}
            icon={<CustomPencilSvg />}
          />
          <IconButtonRadius
            isActive={toolType === "eraser"}
            size="small"
            onClick={() => handleSelectToolType("eraser")}
            icon={<CustomEraserSvg />}
          />
        </ToolButtonGroup>
      </ToolPicker>
    </>
  );
};

export default DrawPanel;

const SubTitle = styled.span`
  ${(props) => props.theme.textStyles.smallText2}
`;

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
