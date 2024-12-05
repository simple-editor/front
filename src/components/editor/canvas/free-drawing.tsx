import { ILineShape } from "@/shared/store/history-store.types";
import { memo } from "react";
import { Line } from "react-konva";

interface IProps {
  line: ILineShape;
}

const FreeDrawing = memo(({ line }: IProps) => {
  return (
    <>
      <Line
        points={line.points}
        stroke={line.stroke}
        strokeWidth={line.strokeWidth}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
      />
    </>
  );
});

export default FreeDrawing;
