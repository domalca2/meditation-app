import React from "react";
import { Image, SafeAreaView, Text, View, FlatList } from "react-native";
import { mockQuery } from "../../../mock/mock";
import { useQuery } from "@tanstack/react-query";

import circle from "../../../assets/images/patata.jpg";
import flor from "../../../assets/images/flor-sugerencias.png";
import PracticeCard from "../../../components/PracticeCard";

const Home = () => {
  const usernameQuery = useQuery({
    queryFn: mockQuery("user/name"),
    queryKey: ["user", "name"],
  });
  const practices = useQuery({
    queryFn: mockQuery("practice/practices"),
    queryKey: ["practice", "practices"],
  });

  return (
    <SafeAreaView className="flex-1 px-4 py-14 bg-bgMain">
      <View className="flex flex-col">
        {usernameQuery.isSuccess && (
          <View>
            <Text className="w-full font-alegra-medium text-4xl">
              <Text className="font-bold">Hola, </Text>
              <Text>{usernameQuery.data}</Text>
            </Text>
          </View>
        )}
        <View className="flex flex-row mt-6 justify-evenly">
          <Image source={circle} className="w-14 h-16" />
          <View className="max-sm:m-3 justify-center">
            <Text>"Dar no nos empobrece, ni retener nos enriquece"B.K.S</Text>
          </View>
        </View>
        <Text className="font-alegra-medium text-2xl mt-[25]">
          ¿Qué necesitas hoy?
        </Text>
        <View className="flex bg-primary mt-5 mb-5 flex-row w-[150] p-2 justify-evenly rounded-full">
          <Image className="w-5 h-5" source={flor} />
          <Text className="text-white">Sugerencias</Text>
        </View>
        <FlatList
          contentContainerStyle={{ gap: 15 }}
          data={practices.data}
          keyExtractor={(practice) => practice.durationMillis}
          renderItem={({ item }) => <PracticeCard practice={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
