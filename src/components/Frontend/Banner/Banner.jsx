import React from "react";
import banner2 from "../../../assets/banner/banner2.png";
import Marquee from "react-fast-marquee";
import "../Banner/Banner.css";

const Banner = () => {
  return (
    <>
      <div className="mt-[-320px] absolute z-5 ">
        <Marquee>
          <img src={banner2} alt="" className=" mt-[-290px]" />
        </Marquee>
      </div>
    </>
  );
};

export default Banner;
