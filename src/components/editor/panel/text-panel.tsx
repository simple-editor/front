import DropDown from "@/shared/ui/drop-down";
import IconButton from "@/shared/ui/icon-button";
import styled from "@emotion/styled";
import { useReducer, useState } from "react";
import TextSvg from "@/assets/icons/sidebar-text.svg?react";
import { ColorResult, SketchPicker } from "react-color";
import useToolbarStore from "@/shared/store/toolbar-store";
import useHistoryStore from "@/shared/store/history-store";
import ColorPicker from "@/shared/ui/color-picker";
const fontSizes = [
  { title: "Extra small", value: 8 },
  { title: "Small", value: 12 },
  { title: "Medium", value: 16 },
  { title: "Large", value: 24 },
  { title: "Extra large", value: 32 },
];
const TextPanel = () => {
  const [color, setColor] = useState("#000");
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);
  const { setShapes, shapes } = useHistoryStore((state) => state);
  const { setTextTools, text: textTools } = useToolbarStore((state) => state);

  const selectedDropDwonItem = {
    title: textTools.fontSizeTitle,
    value: textTools.fontSizeValue,
  };

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
    toggleIsOpen();
  };

  const handleDropDown = (item: { title: string; value: number | string }) => {
    if (typeof item.value === "number") {
      setTextTools({
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
      type: "text" as "text",
      x: stageWidth / 2,
      y: stageHeight / 2,
      text: "Sample!",
      fontSize: textTools.fontSizeValue,
      fill: color,
      draggable: true,
    };
    setShapes([...shapes, { ...newText }]);
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
