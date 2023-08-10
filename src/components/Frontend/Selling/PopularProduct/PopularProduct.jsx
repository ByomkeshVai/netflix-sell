import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fade, JackInTheBox } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight } from "react-icons/Fi";
import PopularProductFr from "./PopularProductFr";

const PopularProduct = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: popular = [] } = useQuery({
    queryKey: ["popular"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/items/flashSale/popularProduct`
      );

      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-8 ">
      <div>
        <div className=" mx-auto flex lg:justify-between justify-center gap-10   ">
          <div className="flex items-center  text-slate-50 bg-gradient-to-r from-blue-700 to-blue-500 lg:px-10 p-2 rounded-xl lg:py-3">
            <h2 className="text-xl  flex justify-center items-center gap-1 font-bold">
              Popular Product
            </h2>
          </div>
          <button className="border-2 border  border-blue-400 hover:bg-blue-500">
            {popular?.slice(0, 1).map((popular) => (
              <Link to={`showAll/${popular.option}`}>
                {" "}
                <h2 className="text-sm font-bold px-5 ">Show All</h2>
              </Link>
            ))}
          </button>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="pt-12 ">
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 5 },
                480: { slidesPerView: 1, spaceBetween: 5 },
                768: { slidesPerView: 3, spaceBetween: 5 },
                1024: { slidesPerView: 4, spaceBetween: 5 },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              slidesPerView={4}
              spaceBetween={5}
              grabCursor={true}
              loop={true}
              pagination={true}
              modules={[Autoplay, EffectCoverflow]}
              className="mySwiper"
            >
              {popular?.map((popular) => (
                <SwiperSlide>
                  <PopularProductFr popular={popular} refetch={refetch} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
