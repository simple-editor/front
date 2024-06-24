import { useEffect, useState } from "react";
import useToolbarStore from "../store/toolbar-store";

const useCrop = ({ imageShape }) => {
  const crop = useToolbarStore((state) => state.crop);
  const setCropTools = useToolbarStore((state) => state.setCropTools);
  const [croppedWidth, setCroppedWidth] = useState(null);
  const [croppedHeight, setCroppedHeight] = useState(null);

  useEffect(() => {
    const initializeCrop = () => {
      if (imageShape) {
        setCropTools({
          x: imageShape.x,
          y: imageShape.y,
          width: imageShape.width,
          height: imageShape.height,
        });
      }
    };
    if (imageShape) {
      initializeCrop();
    }
  }, [imageShape, setCropTools]);
  return { crop, setCropTools };
};

export default useCrop;
