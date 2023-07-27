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

const AllPackage = () => {
  const [showAll, setShowAll] = useState(false);
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  const handleShowAll = () => {
    setShowAll(true);
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <SectionHead slogan={"Our Top Packages"}></SectionHead>
        <JackInTheBox damping={0.1} direction="right">
          <div className="pt-12 ">
            <Swiper
              loop={true}
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
              spaceBetween={10}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 70,
                stretch: 100,
                depth: -90,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {categories?.map((item) => (
                <SwiperSlide>
                  <PackageFR
                    label={item.label}
                    description={item.description}
                    img={item.image}
                    key={item.label}
                    selected={category === item.label}
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
