import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import InfinityScrollCard from "./InfinityScrollCard";
import InfinityScrollItem from "./InfinityScrollItem";
import Loader from "../../Shared/Loader";

const InfinityScroll = () => {
  const [data, setData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/all/items`
      );
      const newData = response.data; // Use response.data to access the JSON data
      // Simulate a 2-second delay
      setTimeout(() => {
        setData(newData);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadMoreItems = () => {
    setItemsToShow(itemsToShow + 10);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={itemsToShow}
        next={loadMoreItems}
        hasMore={itemsToShow < data.length}
        loader={<Loader />}
      >
        <div className="max-w-screen-xl mx-auto mb-10">
          <div className="flex items-center  text-slate-50 bg-gradient-to-r from-red-700 to-red-500 lg:px-10 p-2 rounded-xl lg:py-3">
            <h2 className="text-xl text-center mx-auto  flex justify-center items-center gap-1 font-bold">
              Here is Our Best Products
            </h2>
          </div>
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {data.slice(0, itemsToShow).map((item) => (
              <InfinityScrollItem key={item.id} items={item} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfinityScroll;
