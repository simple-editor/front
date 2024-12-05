import useSelectStore from "@/shared/store/select-store";
import { useCallback, useMemo } from "react";

const useSelect = () => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);

  const handleSelect = useCallback(
    (shapeId: string) => {
      setSelectedId(shapeId);
    },
    [setSelectedId]
  );

  return useMemo(
    () => ({ selectedId, handleSelect }),
    [selectedId, handleSelect]
  );
};

export default useSelect;
