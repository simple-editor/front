import styled from "@emotion/styled";
import Button from "./button";
import TestSVG from "@/assets/icons/logo.svg?react";
import SignInModal from "@/components/sign-in-modal";
import { useDisclosure } from "@chakra-ui/react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Wrapper>
      <GNBContainer>
        <Logo />
        <Button size="small" title="로그인" onClick={onOpen} />
      </GNBContainer>
      <SignInModal isOpen={isOpen} onClose={onClose} />;
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
