import { View, Text, Image, Pressable } from "react-native";
import { createRoundedLocalTimeString } from "../util/time";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../mock/mock";
import { useState } from "react";
import arrow from "../assets/images/ui/arrow-right.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PracticeCard = ({ practice, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const category = useQuery({
    queryFn: mockQuery(`practice/categories/${practice.categoryId}`),
    queryKey: ["practice", "categories", practice.categoryId],
  });

  const type = useQuery({
    queryFn: mockQuery(`practice/types/${practice.typeId}`),
    queryKey: ["practice", "types", practice.typeId],
  });

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Pressable
      className="flex-row bg-[#EAEEF6] rounded-lg px-3 py-3 gap-x-5"
      onPress={onPress}
    >
      <View className="flex justify-center items-center border-2 rounded-2xl border-primary py-4 px-10">
        {category.isSuccess && (
          <Image className="w-14 h-14" source={category.data.icon.card} />
        )}
        <View className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow w-7 h-7 flex items-center justify-center translate-x-2 translate-y-2">
          <Pressable onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={18}
              color="black"
            />
          </Pressable>
        </View>
      </View>
      <View className="flex-grow">
        <Text className="font-alegra-medium text-xl">{practice.name}</Text>
        <View className="bg-secondary rounded-full p-2 self-start">
          <Text className="font-alegra-medium text-white">
            {createRoundedLocalTimeString(practice.durationMillis)} Min
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
