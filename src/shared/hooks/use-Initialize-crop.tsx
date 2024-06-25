import { useEffect, useState } from "react";
import useToolbarStore from "../store/toolbar-store";

const useInitializeCrop = ({ imageShape }) => {
  const setCropTools = useToolbarStore((state) => state.setCropTools);

  useEffect(() => {
    const initializeCrop = () => {
      if (imageShape) {
        setCropTools({
          x: imageShape.x,
          y: imageShape.y,
          width: imageShape.width / 2,
          height: imageShape.height / 2,
        });
      }
    };
    if (imageShape) {
      initializeCrop();
    }
  }, [imageShape, setCropTools]);
  return;
};

export default useInitializeCrop
