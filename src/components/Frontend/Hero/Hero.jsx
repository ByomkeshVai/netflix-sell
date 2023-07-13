import React from "react";
import { TbBrandNetflix } from "react-icons/Tb";
import { BiMoviePlay } from "react-icons/Bi";
const Hero = () => {
  return (
    <div className="hero min-h-screen xl:mt-[-412px] mt-[-384px] relative z-20">
      <div className="hero-overlay bg-opacity-60 "></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-4xl mb-[-340px]">
          <h1 className="mb-5 text-5xl font-bold">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="mb-5">Plans now start at USD2.99/month.</p>
          <div className="button-area flex justify-center gap-10">
            <button className="btn rounded-xl border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
              <TbBrandNetflix size={20} className="font-red-600" />
              Netflix
            </button>
            <button className="btn rounded-xl border-0 btn-error text-slate-50 bg-gradient-to-r from-blue-700 to-blue-500">
              <BiMoviePlay size={20} /> Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
