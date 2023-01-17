import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { SearchType, searchTypeDescription, searchTypes } from "../types/search";
import { addClassName } from "../utils/utils";
import Button from "./ui/button";

type Props = {
  className?: string;
  onClickSearch: (searchType: SearchType, keyword: string) => void;
};

const SearchGroup = ({ className, onClickSearch }: Props) => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.TitleWithContent);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setOpenDropdown(false));

  const dropdownItems = () => {
    const result: ReactNode[] = [];
    searchTypes.forEach((type) => {
      result.push(
        <li key={`dropdown-item-${type}`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setSearchType(type);
              setOpenDropdown(false);
            }}
          >
            {searchTypeDescription[type]}
          </a>
        </li>
      );
    });
    return result;
  };

  return (
    <div className={`flex${addClassName(className)}`}>
      <div className={`dropdown text-sm ${openDropdown ? "dropdown-open" : ""}`} ref={dropdownRef}>
        <Button tabIndex={0} className="text-sm w-28" onClick={() => setOpenDropdown((prev) => !prev)}>
          {searchTypeDescription[searchType]}
        </Button>
        <ul
          tabIndex={0}
          className={`dropdown-content menu p-1 shadow bg-base-200 text-black dark:text-white rounded-md w-28 
          ${openDropdown ? "" : "hidden"}`}
        >
          {dropdownItems()}
        </ul>
      </div>
      <input
        type="text"
        className="input !outline-none w-full bg-base-300 transition-none mx-3"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={() => {
        setKeyword("");
        onClickSearch(searchType, keyword);
      }}>검색</Button>
    </div>
  );
};

export default SearchGroup;
