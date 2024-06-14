import Konva from "konva";
import { Line } from "react-konva";

interface IProps {
  lines: Konva.ShapeConfig[];
}

const DrawingLayer = ({ lines }: IProps) => {
  return (
    <>
      {lines.map((line, index) => (
        <Line
          key={index}
          points={line.points}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
        />
      ))}
    </>
  );
};

export default DrawingLayer;
