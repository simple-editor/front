import { Text } from "react-konva";
import useHistoryStore from "@/shared/store/history-store";
import { IEmojiShape } from "@/shared/store/history-store.types";
import { memo } from "react";

interface IProps {
  shape: IEmojiShape;
  onSelect: () => void;
}

const Emoji = memo(({ shape, onSelect }: IProps) => {
  const updateShape = useHistoryStore((state) => state.updateShape);

  return (
    <>
      <Text
        {...shape}
        draggable
        onClick={onSelect}
        onTab={onSelect}
        onDragEnd={(e) => {
          updateShape({
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        // onDblClick={handleTextClick}
        // onDblTap={handleTextClick}
      />
    </>
  );
});

export default Emoji;
