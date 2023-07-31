import animationData from "../../assets/lottie/loadingarea.json";
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="preloader">
      {loading ? (
        <Lottie options={defaultOptions} height={200} width={200} />
      ) : null}
    </div>
  );
};

export default Preloader;
