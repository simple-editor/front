import EditableText from "@/components/canvas/editable-text";
import FreeDrawing from "@/components/canvas/free-drawing";
import useSelectStore from "@/shared/store/select-store";
import { ICanvasLayerProps } from "@/components/canvas/types";
import UploadedImage from "./uploaded-image";

const CanvasLayer = ({ shapes }: ICanvasLayerProps) => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);

  return (
    <>
      {shapes.map((shape) => {
        switch (shape.type) {
          case "image":
            return (
              <UploadedImage
                key={shape.id}
                image={shape}
                isSelected={shape.id === selectedId}
                onSelect={() => setSelectedId(String(shape.id))}
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
