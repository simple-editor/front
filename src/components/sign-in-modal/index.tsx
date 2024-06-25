import styled from "@emotion/styled";
import Button from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Svg from "@/assets/icons/close.svg?react";
import IconButton from "@/shared/ui/icon-button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
  username: yup
    .string()
    .required("아이디를 입력하세요.")
    .min(4, "아이디는 최소 4자 이상이어야 합니다."),
  password: yup
    .string()
    .required("비밀번호를 입력하세요.")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

const SignInModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (!open) return null;

  const onSubmit = (data: any) => {
    console.log(data);
    // 회원가입 로직 추가
  };

  return (
    <Wrapper onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <TitleSection>
          <Title>로그인 및 회원가입</Title>
        </TitleSection>
        <ModalBody>
          <ContentSection onSubmit={handleSubmit(onSubmit)}>
            <FormInputSection>
              <InputLabel>아이디</InputLabel>
              <Input {...register("username")} />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
            </FormInputSection>
            <FormInputSection>
              <InputLabel>비밀번호</InputLabel>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </FormInputSection>
            <NavSection>
              <span>회원가입 |</span> <span>비밀번호 재설정</span>
            </NavSection>
            <LoginSection>
              <Button title="로그인" size="small" styles={{ width: "100%" }} />
            </LoginSection>
            <CloseSection>
              <CloseButton
                size="small"
                onClick={onClose}
                icon={<Svg />}
                styles={{ width: "40px", height: "40px" }}
              />
            </CloseSection>
          </ContentSection>
        </ModalBody>
      </ModalContent>
    </Wrapper>
  );
};

export default SignInModal;
const ErrorMessage = styled.span`
  display: block;
  margin-top: 8px;
  color: red;
  font-size: 12px;
`;
const Wrapper = styled(Modal)`
  width: 400px;
`;

const TitleSection = styled(ModalHeader)`
  text-align: center;
  padding: 16px;
`;

const Title = styled.h1`
  ${(props) => props.theme.textStyles.h4}
`;

const ContentSection = styled.form`
  padding: 16px;
`;

const FormInputSection = styled.div`
  margin-bottom: 28px;
`;

const InputLabel = styled.label`
  display: block;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0px 16px;
  border-radius: 100px;
`;

const NavSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const LoginSection = styled.section`
  padding: 16px 0;
`;

const CloseSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const CloseButton = styled(IconButton)`
  background-color: red;
`;
