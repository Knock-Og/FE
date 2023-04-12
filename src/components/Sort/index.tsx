import { FormControl, Select, MenuItem } from "@mui/material";
import { SortItem } from "types";

interface Props {
  sortItems: SortItem[];
  sort: string;
  setSort: (sort: string) => void;
}

const Sort = ({ sortItems, sort, setSort }: Props) => {
  return (
    <FormControl>
      <Select
        size="small"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">
          <em>-- 정렬 --</em>
        </MenuItem>
        {sortItems.map((item) => (
          <MenuItem
            key={item.itemValue}
            onClick={item.handler}
            value={item.itemValue}
          >
            {item.itemValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Sort;
