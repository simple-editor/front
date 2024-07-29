import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-konva";
import {
  initializeIndexedDB,
  loadImageFromIndexedDB,
} from "@/shared/services/storage";
import useImageFilter from "@/shared/hooks/use-image-filter";

interface IProps {
  image: Konva.ShapeConfig;
  // isSelected: boolean;
  // onSelect: () => void;
}

const UploadedImage = ({ image }: IProps) => {
  const [imageFile, setImageFile] = useState<HTMLImageElement | null>(null);

  const imageRef = useRef<Konva.Image>(null);

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

  useImageFilter({ imageRef });

  return (
    <>
      {imageFile && (
        <Image image={imageFile} {...image} draggable={false} ref={imageRef} />
      )}
    </>
  );
};

export default UploadedImage;
