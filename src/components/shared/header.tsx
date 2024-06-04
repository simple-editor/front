import styled from "@emotion/styled";
import Button from "./button";

const Header = () => {
  return (
    <Wrapper>
      <GNBContainer>
        <Logo></Logo>
        <Button size="small" title="로그인" />
      </GNBContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray20};
`;

const GNBContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px; // 필요에 따라 높이 조정
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 1440px;
  margin: auto;
`;

const Logo = styled.div`
  width: 110px;
  height: 22px;
  background-image: url("/images/logo.svg");
  background-repeat: no-repeat;
  background-size: cover;
`;
