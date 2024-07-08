import useToolbarStore from "@/shared/store/toolbar-store";

const FilterPanel = () => {
  const {
    filter: { filterTitle },
    setFilterTools,
  } = useToolbarStore((state) => state);

  return (
    <select
      value={filterTitle}
      onChange={(e) => setFilterTools({ filterTitle: e.target.value })}
    >
      <option value="default">기본</option>
      <option value="sepia">세피아</option>
      <option value="vintage">빈티지</option>
      <option value="bright">밝게</option>
      <option value="cool">차갑게</option>
      <option value="warm">따뜻하게</option>
      <option value="grayscale">그레이</option>
    </select>
  );
};

export default FilterPanel;
