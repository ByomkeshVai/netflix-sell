import React from "react";
import HeroSingleCard from "./HeroSingleCard";
import { BiCameraMovie } from "react-icons/Bi";

const HeroCard = () => {
  return (
    <div className="max-w-screen-xl mx-auto xl:mt-10">
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        <HeroSingleCard
          image={"https://cdn-icons-png.flaticon.com/512/2798/2798007.png"}
          title={"Get Free Trail"}
          description={
            "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
          }
        ></HeroSingleCard>
        <HeroSingleCard
          image={"https://cdn-icons-png.flaticon.com/512/2798/2798007.png"}
          title={"Bangladeshi Payment Gateway"}
          description={
            "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
          }
        ></HeroSingleCard>
        <HeroSingleCard
          image={"https://cdn-icons-png.flaticon.com/512/2798/2798007.png"}
          title={"Affordable Price Range"}
          description={
            "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
          }
        ></HeroSingleCard>
        <div className="lg:hidden xl:hidden 2xl:block">
          <HeroSingleCard
            image={"https://cdn-icons-png.flaticon.com/512/2798/2798007.png"}
            title={"Enjoy on your TV"}
            description={
              "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
            }
          ></HeroSingleCard>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
