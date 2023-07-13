import React from "react";
import HeroSingleCard from "./HeroSingleCard";
import { BiCameraMovie } from "react-icons/Bi";

const HeroCard = () => {
  return (
    <div className="flex items-center justify-center gap-5 py-8">
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
      <HeroSingleCard
        image={"https://cdn-icons-png.flaticon.com/512/2798/2798007.png"}
        title={"Enjoy on your TV"}
        description={
          "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
        }
      ></HeroSingleCard>
    </div>
  );
};

export default HeroCard;
