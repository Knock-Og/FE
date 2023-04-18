import { SortItem } from "types";

interface Props {
  sortItems: SortItem[];
  sort: string;
  setSort: (sort: string) => void;
}

const Sort = ({ sortItems, sort, setSort }: Props) => {
  return (
    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="">-- 정렬 --</option>
      {sortItems.map((item) => (
        <option
          key={item.itemValue}
          value={item.itemValue}
          onClick={item.handler}
        >
          {item.itemValue}
        </option>
      ))}
    </select>
  );
};

export default Sort;
