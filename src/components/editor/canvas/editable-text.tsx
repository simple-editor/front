import { useCallback, useState, useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";
import EditableTextInput from "./editable-text-Input";
import useHistoryStore from "@/shared/store/history-store";
import { ITextShape } from "@/shared/store/history-store.types";

interface EditableTextProps {
  fontSize: number;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  id: string;
  shape: ITextShape;
}

const EditableText: React.FC<EditableTextProps> = ({
  fontSize,
  onSelect,
  isSelected,
  id,
  shape,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [position, setPosition] = useState({
    x: shape.x || 0,
    y: shape.y || 0,
  });
  const [text, setText] = useState(shape.text || "");
  const [originalText, setOriginalText] = useState(shape.text || "");
  const updateShape = useHistoryStore((state) => state.updateShape);

  const textRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }

    if (!isSelected && isEdit) {
      handleTextSave();
    }
  }, [isSelected]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleTextClick = useCallback(() => {
    if (onSelect) {
      onSelect(id);
    }
  }, [id, onSelect]);

  const handleTextDblClick = useCallback(() => {
    setIsEdit(true);
    setOriginalText(text);
    if (onSelect) {
      onSelect(id);
    }
  }, [id, onSelect, text]);

  const handleTextSave = useCallback(() => {
    const finalText = text;
    setText(finalText);
    setOriginalText(finalText);
    setIsEdit(false);

    const node = textRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const width = Math.max(200, node.width() * (scaleX || 1));

    updateShape({
      ...shape,
      x: position.x,
      y: position.y,
      text: finalText,
      fontStyle: "bold",
      width,
      height: Math.max(50, fontSize * 1.5),
    });
  }, [position.x, position.y, shape, text, updateShape, fontSize]);

  const handleTextCancel = useCallback(() => {
    setIsEdit(false);
  }, []);

  const handleDragEnd = useCallback(
    (e: any) => {
      const node = e.target;
      const newX = node.x();
      const newY = node.y();
      setPosition({ x: newX, y: newY });

      const width = Math.max(200, node.width() * (node.scaleX() || 1));

      updateShape({
        ...shape,
        x: newX,
        y: newY,
        text: text,
        fontStyle: "bold",
        width,
        height: Math.max(50, fontSize * 1.5),
      });
    },
    [shape, text, updateShape, fontSize]
  );

  const handleTransformEnd = useCallback(() => {
    const node = textRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const width = Math.max(200, node.width() * scaleX);

    // 크기 조절 후 스케일 초기화
    node.scaleX(1);
    node.scaleY(1);

    updateShape({
      ...shape,
      x: node.x(),
      y: node.y(),
      width,
      height: Math.max(50, fontSize * 1.5),
      rotation: node.rotation(),
      fontStyle: "bold",
    });
  }, [shape, updateShape, fontSize]);

  const handlePositionChange = useCallback((newX: number, newY: number) => {
    setPosition({ x: newX, y: newY });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleTextCancel();
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleTextSave();
      }
    },
    [handleTextSave, handleTextCancel]
  );

  const textStyle = {
    width: Math.max(200, text.length * fontSize * 0.7),
    height: Math.max(50, fontSize * 1.5),
    fontSize,
    fontFamily: shape.fontFamily || "Roboto",
    textAlign: (shape.textAlign || "left") as "left" | "center" | "right",
    fontStyle: "bold" as "normal" | "bold" | "italic",
  };

  return (
    <>
      {!isEdit ? (
        <>
          <Text
            {...shape}
            ref={textRef}
            x={position.x}
            y={position.y}
            text={text}
            fontSize={fontSize}
            fontFamily={shape.fontFamily}
            align={shape.textAlign}
            fontStyle="bold"
            draggable
            onClick={handleTextClick}
            onTap={handleTextClick}
            onDblClick={handleTextDblClick}
            onDblTap={handleTextDblClick}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
            stroke={isSelected ? "#0096FF" : "transparent"}
            strokeWidth={1}
            padding={8}
            width={Math.max(200, textStyle.width)}
            height={textStyle.height}
            wrap="word"
          />
          {isSelected && (
            <Transformer
              ref={transformerRef}
              enabledAnchors={["middle-left", "middle-right"]}
              boundBoxFunc={(oldBox, newBox) => {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
              }}
            />
          )}
        </>
      ) : (
        <EditableTextInput
          x={position.x}
          y={position.y}
          style={textStyle}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onToggle={handleTextSave}
          onPositionChange={handlePositionChange}
        />
      )}
    </>
  );
};

export default EditableText;
