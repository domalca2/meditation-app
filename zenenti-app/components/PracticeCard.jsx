import { View, Text, Image } from "react-native";
import React from "react";
import frame from "../assets/images/image-card.png";
import arrow from "../assets/images/arrow-right.png";

const PracticeCard = ({ practice }) => {
  return (
    <View className="flex-row mt-5 bg-[#EAEEF6] rounded-lg px-3 py-[10] justify-between ">
      <Image source={frame} />
      <View className="ml-10">
        <Text className="">{practice.name}</Text>
        <Text className="bg-secondary text-center text-white rounded-full px-1 py-1">
          {practice.durationMillis}
        </Text>
        <Text>{practice.category}</Text>
      </View>
      <Image source={arrow} className="w-6 h-6 mt-[25]" />
    </View>
  );
};

export default PracticeCard;
