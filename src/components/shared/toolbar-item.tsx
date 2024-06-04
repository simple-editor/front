import styled from "@emotion/styled";

interface IProps extends IIconProps {
  title: string;
}

interface IIconProps {
  icon: string;
}

const ToolBarItem = ({ title, icon }: IProps) => {
  return (
    <Wrapper>
      <Icon icon={icon}>아이콘</Icon>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default ToolBarItem;

const Wrapper = styled.div`
  display: flex;
  width: 72px;
  height: 72px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  background-color: #1b1b1b;
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
