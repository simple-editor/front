import styled from "@emotion/styled";
import IconButtonRadius from "@/shared/ui/icon-button-radius";
import PencilSvg from "@/assets/icons/sidebar-pencil.svg?react";
import EraserSvg from "@/assets/icons/eraser.svg?react";
import DropDown from "@/shared/ui/drop-down";
import useToolbarStore from "@/shared/store/toolbar-store";
import { useReducer, useState } from "react";
import { ColorResult } from "react-color";
import ColorPicker from "@/shared/ui/color-picker";

const lineSizes = [
  { title: "Extra small", value: 1 },
  { title: "Small", value: 2 },
  { title: "Medium", value: 4 },
  { title: "Large", value: 8 },
  { title: "Extra large", value: 16 },
];
const DrawPanel = () => {
  const [color, setColor] = useState("#000");
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);
  const setLineTools = useToolbarStore((state) => state.setLineTools);
  const lineTools = useToolbarStore((state) => state.line);

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
    setLineTools({ strokeColor: color.hex });
    toggleIsOpen();
  };

  const handleSelectToolType = (type: "pen" | "eraser") => {
    setLineTools({ type: type });
  };

  const handleDropDown = (item: { title: string; value: number | string }) => {
    if (typeof item.value === "number") {
      setLineTools({
        strokeWidthTitle: item.title,
        strokeWidthValue: item.value,
      });
    }
  };

  return (
    <>
      <ColorPicker
        color={color}
        open={isOpen}
        onToggle={toggleIsOpen}
        onChange={handleChangeComplete}
      />
      <ThicknessPicker>
        <SubTitle>두께</SubTitle>
        <DropDown
          data={lineSizes}
          selected={{
            title: lineTools.strokeWidthTitle,
            value: lineTools.strokeWidthValue,
          }}
          onClick={handleDropDown}
        />
      </ThicknessPicker>
      <ToolPicker>
        <SubTitle>도구</SubTitle>
        <ToolButtonGroup>
          <IconButtonRadius
            isActive={lineTools.type === "pen"}
            size="small"
            onClick={() => handleSelectToolType("pen")}
            icon={<CustomPencilSvg />}
          />
          <IconButtonRadius
            isActive={lineTools.type === "eraser"}
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
