import React, { useState } from "react";
import { Link } from "react-router-dom";
import SectionHead from "../../Shared/SectionHead";
import { useSearchParams } from "react-router-dom";
import { categories } from "../../Category/CategoryData";
import PackageFR from "./PackageFR";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { JackInTheBox } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const AllPackage = () => {
  const [showAll, setShowAll] = useState(false);
  const [params, setParams] = useSearchParams();
  const handleShowAll = () => {
    setShowAll(true);
  };

  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: category = [] } = useQuery({
    queryKey: ["category"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/streaming`
      );

      return res.data;
    },
  });

  const swiperOptions = {
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    initialSlide: 1, // Make the first content start in the middle
    effect: "coverflow", // Use 'coverflow' effect for 3D transition
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 50, // Change this value to control the 3D rotation degree
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <SectionHead slogan={"Our Top Packages"}></SectionHead>
        <JackInTheBox damping={0.5} direction="right">
          <div className="pt-12 ">
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 80 },
                480: { slidesPerView: 1, spaceBetween: 50 },
                768: { slidesPerView: 2, spaceBetween: 50 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              slidesPerView={3}
              spaceBetween={20}
              effect={"coverflow"}
              centeredSlides={1}
              grabCursor={true}
              loop={true}
              coverflowEffect={{
                rotate: 30,
                stretch: -50,
                depth: 90,
                modifier: 1,
                slideShadows: false,
                shallowReactive: 10,
              }}
              pagination={true}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {category?.map((item) => (
                <SwiperSlide>
                  <PackageFR
                    label={item.label}
                    description={item.description}
                    img={item.image}
                    key={item.label}
                    selected={category === item.label}
                    refetch={refetch}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </JackInTheBox>
      </div>
    </>
  );
};

export default AllPackage;

// {!showAll && (
//   <button
//     onClick={handleShowAll}
//     disabled={showAll}
//     className="btn btn-lg rounded-md w-full mx-auto text-center mt-8"
//   >
//     See All
//   </button>
// )}

// ?.slice(0, showAll ? categories?.length : 4)
//             ?
