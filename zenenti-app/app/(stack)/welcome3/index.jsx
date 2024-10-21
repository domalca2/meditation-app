import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import Pet from "../../../components/Pet";
import Button from "../../../components/Button";

const Welcome3Screen = () => {
  const { name } = useContext(UserContext);
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary flex-1 justify-center px-4">
        <View className="bg-white rounded-lg py-6 mt-8 mb-8">
          <Text className="font-alegra-regular text-2xl text-black text-center">
            !Qué bien conocerte! {name}
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
        <Button text={"Continuar"} />
      </View>
    </SafeAreaView>
  );
};

export default Welcome3Screen;
