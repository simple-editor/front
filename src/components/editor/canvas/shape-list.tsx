import EditableText from "@/components/editor/canvas/editable-text";
import FreeDrawing from "@/components/editor/canvas/free-drawing";
import useSelectStore from "@/shared/store/select-store";
import { ICanvasLayerProps } from "@/components/editor/canvas/types";
import UploadedImage from "./uploaded-image";
import Emoji from "./emoji";

const ShapeList = ({ shapes }: ICanvasLayerProps) => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);

  return (
    <>
      {shapes.map((shape) => {
        switch (shape.type) {
          case "image":
            return <UploadedImage key={shape.id} image={shape} />;
          case "line":
            return <FreeDrawing line={shape} key={shape.id} />;
          case "text":
            return (
              <EditableText
                key={shape.id}
                shape={shape}
                isSelected={shape.id === selectedId}
                onSelect={() => setSelectedId(String(shape.id))}
              />
            );
          case "emoji":
            return <Emoji key={shape.id} shape={shape} />;
          // 다른 shape 타입도 추가 가능
          default:
            return null;
        }
      })}
    </>
  );
};

export default ShapeList;
