import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Pet from "../../../components/Pet";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../../mock/mock";

const BeginTutorialScreen = () => {
  const router = useRouter();
  const username = useQuery({
    queryKey: ["user", "name"],
    queryFn: mockQuery("user/name"),
  });

  function startTutorial() {
    router.push("/welcome/tutorial/introduction");
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary flex-1 justify-center px-4 pb-5">
        <View className="bg-white rounded-lg py-6 mt-8 mb-8">
          <Text className="font-alegra-regular text-2xl text-black text-center">
            ¡Qué bien conocerte! {username.data}
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            ¿Qué te parece si empezamos?
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            Te guiaré en tus primeros pasos
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            en tu camino de meditación.
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            Verás que es más sencillo de lo que
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            crees.
          </Text>
        </View>
        <Pet />
        <Button text={"Continuar"} onPress={startTutorial} />
      </View>
    </SafeAreaView>
  );
};

export default BeginTutorialScreen;
