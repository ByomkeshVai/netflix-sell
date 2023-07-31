import React from "react";
import Banner from "../Banner/Banner";
import Hero from "../Hero/Hero";
import HeroCard from "../HeroCard/HeroCard";
import AllPackage from "../Package/AllPackage";
import ClientTesitimonial from "../Testimonial/ClientTesitimonial";
import Support from "../Support/Support";
import TopRated from "../TopRated/TopRated";
import LottieAnimation from "../../Shared/LottieAnimation ";
import { useState } from "react";

const Home = () => {
  return (
    <>
      <div>
        <Banner></Banner>

        <AllPackage></AllPackage>

        <TopRated></TopRated>
      </div>
    </>
  );
};
{
  /* <Support></Support>; */
}
export default Home;
