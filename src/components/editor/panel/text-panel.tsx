import DropDown from "@/shared/ui/drop-down";
import styled from "@emotion/styled";
import { useReducer, useState } from "react";
import { ColorResult } from "react-color";
import useToolbarStore from "@/shared/store/toolbar-store";
import useHistoryStore from "@/shared/store/history-store";
import ColorPicker from "@/shared/ui/color-picker";
import { AiOutlineFontSize, AiOutlinePlus } from "react-icons/ai"; // React-Icons

const fontSizes = [
  { title: "Small", value: 14 }, // Small: 조금 더 큰 크기
  { title: "Medium", value: 18 }, // Medium: 기본 텍스트 크기
  { title: "Large", value: 24 }, // Large: 강조할 텍스트 크기
  { title: "Extra large", value: 32 }, // Extra Large: 아주 큰 텍스트 크기
  { title: "XXL", value: 40 }, // XXL: 매우 큰 텍스트 크기, 타이틀 등 사용
  { title: "XXXL", value: 48 }, // XXXL: 가장 큰 크기, 특수 강조
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
      type: "text" as const,
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
      <PanelContainer>
        <ToolItem>
          <ColorPicker
            color={color}
            open={isOpen}
            onToggle={toggleIsOpen}
            onChange={handleChangeComplete}
          />
          <Label>Color</Label>
        </ToolItem>

        <ToolItem>
          <AiOutlineFontSize size={20} style={{ color: "#4A90E2" }} />
          <DropDown
            data={fontSizes}
            selected={selectedDropDwonItem}
            onClick={handleDropDown}
          />
          <Label>Font Size</Label>
        </ToolItem>

        <ToolItem onClick={handleAddText}>
          <IconWrapper>
            <AiOutlinePlus size={28} />
          </IconWrapper>
          <Label>Add Text</Label>
        </ToolItem>
      </PanelContainer>
    </>
  );
};

export default TextPanel;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f9fafc;
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  gap: 16px;
`;

const ToolItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background: #4a90e2;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #357abd;
  }
`;

const Label = styled.span`
  font-size: 12px;
  color: #333333;
  font-weight: 500;
`;
