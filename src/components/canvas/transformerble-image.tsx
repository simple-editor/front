import Konva from "konva";
import { useEffect, useRef } from "react";
import { Image } from "react-konva";
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
      />
    </>
  );
};

export default TransformerbleImage;
