import styled from "@emotion/styled";
import Button from "./button";
import TestSVG from "@/assets/icons/logo.svg?react";
import { useOverlay } from "@/shared/hooks/use-oveylay/use-overlay";
import SignIn from "@/components/sign-in";

const Header = () => {
  const overlay = useOverlay();
  return (
    <Wrapper>
      <GNBContainer>
        <Logo />
        <Button
          size="small"
          title="로그인"
          onClick={() => {
            overlay.open(({ isOpen, close }) => {
              return <SignIn open={isOpen} onClose={close} />;
            });
          }}
        />
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

const Logo = styled(TestSVG)`
  width: 110px;
  height: 22px;
`;
