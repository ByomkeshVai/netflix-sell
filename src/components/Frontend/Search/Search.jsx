import React from "react";
import { useState, useEffect } from "react";
import SearchField from "./SearchField";
import axios from "axios";
import SearchItem from "./SearchItem";
import { GrSearch } from "react-icons/Gr";

const Search = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/all/items`
      );
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
    setSelectedItem(null); // Clear selected item when user starts typing
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="pt-12 ">
        <div className="max-w-full mx-auto flex gap-3 items-center justify-center">
          <input
            type="text"
            placeholder="What are you looking for ..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="py-2 w-4/6 border-2 px-2"
          />
          <button>
            <GrSearch size={26} />
          </button>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto">
          <div className="pt-12">
            {filteredItems.length === 0 ? (
              <p className="text-center text-gray-500">No items found.</p>
            ) : (
              <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                {filteredItems.map((item, index) => (
                  <SearchItem key={index} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
