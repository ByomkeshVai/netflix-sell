import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MLabelBox from "./MLabelBox";

const MAllLabel = () => {
  const [params, setParams] = useSearchParams();
  const label = params.get("label");
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/mobileCover`
      );

      return res.data;
    },
  });
  return (
    <div className="py-5">
      <div className="max-w-screen-xl mx-auto ">
        <div className=" flex gap-10 lg:gap-10 flex-row items-center justify-center overflow-x-auto ">
          {categories.map((item) => (
            <MLabelBox
              label={item.label}
              icon={item.image}
              key={item._id}
              selected={label === item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MAllLabel;
