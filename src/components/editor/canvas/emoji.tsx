import { Text } from "react-konva";
import useHistoryStore from "@/shared/store/history-store";
import { IEmojiShape } from "@/shared/store/canvas-ref.types";

interface IProps {
  shape: IEmojiShape;
}

const Emoji = ({ shape }: IProps) => {
  const updateShape = useHistoryStore((state) => state.updateShape);

  return (
    <>
      <Text
        {...shape}
        draggable
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
};

export default Emoji;
