import TransformableImage from "@/components/canvas/transformerble-image";
import EditableText from "@/components/canvas/editable-text";
import FreeDrawing from "@/components/canvas/free-drawing";
import useSelectStore from "@/shared/store/select-store";
import { ICanvasLayerProps } from "@/components/canvas/types";

const CanvasLayer = ({ shapes, handleChange }: ICanvasLayerProps) => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);

  return (
    <>
      {shapes.map((shape) => {
        switch (shape.type) {
          case "image":
            return (
              <TransformableImage
                key={shape.id}
                image={shape}
                isSelected={shape.id === selectedId}
                onSelect={() => setSelectedId(String(shape.id))}
                onChange={handleChange}
              />
            );
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
          // 다른 shape 타입도 추가 가능
          default:
            return null;
        }
      })}
    </>
  );
};

export default CanvasLayer;
