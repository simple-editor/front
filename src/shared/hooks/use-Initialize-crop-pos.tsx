import { useEffect } from "react";
import useToolbarStore from "../store/toolbar-store";
import { isCropShape, isImageShape } from "@/components/editor/type-guards";

const useInitializeCropPos = ({ shapes }: any) => {
  const setCropTools = useToolbarStore((state) => state.setCropTools);
  const imageShape = shapes.find(isImageShape);
  const cropedLayerFilter = shapes.filter(isCropShape);
  const currentLayerSize = cropedLayerFilter[cropedLayerFilter.length - 1];

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

  return { currentLayerSize, imageShape };
};

export default useInitializeCropPos;
