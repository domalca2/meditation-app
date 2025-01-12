import { View, Text, Image, Pressable } from "react-native";
import { createRoundedLocalTimeString } from "../util/time";
import { useQuery } from "@tanstack/react-query";
// import { mockQuery } from "../mock/mock";
import { useState } from "react";
import { createQuery } from "../query/query";
import arrow from "../assets/images/ui/arrow-right.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PracticeCard = ({ practice, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const category = useQuery({
    queryFn: createQuery(`/private/category/${practice.categoryId}`),
    queryKey: ["category", practice.categoryId],
  });

  const type = useQuery({
    queryFn: createQuery(`/private/practice-type/${practice.practiceTypeId}`),
    queryKey: ["practice-type", practice.practiceTypeId],
  });

  const categoryIcon = useQuery({
    queryFn: createQuery(`/private/asset/${category.data?.iconCardUrl}`, {
      raw: true,
    }),
    queryKey: ["category", practice.categoryId, "icon"],
    enabled: category.isSuccess,
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
        {categoryIcon.isSuccess && (
          <Image className="w-14 h-14" source={categoryIcon.data} />
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
