import React from "react";
import animationData from "../assets/my-league-lottie.json";
import { useLottie } from "lottie-react";
export default function IntroAnimation() {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options);
  return <>{View}</>;
}
