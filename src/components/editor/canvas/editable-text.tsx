import { useCallback, useEffect, useState } from "react";
import { Text } from "react-konva";
import EditableTextInput from "./editable-text-Input";
import useHistoryStore, { ITextShape } from "@/shared/store/history-store";

interface IProps {
  shape: ITextShape;
  isSelected: boolean;
  onSelect: () => void;
}

const EditableText = ({ isSelected, onSelect, shape }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [points, setPoints] = useState({
    x: shape.x,
    y: shape.y,
  });
  const [textValue, setTextValue] = useState(shape.text);
  const updateShape = useHistoryStore((state) => state.updateShape);
  const { id } = shape;

  //텍스트가 편집을 on/Off가 필요한 이벤트가 필요함.
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  //텍스트를 업데이트 할 수 있는 함수가 필요함.
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  //바깥을 클릭 시 shape에 텍스트를 저장할 수 있는 이벤트가 필요함
  //enter를 클릭 시 shape에 텍스트를 저장할 수 있는 이벤트가 필요함.

  const handleTextEdit = () => {
    if (typeof id === "string") {
      setIsEdit(true);
      onSelect();
      setTextValue(shape.text);
    }
  };

  const handleTextSave = useCallback(() => {
    setIsEdit(false);
    updateShape({
      ...shape,
      x: points.x as number,
      y: points.y as number,
      text: textValue,
    });
  }, [points.x, points.y, shape, textValue, updateShape]);

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleTextSave();
  //   }
  // };

  function handleEscapeKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "enter") {
      toggleEdit();
    }
  }

  useEffect(() => {
    if (!isSelected && isEdit) {
      handleTextSave();
    }
  }, [handleTextSave, isEdit, isSelected]);

  const style = {
    width: shape.width as number,
    height: shape.height as number,
    fontSize: shape.fontSize as number,
  };

  return (
    <>
      {!isEdit ? (
        <Text
          {...shape}
          x={points.x}
          y={points.y}
          draggable
          onClick={handleTextEdit}
          onDragEnd={(e) => {
            setPoints({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          // onDblClick={handleTextClick}
          // onDblTap={handleTextClick}
        />
      ) : (
        <EditableTextInput
          x={points.x as number}
          y={points.y as number}
          style={style}
          value={textValue}
          onChange={handleTextChange}
          onKeyDown={handleEscapeKeys}
        />
      )}
    </>
  );
};

export default EditableText;
