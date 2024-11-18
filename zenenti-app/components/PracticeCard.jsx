import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import frame from "../assets/images/image-card.png";
import arrow from "../assets/images/arrow-right.png";
import { createLocalTimeString } from "../util/time";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../mock/mock";

const PracticeCard = ({ practice, onPress }) => {
  const category = useQuery({
    queryFn: mockQuery(`practice/categories/${practice.categoryId}`),
    queryKey: ["practice", "categories", practice.categoryId],
  });

  const type = useQuery({
    queryFn: mockQuery(`practice/types/${practice.typeId}`),
    queryKey: ["practice", "types", practice.typeId],
  });

  return (
    <Pressable
      className="flex-row bg-[#EAEEF6] rounded-lg px-3 py-3 gap-x-5"
      onPress={onPress}
    >
      <View className="flex justify-center items-center border-2 rounded-2xl border-primary py-4 px-10">
        <Image className="w-16 h-16" source={frame} />
      </View>
      <View className="flex-grow">
        <Text className="font-alegra-medium text-xl">{practice.name}</Text>
        <View className="bg-secondary rounded-full p-2 self-start">
          <Text className="font-alegra-medium text-white">
            {createLocalTimeString(practice.durationMillis)} Min
          </Text>
        </View>
        {category.isSuccess && type.isSuccess && (
          <Text className="font-alegra-medium">
            {category.data.title} - {type.data.title}
          </Text>
        )}
      </View>
      <View className="flex justify-center">
        <Image source={arrow} className="w-6 h-6" />
      </View>
    </Pressable>
  );
};

export default PracticeCard;
