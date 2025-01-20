import EditableText from "@/components/editor/canvas/editable-text";
import FreeDrawing from "@/components/editor/canvas/free-drawing";
import useSelectStore from "@/shared/store/select-store";
import { ICanvasLayerProps } from "@/components/editor/canvas/types";
import UploadedImage from "./uploaded-image";
import Emoji from "./emoji";
import { ITextShape } from "@/shared/store/history-store.types";

const ShapeList = ({ shapes }: ICanvasLayerProps) => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);

  return (
    <>
      {shapes.map((shape) => {
        switch (shape.type) {
          case "image":
            return <UploadedImage key={shape.id} image={shape} />;
          case "line":
            return <FreeDrawing key={shape.id} line={shape} />;
          case "text": {
            if (shape.id) {
              const textShape: ITextShape = shape;
              const fontSize = textShape.fontSize ?? 16;

              return (
                <EditableText
                  key={textShape.id}
                  shape={textShape}
                  fontSize={fontSize}
                  id={textShape.id as string}
                  isSelected={textShape.id === selectedId}
                  onSelect={(id: string) => setSelectedId(id)}
                />
              );
            }
            return null;
          }
          case "emoji":
            return (
              <Emoji
                key={shape.id}
                shape={shape}
                onSelect={() => setSelectedId(String(shape.id))}
              />
            );
          // 다른 shape 타입도 추가 가능
          default:
            return null;
        }
      })}
    </>
  );
};

export default ShapeList;
