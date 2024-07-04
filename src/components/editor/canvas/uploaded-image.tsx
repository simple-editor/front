import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import { isKonvaNode } from "../type-guards";
import {
  initializeIndexedDB,
  loadImageFromIndexedDB,
} from "@/shared/services/storage";

interface IProps {
  image: Konva.ShapeConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const UploadedImage = ({ image, isSelected, onSelect }: IProps) => {
  const [imageFile, setImageFile] = useState<HTMLImageElement | null>(null);
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    const fetchData = async () => {
      const db = await initializeIndexedDB();
      const dataURL = await loadImageFromIndexedDB(db, image.id);
      const img = new window.Image();
      img.src = dataURL as string;
      img.onload = () => {
        setImageFile(img);
      };
    };
    fetchData();
  }, [image.src]);
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
        image={imageFile}
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
