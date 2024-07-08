import { useEffect } from "react";
import useToolbarStore from "../store/toolbar-store";
import { isCropShape, isImageShape } from "@/components/editor/type-guards";

const useInitializeCropPos = ({ shapes }: any) => {
  const setCropTools = useToolbarStore((state) => state.setCropTools);
  const imageShape = shapes.find(isImageShape);
  const cropedLayers = shapes.filter(isCropShape);
  const cropedLayerSize = cropedLayers[cropedLayers.length - 1];

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

  return { cropedLayerSize, imageShape };
};

export default useInitializeCropPos;
