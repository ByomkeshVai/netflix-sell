import React, { useRef, useState } from "react";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.jpg";
// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
} from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BiLinkExternal, BiMoviePlay, BiPhoneCall } from "react-icons/Bi";
import { TbBrandNetflix } from "react-icons/Tb";
import { AiOutlinePaperClip } from "react-icons/Ai";
import { GrFacebook } from "react-icons/Gr";
import { Link } from "react-router-dom";
import { ImWhatsapp } from "react-icons/Im";

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
            delay: 5000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          }}
          modules={[Autoplay, Pagination, Navigation, EffectCreative]}
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
              <div className="hero-content text-center text-neutral-content text-center">
                <div className="lg:max-w-full 2xl:max-w-full xl:max-w-full max-w-md mt-[-270px]">
                  <h1 className="mb-5 lg:text-7xl 2xl:text-7xl text-5xl font-bold font-sriracha text-gray-900 tracking-wide">
                    Your Entertainment Partner
                  </h1>
                </div>
              </div>
              <div className="button-area lg:flex lg:justify-between mx-auto lg:items-center gap-10 mt-[310px] text-xl">
                <p className=" flex items-center gap-2 text-gray-900 font-arial">
                  <AiOutlinePaperClip size={20} className="font-red-600" />
                  <a
                    href="//streamcartbd.com"
                    target="_blank"
                    className="text-center"
                  >
                    streamcartbd.com
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-900 font-arial text-xl">
                  <BiPhoneCall size={20} className="font-red-600" />
                  <a href="tel:+8809638882345" className="text-center">
                    +880 96388 82345
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-900 font-arial text-xl">
                  <ImWhatsapp size={20} className="font-red-600" />
                  <a href="https://wa.me/01635034289" className="text-center">
                    +880 1518347673
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-900 font-arial text-xl">
                  <GrFacebook size={20} className="font-red-600" />
                  <a
                    href="//www.facebook.com/streamcartbangladesh"
                    target="_blank"
                    className="text-center"
                  >
                    www.facebook.com/streamcartbangladesh
                  </a>
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
