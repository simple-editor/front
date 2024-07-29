import { useEffect } from "react";
import useHistoryStore from "../store/history-store";

const useKeybordAction = ({
  selectedId,
  cancelSelection,
}: {
  selectedId: string | null;
  cancelSelection: () => void;
}) => {
  const deleteShape = useHistoryStore((state) => state.deleteShape);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace")
        if (typeof selectedId === "string") {
          deleteShape(selectedId);
          cancelSelection();
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deleteShape, selectedId]);
};

export default useKeybordAction;
