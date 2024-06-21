import Konva from "konva";
import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

interface IProps {
  image: Konva.ShapeConfig;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newImage: Konva.ShapeConfig) => void;
}

const TransformerbleImage = ({
  image,
  isSelected,
  onSelect,
  onChange,
}: IProps) => {
  const [img] = useImage(image.src);
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()!.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={img}
        {...image}
        x={image.x}
        y={image.y}
        draggable={false}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TransformerbleImage;
