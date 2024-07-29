import styled from "@emotion/styled";
import DrawPanel from "./draw-panel";
import TextPanel from "./text-panel";
import CropPanel from "./crop-panel";
import EmojiPanel from "./emoji-panel";
import useToolbarStore from "@/shared/store/toolbar-store";
import FilterPanel from "@/components/editor/panel/filter-panel";

const Panel = () => {
  const activeTool = useToolbarStore((state) => state.activeTool);

  const renderToolbar = () => {
    switch (activeTool) {
      case "그리기":
        return <DrawPanel />;
      case "텍스트":
        return <TextPanel />;
      case "이모지":
        return <EmojiPanel />;
      case "자르기":
        return <CropPanel />;
      case "필터":
        return <FilterPanel />;
      default:
        return null;
    }
  };

  return <PanelContainer>{renderToolbar()}</PanelContainer>;
};

export default Panel;

const PanelContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  box-sizing: border-box;
  margin: auto;
  gap: 40px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
`;
