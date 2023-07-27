import React from "react";
import Banner from "../Banner/Banner";
import Hero from "../Hero/Hero";
import HeroCard from "../HeroCard/HeroCard";
import AllPackage from "../Package/AllPackage";
import ClientTesitimonial from "../Testimonial/ClientTesitimonial";
import Support from "../Support/Support";
import TopRated from "../TopRated/TopRated";

const Home = () => {
  return (
    <>
      <Banner></Banner>

      <AllPackage></AllPackage>

      <TopRated></TopRated>
    </>
  );
};
{
  /* <Support></Support>; */
}
export default Home;
