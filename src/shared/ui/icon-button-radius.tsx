import { CSSObject, css } from "@emotion/react";
import styled from "@emotion/styled";

interface ISizeProps {
  size: "small" | "large";
  isActive?: boolean;
  styles?: CSSObject;
}

interface IProps extends ISizeProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const IconButtonRadius = ({
  size,
  icon,
  isActive,
  onClick,
  styles,
}: IProps) => {
  return (
    <>
      <Wrapper
        size={size}
        isActive={isActive}
        onClick={onClick}
        styles={styles}
      >
        {icon}
      </Wrapper>
    </>
  );
};

export default IconButtonRadius;

const Wrapper = styled.button<ISizeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* 아이콘 크기 조정 */
  color: ${({ theme }) => theme.colors.gray100};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.gray10 : props.theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
  &:first-of-type {
    border-right: 1px solid ${({ theme }) => theme.colors.gray30}; /* 버튼 사이의 경계선 */
  }
  ${(props) => props.styles}
  ${(props) => (props.size === "small" ? smallSizes : largeSizes)}
`;

const smallSizes = css`
  width: 30px;
  height: 30px;
`;
const largeSizes = css`
  width: 62px;
  height: 62px;
`;
