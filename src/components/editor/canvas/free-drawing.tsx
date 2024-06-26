import Konva from "konva";
import { Line } from "react-konva";

interface IProps {
  line: Konva.ShapeConfig;
}

const FreeDrawing = ({ line }: IProps) => {
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
};

export default FreeDrawing
