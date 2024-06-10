import React from "react";
import { Image } from "react-native";
import { Images } from "assets/images";

interface Props {
  isCurrent?: boolean;
}

const CustomPin = ({ isCurrent }: Props) => {
  return (
    <>
      <Image source={isCurrent ? Images.pinSelect : Images.pinNormal} />
    </>
  );
};

export default CustomPin;
