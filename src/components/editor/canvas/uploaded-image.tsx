import Konva from "konva";
import { useEffect, useRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { isKonvaNode } from "../type-guards";

interface IProps {
  image: Konva.ShapeConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const UploadedImage = ({ image, isSelected, onSelect }: IProps) => {
  const [img] = useImage(image.src);
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    const transformer = trRef.current;
    const image = shapeRef.current;
    const isRender =
      isSelected &&
      isKonvaNode(transformer, Konva.Transformer) &&
      isKonvaNode(image, Konva.Image);
    if (isRender) {
      transformer.nodes([image]);
      transformer.getLayer()?.batchDraw();
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

export default UploadedImage;
