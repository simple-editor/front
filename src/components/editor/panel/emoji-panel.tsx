import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styled from "@emotion/styled";
import IconButton from "@/shared/ui/icon-button";
import EmojiSvg from "@/assets/icons/sidebar-smail.svg?react";
import { useReducer } from "react";
import useHistoryStore from "@/shared/store/history-store";
import useCanvasRefStore from "@/shared/store/canvas-ref-store";
import { v4 as uuidv4 } from "uuid";

const EmojiPanel = () => {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const stageRef = useCanvasRefStore((state) => state.stageRef);

  // 이모티콘을 클릭한다
  // 이모티콘이 전역상태에 저장된다
  // 이모티콘을 Stage에 드러낸다

  const handleAddEmoji = (data: { id: string; native: string }) => {
    const { native } = data;
    const stage = stageRef.current;
    if (stage) {
      setShapes([
        ...shapes,
        {
          id: uuidv4(),
          type: "emoji",
          x: stage.width() / 2,
          y: stage.height() / 2,
          text: native,
          fontSize: 60,
        },
      ]);
    }
    toggleIsOpen();
    return;
  };

  return (
    <>
      <ToolPicker>
        <SubTitle>추가</SubTitle>
        <IconButton size="small" icon={<Emogji />} onClick={toggleIsOpen} />
      </ToolPicker>

      {isOpen && (
        <CustomPicker>
          <Picker
            data={data}
            onEmojiSelect={(data: { id: string; native: string }) =>
              handleAddEmoji(data)
            }
          />
        </CustomPicker>
      )}
    </>
  );
};

export default EmojiPanel;

const SubTitle = styled.span`
  ${(props) => props.theme.textStyles.smallText2}
`;

const ToolPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray70};
`;

const CustomPicker = styled.section`
  position: absolute;
  top: -400px;
`;

const Emogji = styled(EmojiSvg)`
  & path {
    fill: black;
  }
  width: 18px;
  height: 18px;
`;
