import { Theme, css } from "@emotion/react";
import styled from "@emotion/styled";

interface IProps extends IWrapperProps {
  title: string;
  onClick?: () => void;
}

interface IWrapperProps {
  size: "small" | "large";
}
interface IThemeProps {
  theme: Theme;
}

const Button = ({ title, size, onClick }: IProps) => {
  return (
    <Wrapper size={size} onClick={onClick}>
      {title}
    </Wrapper>
  );
};

export default Button;

const smallSizes = (props: IThemeProps) => css`
  font-size: 16px;
  height: 48px;
  ${props.theme.textStyles.p}
`;
const largeSizes = (props: IThemeProps) => css`
  height: 80px;
  font-size: 22px;
  ${props.theme.textStyles.h5}
`;
const Wrapper = styled.button<IWrapperProps>`
  display: inline-flex;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray100};
  border: none;
  border-radius: 8px;
  color: #fff;
  ${(props) => (props.size === "small" ? smallSizes : largeSizes)};
  cursor: pointer;
`;
