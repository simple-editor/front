import styled from "@emotion/styled";
import { SketchPicker } from "react-color";
const ColorPicker = ({ onChange, onToggle, open, color }: any) => {
  return (
    <Wrapper>
      <SubTitle>색상</SubTitle>
      <ColorCircle onClick={onToggle} color={color} />
      {open && <CustomColorPicker color={color} onChangeComplete={onChange} />}
    </Wrapper>
  );
};

export default ColorPicker;

const SubTitle = styled.span`
  ${(props) => props.theme.textStyles.smallText2}
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray70};
  cursor: pointer;
`;

const ColorCircle = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray30};
  margin-bottom: 5px;
  cursor: pointer;
`;

const CustomColorPicker = styled(SketchPicker)`
  position: absolute;
  top: -300px;
`;
