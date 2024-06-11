import DropDown from "@/shared/ui/drop-down";
import IconButton from "@/shared/ui/icon-button";
import styled from "@emotion/styled";
import { useState } from "react";
import TextSvg from "@/assets/icons/sidebar-text.svg?react";
const data = ["Extra small", "Small", "Medium", "Large", "Extra large"];

const TextPanel = () => {
  const [selected, setSelected] = useState("Medium");
  const handleClick = (item: string) => {
    setSelected(item);
  };
  return (
    <>
      <ColorPicker>
        <SubTitle>색상</SubTitle>
        <ColorCircle />
      </ColorPicker>
      <ThicknessPicker>
        <SubTitle>폰트</SubTitle>
        <DropDown data={data} selected={selected} onClick={handleClick} />
      </ThicknessPicker>
      <ThicknessPicker>
        <SubTitle>사이즈</SubTitle>
        <DropDown data={data} selected={selected} onClick={handleClick} />
      </ThicknessPicker>
      <ToolPicker>
        <SubTitle>추가</SubTitle>
        <IconButton size="small" icon={<TextIcon />} />
      </ToolPicker>
    </>
  );
};

export default TextPanel;

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
