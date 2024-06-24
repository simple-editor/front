import { CSSObject, css } from "@emotion/react";
import styled from "@emotion/styled";

interface IEventProps extends IProps {
  onClick?: () => void;
  icon: React.ReactNode;
}

interface IProps {
  size: "small" | "large";
  styles?: CSSObject;
}

const IconButton = ({ icon, size, onClick, styles }: IEventProps) => {
  return (
    <Wrapper size={size} onClick={onClick} styles={styles} type="button">
      {icon}
    </Wrapper>
  );
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
  ${(props) => (props.size === "small" ? smallSizes : largeSizes)}
  ${(props) => props.styles} // 커스텀 스타일
`;

const smallSizes = css`
  width: 40px;
  height: 40px;
`;
const largeSizes = css`
  width: 72px;
  height: 72px;
`;
