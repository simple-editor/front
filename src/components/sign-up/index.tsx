import styled from "@emotion/styled";
import Button from "@/shared/ui/button";
import DropDown from "@/shared/ui/drop-down";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const data = [
  {
    title: "당신이 나온 초등학교의 이름은?",
    value: 1,
  },
  {
    title: "당신의 별명은?",
    value: 2,
  },
  {
    title: "당신이 현재 사는 지역의 동은?",
    value: 3,
  },
  {
    title: "당신이 나온 중학교의 이름은?",
    value: 4,
  },
  {
    title: "당신의 제일 친한 친구는?",
    value: 5,
  },
  {
    title: "당신이 나온 고등학교의 이름은?",
    value: 6,
  },
  {
    title: "당신이 사용하는 핸드폰의 기종은?",
    value: 7,
  },
];
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  hintAnswer: yup.string().required("비밀번호 힌트 답을 입력하세요."),
});

const SignUp = () => {
  const [selected, setSelected] = useState(data[0]);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // 회원가입 로직 추가
  };

  const handleClick = (item: { title: string; value: number | string }) => {
    if (typeof item.value === "number") {
      setSelected({
        title: item.title,
        value: item.value,
      });
    }
  };

  return (
    <Wrapper>
      <TitleSection>
        <Title>회원가입</Title>
      </TitleSection>
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
        <FormInputSection>
          <InputLabel>비밀번호 확인</InputLabel>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </FormInputSection>
        <FormInputSection>
          <InputLabel>비밀번호 재설정 힌트</InputLabel>
          <DropDown
            data={data}
            onClick={handleClick}
            selected={selected}
            customStyles={{ width: "100%" }}
          />
        </FormInputSection>
        <FormInputSection>
          <InputLabel>힌트 답</InputLabel>
          <Input {...register("hintAnswer")} />
          {errors.hintAnswer && (
            <ErrorMessage>{errors.hintAnswer.message}</ErrorMessage>
          )}
        </FormInputSection>
        <Button title="회원가입" size="small" />
      </ContentSection>
    </Wrapper>
  );
};

export default SignUp;
const ErrorMessage = styled.span`
  display: block;
  margin-top: 8px;
  color: red;
  font-size: 12px;
`;
const Wrapper = styled.div`
  max-width: 480px;
  margin: auto;
  button {
    width: 100%;
  }
`;

const TitleSection = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  ${(props) => props.theme.textStyles.h4}
`;

const ContentSection = styled.form``;

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
