import useSelectStore from "@/shared/store/select-store";

const useSelect = () => {
  const { selectedId, setSelectedId } = useSelectStore((state) => state);

  const handleSelect = (shapeId: string) => {
    setSelectedId(shapeId);
  };

  return { selectedId, handleSelect };
};

export default useSelect;
