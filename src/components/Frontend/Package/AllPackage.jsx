import React from "react";
import { Link } from "react-router-dom";
import SectionHead from "../../Shared/SectionHead";
import { useSearchParams } from "react-router-dom";
import { categories } from "../../Category/CategoryData";
import PackageFR from "./PackageFR";

const AllPackage = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <SectionHead slogan={"Our Top Packages"}></SectionHead>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {categories.map((item) => (
            <PackageFR
              label={item.label}
              description={item.description}
              img={item.image}
              key={item.label}
              selected={category === item.label}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPackage;
