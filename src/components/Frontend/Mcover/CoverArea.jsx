import React from "react";
import { Helmet } from "react-helmet";
import MAllLabel from "./MAllLabel";
import Mcover from "./Mcover";

const CoverArea = () => {
  return (
    <>
      <Helmet>
        <title>Stream Cart - Mobile Cover</title>
      </Helmet>
      {/* <Banner title={"Our All Classes"}></Banner> */}
      <MAllLabel></MAllLabel>
      <Mcover></Mcover>
    </>
  );
};

export default CoverArea;
