import { ILineShape } from "@/shared/store/history-store.types";
import { Line } from "react-konva";

interface IProps {
  line: ILineShape;
}

const FreeDrawing = ({ line }: IProps) => {
  return (
    <>
      <Line {...line} tension={0.5} lineCap="round" lineJoin="round" />
    </>
  );
};

export default FreeDrawing;
