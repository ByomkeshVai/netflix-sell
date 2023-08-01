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
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ForYouFr from "./ForYouFr";
import { HiFire } from "react-icons/Hi";

const ForYou = () => {
  const [countdown, setCountdown] = useState(0);

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(24, 0, 0, 0); // Set target time to the next day at 00:00:00
    const timeLeft = targetTime - now;
    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setCountdown(timeLeft);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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

  return (
    <div className="max-w-full mx-auto mt-8 ">
      <div>
        <div className="lg:ml-32  mx-auto flex lg:gap-10 gap-3 justify-center">
          <div className="flex items-center justify-between  bg-gray-200 lg:px-10 p-2 rounded-xl lg:py-3">
            <h2 className="lg:text-xl flex justify-center items-center gap-1">
              Just For You <HiFire size={28}></HiFire>
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <h2 className="lg:text-xl text-xm mr-5">Ending In:</h2>
            <div className="flex justify-center items-center lg:gap-5 gap-2">
              <div className=" p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-md lg:text-3xl">
                  {formatTime(countdown).split(":")[0]}
                </span>
              </div>
              <div className=" p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-md lg:text-3xl">
                  {formatTime(countdown).split(":")[1]}
                </span>
              </div>
              <div className=" p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-md lg:text-3xl">
                  {formatTime(countdown).split(":")[2]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <Fade damping={0.5} direction="right">
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
                {items?.map((item) => (
                  <SwiperSlide>
                    <ForYouFr item={item} refetch={refetch} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
