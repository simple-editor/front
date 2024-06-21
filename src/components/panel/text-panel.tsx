import DropDown from "@/shared/ui/drop-down";
import IconButton from "@/shared/ui/icon-button";
import styled from "@emotion/styled";
import { useState } from "react";
import TextSvg from "@/assets/icons/sidebar-text.svg?react";
import { ColorResult, SketchPicker } from "react-color";
import useToolbarStore from "@/shared/store/toolbar-store";
import useHistoryStore from "@/shared/store/history-store";
const fontSizes = [
  { title: "Extra small", value: 8 },
  { title: "Small", value: 12 },
  { title: "Medium", value: 16 },
  { title: "Large", value: 24 },
  { title: "Extra large", value: 32 },
];
const TextPanel = () => {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("#000");
  const { setShapes, shapes } = useHistoryStore((state) => state);
  const setPanels = useToolbarStore((state) => state.setPanels);
  const panels = useToolbarStore((state) => state.panels);
  const selectedDropDwonItem = {
    title: panels.텍스트.fontSizeTitle,
    value: panels.텍스트.fontSizeValue,
  };

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleDropDown = (item: { title: string; value: number | string }) => {
    if (typeof item.value === "number") {
      setPanels("텍스트", {
        fontSizeTitle: item.title,
        fontSizeValue: item.value,
      });
    }
  };

  const handleAddText = () => {
    const stage = document.getElementById("stage");
    const stageWidth = stage!.offsetWidth;
    const stageHeight = stage!.offsetHeight;
    const newText = {
      id: `text${shapes.length + 1}`,
      type: "text",
      x: stageWidth / 2,
      y: stageHeight / 2,
      text: "Edit me!",
      fontSize: panels.텍스트.fontSizeValue,
      draggable: true,
    };
    setShapes([...shapes, newText]);
  };

  return (
    <>
      <ColorPickerWrapper>
        <SubTitle>색상</SubTitle>
        <ColorCircle onClick={() => setIsActive(!isActive)} />
        {isActive && (
          <CustomColorPicker
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        )}
      </ColorPickerWrapper>
      <ThicknessPicker>
        <SubTitle>사이즈</SubTitle>
        <DropDown
          data={fontSizes}
          selected={selectedDropDwonItem}
          onClick={handleDropDown}
        />
      </ThicknessPicker>
      <ToolPicker onClick={handleAddText}>
        <SubTitle>추가</SubTitle>
        <IconButton size="small" icon={<TextIcon />} />
      </ToolPicker>
    </>
  );
};

export default TextPanel;

const ColorPickerWrapper = styled.div`
  position: relative;
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
  cursor: pointer;
`;

const CustomColorPicker = styled(SketchPicker)`
  position: absolute;
  top: -300px;
`;

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

const TextIcon = styled(TextSvg)`
  width: 18px;
  height: 18px;
  & path {
    fill: black;
  }
`;
