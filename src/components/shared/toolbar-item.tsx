import styled from "@emotion/styled";
import { useBoundStore } from "../../store/use-bound-store";

interface IProps extends IIconProps {
  title: string;
}

interface IIconProps {
  icon: string;
}

interface IIsActiveProps {
  isActive: boolean;
}
const ToolbarItem = ({ title, icon }: IProps) => {
  const activeTool = useBoundStore((state) => state.activeTool);
  const setActvieTool = useBoundStore((state) => state.setActiveTool);
  const isActive = activeTool === title;

  const handleClick = () => {
    setActvieTool(title);
  };

  return (
    <Wrapper isActive={isActive} onClick={handleClick}>
      <Icon icon={icon}>아이콘</Icon>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default ToolbarItem;

const Wrapper = styled.div<IIsActiveProps>`
  display: flex;
  width: 72px;
  height: 72px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.gray80 : "#1b1b1b"};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray80};
  }
`;

const Icon = styled.i<IIconProps>`
  display: block;
  width: 24px;
  height: 24px;
  font-size: 0;
  background-image: ${(props) => `url(${props.icon})`};
`;

const Title = styled.span`
  ${(props) => props.theme.textStyles.smallText2};
  color: #fff;
`;
