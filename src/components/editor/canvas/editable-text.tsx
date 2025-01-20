import { useCallback, useState } from "react";
import { Text } from "react-konva";
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
  const [points, setPoints] = useState({
    x: shape.x,
    y: shape.y,
  });
  const [textValue, setTextValue] = useState(shape.text || "");
  const updateShape = useHistoryStore((state) => state.updateShape);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleTextEdit = () => {
    setIsEdit(true);
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleTextSave = useCallback(() => {
    setIsEdit(false);
    console.log(textValue, "textValue");
    updateShape({
      ...shape,
      x: points.x as number,
      y: points.y as number,
      text: textValue,
    });
  }, [points.x, points.y, shape, textValue, updateShape]);

  function handleEscapeKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      toggleEdit();
    }
  }

  const style = {
    width: shape.width as number,
    height: shape.height as number,
    fontSize: fontSize,
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      handleTextSave();
    }
  };

  const handleDragEnd = (e: any) => {
    setPoints({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };
  console.log(`EditableText ID: ${id}, fontSize: ${fontSize}`);
  return (
    <>
      {!isEdit ? (
        <Text
          {...shape}
          x={points.x}
          y={points.y}
          draggable
          onDblClick={handleTextEdit}
          onDragEnd={handleDragEnd}
          fontSize={fontSize}
          onClick={handleClick}
          stroke={isSelected ? "#0096FF" : "transparent"}
          strokeWidth={1}
        />
      ) : (
        <EditableTextInput
          x={points.x as number}
          y={points.y as number}
          style={style}
          value={textValue}
          onChange={handleTextChange}
          onKeyDown={handleEscapeKeys}
          onToggle={toggleEdit}
        />
      )}
    </>
  );
};

export default EditableText;
