import styled from "@emotion/styled";

interface IProps {
  title: string;
}

const ToolBarItem = ({ title }: IProps) => {
  return (
    <Wrapper>
      <Icon>아이콘</Icon>
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

const Icon = styled.i`
  display: block;
  width: 24px;
  height: 24px;
  font-size: 0;
  border: 1px solid red;
`;

const Title = styled.span`
  ${(props) => props.theme.textStyles.smallText2};
  color: #fff;
`;
