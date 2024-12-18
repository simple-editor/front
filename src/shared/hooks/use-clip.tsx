import { useEffect } from "react";
import Konva from "konva";

const useClip = (layer: Konva.Layer | null, data: any[]) => {
  useEffect(() => {
    if (!layer) return;

    // shapes 배열에서 최신 clip 상태 찾기
    const clipShape = data.reverse().find((shape) => shape.type === "crop");

    if (clipShape) {
      // clip 적용

      layer.clip({ ...clipShape });
      console.log("Clip Applied:", clipShape);
    } else {
      // clip 초기화
      layer.clip(null as any); // 아무 인자도 전달하지 않음
      console.log("Clip Reset");
    }

    // 변경 사항 반영
    layer.batchDraw();
  }, [layer, data]); // layer 또는 data가 변경될 때 실행
};

export default useClip;
