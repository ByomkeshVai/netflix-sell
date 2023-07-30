import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getAllCategory } from "../../../api/item";
import Heading from "../../Shared/Heading";
import StreamingCard from "../Streaming/StreamingCard";
import Loader from "../../Shared/Loader";
import MCoverCard from "./MCoverCard";
import { getMobileCover } from "../../../api/cover";

const Mcover = () => {
  const [params, setParams] = useSearchParams();
  const label = params.get("label");
  const [axiosSecure] = useAxiosSecure();
  const [allItem, setAllItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMobileCover()
      .then((data) => {
        if (label) {
          const filtered = data.filter((classes) => classes.label === label);
          setAllItem(filtered);
        } else {
          setAllItem(data);
        }

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [label]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-screen-xl mx-auto lg:py-10 pb-5">
      {allItem && allItem.length > 0 ? (
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
          {allItem.map((allItem, index) => (
            <MCoverCard key={index} allItem={allItem} />
          ))}
        </div>
      ) : (
        <div className="pt-12">
          <Heading
            title="No Packages Available In This Category!"
            center={true}
          />
        </div>
      )}
    </div>
  );
};

export default Mcover;
