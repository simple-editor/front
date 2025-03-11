import { ILineShape } from "@/shared/store/history-store.types";
import { Line } from "react-konva";

interface IProps {
  line: ILineShape;
}

const FreeDrawing = ({ line }: IProps) => {
  return (
    <Line
      {...line}
      tension={0.4}
      lineCap="round"
      lineJoin="round"
      shadowColor="rgba(0,0,0,0.05)"
      shadowBlur={1}
      shadowOffsetX={0.5}
      shadowOffsetY={0.5}
    />
  );
};

export default FreeDrawing;
