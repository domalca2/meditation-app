import { View, Image } from "react-native";
import React from "react";
const mascota = require("../assets/images/mascota.png");

const Pet = () => {
  return (
    <View className=" bg-primary flex-1 justify-center px-4">
      <View className="flex justify-center align-middle flex-row">
        <Image source={mascota} />
      </View>
    </View>
  );
};
export default Pet;
