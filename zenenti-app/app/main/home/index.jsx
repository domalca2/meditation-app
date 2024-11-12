import { Image, SafeAreaView, Text, View, FlatList } from "react-native";
import { mockQuery } from "../../../mock/mock";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import circle from "../../../assets/images/patata.png";
import flor from "../../../assets/images/flor-sugerencias.png";
import PracticeCard from "../../../components/PracticeCard";

const Home = () => {
  const router = useRouter();

  const username = useQuery({
    queryFn: mockQuery("user/name"),
    queryKey: ["user", "name"],
  });

  const practices = useQuery({
    queryFn: mockQuery("practice/practices"),
    queryKey: ["practice", "practices"],
  });

  const quotes = useQuery({
    queryFn: mockQuery("quotes"),
    queryKey: ["quotes"],
  });

  const startPractice = (id) => {
    router.push(`/practice/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-14 bg-bgMain">
      <View className="flex flex-col">
        {username.isSuccess && (
          <View>
            <Text className="w-full font-alegra-medium text-4xl">
              <Text className="font-bold">Hola, </Text>
              <Text>{username.data}</Text>
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
            {quotes.isSuccess && (
              <Text className="font-alegra-medium color-[#626161] text-l w-3/4">
                {quotes.data[Math.floor(Math.random() * quotes.data.length)]}
              </Text>
            )}
          </View>
        </View>
        <Text className="font-alegra-medium text-2xl">¿Qué necesitas hoy?</Text>
        <View className="flex bg-primary mt-5 mb-5 flex-row w-[150] p-2 justify-evenly rounded-full">
          <Image className="w-5 h-5" source={flor} />
          <Text className="text-white">Sugerencias</Text>
        </View>
        {practices.isSuccess && (
          <FlatList
            contentContainerStyle={{ gap: 15 }}
            data={practices.data}
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
