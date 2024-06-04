import styled from "@emotion/styled";
import Button from "../shared/button";

const Canvas = () => {
  return (
    <WorkAreaContainer>
      <Button size="large" title="JPG 또는 JPGE 이미지 불러오기" />
      <Description>또는 여기로 끌어놓기</Description>
    </WorkAreaContainer>
  );
};

export default Canvas;
const WorkAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray10};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  border-radius: 8px;
  max-width: 1440px;
  height: 704px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Description = styled.p`
  ${({ theme }) => theme.textStyles.p};
  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;
`;
