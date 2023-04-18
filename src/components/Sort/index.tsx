import { SortItem } from "types";

interface Props {
  sortItems: SortItem[];
  sort: string;
  setSort: (sort: string) => void;
}

const Sort = ({ sortItems, sort, setSort }: Props) => {
  return (
    <select
      value={sort}
      onChange={(e) => {
        setSort(e.target.value);
        sortItems[parseInt(e.target.value)].handler();
      }}
    >
      <option value="">-- 정렬 --</option>
      {sortItems.map((item, idx) => (
        <option key={item.itemValue} value={idx}>
          {item.itemValue}
        </option>
      ))}
    </select>
  );
};

export default Sort;
