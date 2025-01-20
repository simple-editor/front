interface TextPanelProps {
  selectedTextId: string | null;
  onFontSizeChange: (size: number) => void;
}

const TextPanel: React.FC<TextPanelProps> = ({
  selectedTextId,
  onFontSizeChange,
}) => {
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      onFontSizeChange(newSize);
    }
  };

  return (
    <div>
      <input
        type="number"
        min="1"
        max="100"
        onChange={handleSizeChange}
        disabled={!selectedTextId}
      />
    </div>
  );
};

export default TextPanel;
