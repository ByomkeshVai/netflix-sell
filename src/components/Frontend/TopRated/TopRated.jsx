import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BsFire } from "react-icons/Bs";
import { FaPlaneArrival } from "react-icons/Fa";
import { HiTrendingUp } from "react-icons/Hi";
import EachTop from "./EachTop";
import Marquee from "react-fast-marquee";
import "../TopRated/custom.css";
import SectionHead from "../../Shared/SectionHead";
import { Fade } from "react-awesome-reveal";

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
  return (
    <Fade>
      <Tabs
        className="max-w-full mx-auto flex text-center flex-col gap-5 py-10 tabs-boxed mx-auto justify-center shadow-xl "
        defaultIndex={0}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="lg:flex mx-auto lg:gap-10 py-3 flex-col lg:flex-row gap-10 ">
          <Tab
            onClick={() => handleTabClick("topRated")}
            className={`p-2 rounded-xl cursor-pointer flex items-center gap-5 border border-2 shadow-xl text-xl font-bold ${
              selectedTab === "topRated" ? "tab-actives" : ""
            }`}
          >
            <button className="flex items-center gap-5 px-2 ">
              <BsFire size={28} className="" />
              <h2 className="text-md font-bold ">Top Rated</h2>
            </button>
          </Tab>
          <Tab
            onClick={() => handleTabClick("newArrival")}
            className={`p-2 rounded-xl  cursor-pointer flex items-center gap-5 border border-2  shadow-xl  px-8 text-xl font-bold ${
              selectedTab === "newArrival" ? "tab-actives2" : ""
            }`}
          >
            <button className="flex items-center gap-5 px-2">
              <FaPlaneArrival size={28} className="" />
              <h2 className="text-md font-bold ">New Arrival</h2>
            </button>
          </Tab>
          <Tab
            onClick={() => handleTabClick("nowTrending")}
            className={`p-2 rounded-xl  cursor-pointer flex items-center gap-5 border border-2 shadow-xl  px-8 text-xl font-bold  ${
              selectedTab === "nowTrending" ? "tab-actives3" : ""
            }`}
          >
            <button className="flex items-center gap-5 px-2">
              <HiTrendingUp size={28} className="" />
              <h2 className="text-md font-bold "> Now Trending</h2>
            </button>
          </Tab>
        </TabList>

        <TabPanel className="flex items-center gap-10">
          <Marquee pauseOnHover={true}>
            {filteredItems.map((item) => (
              <EachTop key={item.id} item={item} />
            ))}
          </Marquee>
        </TabPanel>
        <TabPanel className="flex items-center gap-5">
          <Marquee pauseOnHover={true}>
            {filteredItems.map((item) => (
              <EachTop key={item.id} item={item} />
            ))}
          </Marquee>
        </TabPanel>
        <TabPanel className="flex items-center gap-5">
          <Marquee pauseOnHover={true}>
            {filteredItems.map((item) => (
              <EachTop key={item.id} item={item} />
            ))}
          </Marquee>
        </TabPanel>
      </Tabs>
    </Fade>
  );
};

export default TopRated;
