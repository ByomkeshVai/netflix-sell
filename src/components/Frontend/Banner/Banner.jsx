import React from "react";
import banner2 from "../../../assets/banner/banner2.png";
import Marquee from "react-fast-marquee";
import "../Banner/Banner.css";

const Banner = () => {
  return (
    <>
      <div className="lg:mt-[-310px] mt-[-300px] xl:mt-[-410px] 2xl:mt-[-0px] absolute z-5 ">
        <Marquee>
          <img src={banner2} alt="" className=" lg:mt-[-210px] mt-[-270px]" />
        </Marquee>
      </div>
    </>
  );
};

export default Banner;
