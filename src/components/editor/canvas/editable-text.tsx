import { useCallback, useState } from "react";
import { Text } from "react-konva";
import EditableTextInput from "./editable-text-Input";
import useHistoryStore from "@/shared/store/history-store";
import { ITextShape } from "@/shared/store/history-store.types";

interface IProps {
  shape: ITextShape;
  isSelected: boolean;
  onSelect: () => void;
}

const EditableText = ({ onSelect, shape }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [points, setPoints] = useState({
    x: shape.x,
    y: shape.y,
  });
  const [textValue, setTextValue] = useState(shape.text || "");
  const updateShape = useHistoryStore((state) => state.updateShape);
  const { id } = shape;

  //텍스트가 편집을 on/Off가 필요한 이벤트가 필요함.

  //텍스트를 업데이트 할 수 있는 함수가 필요함.
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  //바깥을 클릭 시 shape에 텍스트를 저장할 수 있는 이벤트가 필요함
  //enter를 클릭 시 shape에 텍스트를 저장할 수 있는 이벤트가 필요함.

  const handleTextEdit = () => {
    console.log("실행");
    if (typeof id === "string") {
      setIsEdit(true);
      onSelect();
      setTextValue(textValue);
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

  const style = {
    width: shape.width as number,
    height: shape.height as number,
    fontSize: shape.fontSize as number,
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

  return (
    <>
      {!isEdit ? (
        <Text
          {...shape}
          x={points.x}
          y={points.y}
          draggable
          onDblClick={handleTextEdit}
          onDragEnd={handleDragEnd} // 드래그 종료 시 좌표 업데이트
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
