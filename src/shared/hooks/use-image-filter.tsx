import { isKonvaNode } from "@/components/editor/type-guards";
import useToolbarStore from "@/shared/store/toolbar-store";
import Konva from "konva";
import { useEffect } from "react";

const useImageFilter = ({ imageRef }: any) => {
  const { filter } = useToolbarStore((state) => state);

  const applyFilter = (image: Konva.Image, filterType: string) => {
    switch (filterType) {
      case "sepia":
        image.filters([Konva.Filters.Sepia]);
        break;
      case "vintage":
        image.filters([Konva.Filters.Brighten, Konva.Filters.Noise]);
        image.brightness(0.1);
        image.noise(0.3);
        break;
      case "bright":
        image.filters([Konva.Filters.Brighten]);
        image.brightness(0.5);
        break;
      case "cool":
        image.filters([Konva.Filters.RGB]);
        image.red(150);
        image.green(150);
        image.blue(255);
        break;
      case "warm":
        image.filters([Konva.Filters.RGB]);
        image.red(255);
        image.green(150);
        image.blue(150);
        break;
      case "grayscale":
        image.filters([Konva.Filters.Grayscale]);
        break;
      default:
        image.filters([]);
        break;
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (isKonvaNode(image, Konva.Image)) {
      applyFilter(imageRef.current, filter.filterTitle);
      image.cache();
      image?.getLayer()?.batchDraw();
    }
  }, [filter.filterTitle, imageRef]);

  return;
};

export default useImageFilter;
