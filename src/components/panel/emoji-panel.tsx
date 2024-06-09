import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styled from "@emotion/styled";
import { useReducer } from "react";
import IconButton from "../shared/icon-button";

const EmojiPanel = () => {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);
  return (
    <>
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
        <IconButton
          size="small"
          icon="/icons/sidebar-smail.svg"
          onClick={toggleIsOpen}
        />
      </ToolPicker>

      {isOpen && (
        <CustomPicker>
          <Picker data={data} onEmojiSelect={console.log} />
        </CustomPicker>
      )}
    </>
  );
};

export default EmojiPanel;

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

const CustomPicker = styled.section`
  position: absolute;
  top: -400px;
`;
