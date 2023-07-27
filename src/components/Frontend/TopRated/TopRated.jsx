import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TopRated = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/items`
      );

      return res.data;
    },
  });

  const [selectedTab, setSelectedTab] = useState("topRated");

  const handleTabClick = (tabValue) => {
    setSelectedTab(tabValue);
  };

  // Filter items based on the selected tab type
  const filteredItems = items.filter((item) => item.type === selectedTab);
  const [tabIndex, setTabIndex] = useState(selectedTab);
  console.log(selectedTab);
  return (
    <div className="py-12  ">
      <div className="max-w-screen-2xl mx-auto">
        <div>
          <Tabs
            className="lg:flex "
            defaultIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab
                onClick={() => handleTabClick("topRated")}
                className=" cursor-pointer flex items-center gap-5 border border-2 shadow-xl p-3 px-8 text-xl font-bold hover:translateY(-2px)"
              >
                <button>Top Rated</button>
              </Tab>
              <Tab
                onClick={() => handleTabClick("newArrival")}
                className=" cursor-pointer flex items-center gap-5 border border-2 shadow-xl p-3 px-8 text-xl font-bold hover:translateY(-2px)"
              >
                <button>New Arrival</button>
              </Tab>
              <Tab
                onClick={() => handleTabClick("nowTrending")}
                className=" cursor-pointer flex items-center gap-5 border border-2 shadow-xl p-3 px-8 text-xl font-bold hover:translateY(-2px)"
              >
                <button>Now Trending</button>
              </Tab>
            </TabList>

            <TabPanel>
              {filteredItems.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </TabPanel>
            <TabPanel>
              {filteredItems.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </TabPanel>
            <TabPanel>
              {filteredItems.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
