import styled from "@emotion/styled";
import { useCallback, useEffect, useRef } from "react";
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
  onToggle: any;
}

const EditableTextInput = ({ style, ...props }: IProps) => {
  const { x, y, onChange, value, onKeyDown, onToggle } = props;
  const textAreaRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        textAreaRef.current &&
        !textAreaRef.current.contains(event.target as Node)
      )
        onToggle();
    },
    [onToggle]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <div ref={textAreaRef}>
        <TextArea
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
          styles={style}
        />
      </div>
    </Html>
  );
};

export default EditableTextInput;

interface IStyle {
  styles: IProps["style"];
}

const TextArea = styled("textarea")<IStyle>`
  ${(props) => props.styles};
  border: none;
  border: 3px solid rgba(150, 150, 150, 0.5); /* 얇고 부드러운 테두리 */
  background: rgba(255, 255, 255, 0.1); /* 반투명 배경 */
  color: #333; /* 텍스트 색상 */
  outline: none;
  resize: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* 모던한 그림자 */
  font-family: "Roboto", sans-serif; /* 모던한 폰트 */
  padding: 4px 8px;
  border-radius: 8px; /* 모서리 둥글게 */
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    background: rgba(255, 255, 255, 0.3); /* 포커스 시 밝게 */
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3); /* 포커스 시 그림자 강조 */
  }

  &::placeholder {
    color: rgba(150, 150, 150, 0.7); /* 플레이스홀더 색상 */
    font-style: italic;
  }
`;
