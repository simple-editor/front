import useImageUpload from "@/shared/hooks/use-image-upload";
import useHistoryStore from "@/shared/store/history-store";
import styled from "@emotion/styled";
const Upload = () => {
  const { shapes, setShapes } = useHistoryStore((state) => state);
  const { handleButtonUpload } = useImageUpload({
    shapes,
    setShapes,
  });
  
  return (
    <Wrapper>
      <ImageUploadButton>
        Upload Image
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleButtonUpload}
        />
      </ImageUploadButton>
    </Wrapper>
  );
};

export default Upload;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;

`;

const ImageUploadButton = styled.label`
  cursor: pointer;
  display: inline-flex;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 9999em;
  color: #fff;
  font-size: 14px;
  padding: 0 1.5em;
  line-height: 2.25;
  z-index: 10;
  font-weight: 700;
`;
