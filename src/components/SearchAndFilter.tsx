type Props = {
  categories: string[];
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
};

const SearchAndFilter = ({ categories, onSearch, onFilter }: Props) => (
  <div className="search-filter-bar">
    <input
      type="text"
      className="search-input"
      placeholder="Search products..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <select className="filter-select" onChange={(e) => onFilter(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default SearchAndFilter;
