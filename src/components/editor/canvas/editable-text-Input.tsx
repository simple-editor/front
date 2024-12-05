import styled from "@emotion/styled";
import { memo, useCallback, useEffect, useRef } from "react";
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

const EditableTextInput = memo(({ style, ...props }: IProps) => {
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
});

export default EditableTextInput;

interface IStyle {
  styles: IProps["style"];
}

const TextArea = styled("textarea")<IStyle>`
  ${(props) => props.styles}
`;
