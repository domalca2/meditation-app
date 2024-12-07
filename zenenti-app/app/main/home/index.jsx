import { Image, SafeAreaView, Text, View, FlatList } from "react-native";
import { mockQuery } from "../../../query/mock";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { createQuery } from "../../../query/query";

import circle from "../../../assets/images/patata.png";
import flor from "../../../assets/images/flor-sugerencias.png";
import PracticeCard from "../../../components/PracticeCard";
import DurationSorter from "../../../components/DurationSorter";

const Home = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("descending");

  const user = useQuery({
    queryFn: createQuery("/private/user"),
    queryKey: ["user"],
  });

  const practices = useQuery({
    queryFn: mockQuery("practice/practices"),
    queryKey: ["practice", "practices"],
  });

  const quote = useQuery({
    queryFn: mockQuery("quotes/0"),
    queryKey: ["quotes", 0],
  });

  const startPractice = (id) => {
    router.push(`/practice/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-14 bg-bgMain">
      <View className="flex flex-col">
        {user.isSuccess && (
          <View>
            <Text className="w-full font-alegra-medium text-4xl">
              <Text className="font-bold">Hola, </Text>
              <Text>{user.data.name}</Text>
            </Text>
          </View>
        )}
        <View className="flex flex-row py-10">
          <View className="flex items-center justify-center bg-quaternary rounded-full p-2">
            <View className="bg-bgMain rounded-full p-5">
              <Image className="w-16 h-16" source={circle} />
            </View>
          </View>
          <View className="flex-grow justify-center items-center">
            {quote.isSuccess && (
              <Text className="flex flex-col font-alegra-medium color-[#626161] text-l w-3/4">
                <Text>{quote.data.message}</Text>
                {"\n"}
                <Text className="font-bold">{quote.data.author}</Text>
              </Text>
            )}
          </View>
        </View>
        <Text className="font-alegra-medium text-2xl">¿Qué necesitas hoy?</Text>
        <View className="flex flex-row justify-between items-center">
          <View className="flex bg-primary mt-5 mb-5 flex-row w-[150] p-2 justify-evenly rounded-full">
            <Image className="w-5 h-5" source={flor} />
            <Text className="text-white">Sugerencias</Text>
          </View>
          <DurationSorter
            sortOrder={sortOrder}
            onChangeSortOrder={(order) => {
              setSortOrder(order);
            }}
          />
        </View>
        {practices.isSuccess && (
          <FlatList
            contentContainerStyle={{ gap: 15 }}
            data={practices.data.sort((a, b) => {
              if (sortOrder === "ascending") {
                return a.durationMillis - b.durationMillis;
              } else {
                return b.durationMillis - a.durationMillis;
              }
            })}
            keyExtractor={(practice) => practice.durationMillis}
            renderItem={({ item }) => (
              <PracticeCard
                practice={item}
                onPress={() => {
                  startPractice(item.id);
                }}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
