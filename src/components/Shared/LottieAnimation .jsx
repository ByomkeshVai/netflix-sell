import React, { useEffect } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/lottie/loadingarea.json"; // Replace this with the path to your Lottie animation JSON file
import { useState } from "react";
import Lottie from "lottie-react";
import { Lines } from "react-preloaders";

const LottieAnimation = ({ duration, onAnimationComplete }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      onAnimationComplete();
    }, duration);

    return () => {
      clearTimeout(timer);
      // Reset the state when the component is unmounted
      setShowLoader(true);
    };
  }, [duration, onAnimationComplete]);

  return showLoader ? <Lines /> : null;
};

export default LottieAnimation;
