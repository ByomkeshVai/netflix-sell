import React, { useRef, useState } from "react";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.jpg";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BiMoviePlay } from "react-icons/Bi";
import { TbBrandNetflix } from "react-icons/Tb";

const Banner = () => {
  return (
    <>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-[700px]"
        >
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage: `url(${banner2})`,
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl mt-[-270px]">
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
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl mt-[-270px]">
                  <h1 className="mb-5 text-5xl font-bold">
                    Buy Air Ticket at a low Price, A world to share!
                  </h1>
                  <p className="mb-5">Plans now start at USD2.99/month.</p>
                  <div className="button-area flex justify-center gap-10">
                    <button className="btn rounded-xl border-0 btn-error text-slate-50 bg-gradient-to-r from-sky-700 to-blue-500 ">
                      <TbBrandNetflix size={20} className="font-red-600" />
                      Let's Fly
                    </button>
                    <button className="btn rounded-xl border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
                      <BiMoviePlay size={20} /> Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage: `url(${banner3})`,
              }}
            >
              <div className=""></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl mt-[-270px]">
                  {/* <h1 className="mb-5 text-5xl font-bold">
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
                  </div> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
