import styled from "@emotion/styled";
import { Html } from "react-konva-utils";

interface IProps {
  style: {
    fontSize: number;
    width: number;
    height: number;
  };
  value: string;
  x: number;
  y: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const EditableTextInput = ({ style, ...props }: IProps) => {
  const { x, y, onChange, value, onKeyDown } = props;
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <TextArea
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
        styles={style}
      />
    </Html>
  );
};

export default EditableTextInput;

interface IStyle {
  styles: IProps["style"];
}

const TextArea = styled("textarea")<IStyle>`
  ${(props) => props.styles}
`;
