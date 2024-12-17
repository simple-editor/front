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
  }, [image.id, image.src]);

  useImageFilter({ imageRef });

  // const hRatio = stageRef.current?.width() / image.width;
  // const vRatio = stageRef.current?.height() / image.height;
  // const ratio = Math.min(hRatio, vRatio);
  // const imageWidth = image.width * ratio;
  // const imageHeight = image.height * ratio;
  // const xOffset = (stageRef.current?.width() - imageWidth) / 2;
  // const yOffset = (stageRef.current?.height() - imageHeight) / 2;

  return (
    <>
      {imageFile && (
        <Image
          ref={imageRef}
          image={imageFile}
          draggable={false}
          // width={imageWidth}
          // height={imageHeight}
          // x={xOffset}
          // y={yOffset}
        />
      )}
    </>
  );
};

export default UploadedImage;
