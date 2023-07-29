import React from "react";
import { Helmet } from "react-helmet";
import AllLabel from "./AllLabel";
import Streaming from "./Streaming";

const StreamingArea = () => {
  return (
    <>
      <Helmet>
        <title>Stream Cart - All Streaming</title>
      </Helmet>
      {/* <Banner title={"Our All Classes"}></Banner> */}
      <AllLabel></AllLabel>
      <Streaming></Streaming>
    </>
  );
};

export default StreamingArea;
