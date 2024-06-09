import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IEventProps extends IProps {
  onClick?: () => void;
}

interface IProps {
  icon: string;
  size: "small" | "large";
}

const IconButton = ({ icon, size, onClick }: IEventProps) => {
  return <Wrapper icon={icon} size={size} onClick={onClick}></Wrapper>;
};

export default IconButton;
const Wrapper = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  cursor: pointer;
  font-size: 1.5rem; /* 아이콘 크기 조정 */
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }

  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: center;

  background-image: ${(props) => `url(${props.icon})`};
  ${(props) => (props.size === "small" ? smallSizes : largeSizes)}
`;

const smallSizes = css`
  width: 40px;
  height: 40px;
`;
const largeSizes = css`
  width: 72px;
  height: 72px;
`;
