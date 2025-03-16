import { useCallback } from "react";
import useHistoryStore from "@/shared/store/history-store";
import { ITextShape } from "@/shared/store/history-store.types";

interface TextPanelProps {
  selectedTextId: string | null;
  onFontSizeChange: (size: number) => void;
  stageWidth: number;
  stageHeight: number;
}

const TextPanel: React.FC<TextPanelProps> = ({
  selectedTextId,
  onFontSizeChange,
  stageWidth,
  stageHeight,
}) => {
  const addShape = useHistoryStore((state) => state.addShape);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      onFontSizeChange(newSize);
    }
  };

  const handleAddText = useCallback(() => {
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    const newText: ITextShape = {
      id: `text-${Date.now()}`,
      type: "text",
      x: centerX,
      y: centerY,
      text: "",
      fontSize: 24,
      fontFamily: "Roboto",
      textAlign: "center",
      width: 200,
      height: 50,
      fontStyle: "bold",
    };

    addShape(newText);
  }, [stageWidth, stageHeight, addShape]);

  return (
    <div className="flex items-center gap-4 p-4">
      <button
        onClick={handleAddText}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        텍스트 추가
      </button>
      <input
        type="number"
        min="1"
        max="100"
        onChange={handleSizeChange}
        disabled={!selectedTextId}
        className="w-20 px-2 py-1 border rounded"
      />
    </div>
  );
};

export default TextPanel;
