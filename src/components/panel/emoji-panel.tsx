import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styled from "@emotion/styled";

import IconButton from "../../shared/ui/icon-button";
import EmojiSvg from "@/assets/icons/sidebar-smail.svg?react";

const EmojiPanel = () => {
  return (
    <>
      <ToolPicker>
        <SubTitle>추가</SubTitle>
        <IconButton size="small" icon={<Emogji />} />
      </ToolPicker>

      <CustomPicker>
        <Picker data={data} onEmojiSelect={console.log} />
      </CustomPicker>
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
