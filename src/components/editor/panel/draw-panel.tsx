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
  { title: "XS", value: 0.5 },
  { title: "S", value: 1 },
  { title: "M", value: 2 },
  { title: "L", value: 4 },
  { title: "XL", value: 8 },
];

const DrawPanel = () => {
  const [color, setColor] = useState(
    () => useToolbarStore.getState().line.strokeColor
  );
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
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
    <DrawPanelContainer>
      <Section>
        <ColorPicker
          color={color}
          open={isOpen}
          onToggle={toggleIsOpen}
          onChange={handleChangeComplete}
        />
      </Section>

      <Section>
        <SubTitle>크기</SubTitle>
        <DropDown
          data={lineSizes}
          selected={{
            title: lineTools.strokeWidthTitle,
            value: lineTools.strokeWidthValue,
          }}
          onClick={handleDropDown}
        />
      </Section>

      <Section>
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
      </Section>
    </DrawPanelContainer>
  );
};

const DrawPanelContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SubTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray70};
`;

const ToolButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  padding: 2px;
  background: ${({ theme }) => theme.colors.gray10};
  border-radius: 8px;
`;

const CustomPencilSvg = styled(PencilSvg)`
  width: 14px;
  height: 14px;
  & path {
    fill: currentColor;
  }
`;

const CustomEraserSvg = styled(EraserSvg)`
  width: 14px;
  height: 14px;
  & path {
    fill: currentColor;
  }
`;

export default DrawPanel;
