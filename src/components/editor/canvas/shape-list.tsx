import { useCallback } from "react";
import EditableText from "@/components/editor/canvas/editable-text";
import FreeDrawing from "@/components/editor/canvas/free-drawing";
import useSelectStore from "@/shared/store/select-store";
import { ICanvasLayerProps } from "@/components/editor/canvas/types";
import UploadedImage from "./uploaded-image";
import Emoji from "./emoji";
import { ITextShape } from "@/shared/store/history-store.types";
import useToolbarStore from "@/shared/store/toolbar-store";

const ShapeList = ({ shapes }: ICanvasLayerProps) => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);
  const textTools = useToolbarStore((state) => state.text);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
    },
    [setSelectedId]
  );

  return (
    <>
      {shapes.map((shape, i) => {
        switch (shape.type) {
          case "image":
            return <UploadedImage key={`image-${i}`} image={shape} />;
          case "line":
            return <FreeDrawing key={`line-${i}`} line={shape} />;
          case "text": {
            const textShape = shape as ITextShape;
            if (!textShape.id) return null;

            return (
              <EditableText
                key={textShape.id}
                id={textShape.id}
                shape={textShape}
                fontSize={textTools.fontSizeValue}
                isSelected={selectedId === textShape.id}
                onSelect={handleSelect}
              />
            );
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
