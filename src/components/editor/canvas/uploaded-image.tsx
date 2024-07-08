import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import { isKonvaNode } from "../type-guards";
import {
  initializeIndexedDB,
  loadImageFromIndexedDB,
} from "@/shared/services/storage";
import useToolbarStore from "@/shared/store/toolbar-store";
import useImageFilter from "@/shared/hooks/use-image-filter";

interface IProps {
  image: Konva.ShapeConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const UploadedImage = ({ image, isSelected, onSelect }: IProps) => {
  const [imageFile, setImageFile] = useState<HTMLImageElement | null>(null);

  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    const fetchData = async () => {
      const db = await initializeIndexedDB();
      const dataURL = await loadImageFromIndexedDB(db, image.id as string);
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
    const image = imageRef.current;
    const isRender =
      isSelected &&
      isKonvaNode(transformer, Konva.Transformer) &&
      isKonvaNode(image, Konva.Image);
    if (isRender) {
      transformer.nodes([image]);
      transformer.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  useImageFilter({ imageRef });

  return (
    <>
      {imageFile && (
        <Image
          image={imageFile}
          {...image}
          x={image.x}
          y={image.y}
          draggable={false}
          onClick={onSelect}
          onTap={onSelect}
          ref={imageRef}
        />
      )}
    </>
  );
};

export default UploadedImage;
