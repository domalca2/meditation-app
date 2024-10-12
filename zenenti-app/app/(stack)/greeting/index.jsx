import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import Button from "../../../components/Button";
import Pet from "../../../components/Pet";
const mascota = require("../../../assets/images/mascota.png");

const GreetingScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className=" bg-primary flex-1 justify-center px-4">
        <View className="bg-white rounded-lg py-6 mt-8 mb-8">
          <Text className="font-alegra-regular text-2xl text-black text-center">
            Hola! Te doy la bienvenida a Zenenti.
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            Un espacio para conectar contigo.
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            Yo soy Zenti, estoy aquí para
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            acompañarte en esta experiencia
          </Text>
        </View>
        <Pet />
        <Button text={"continuar"} />
      </View>
    </SafeAreaView>
  );
};

export default GreetingScreen;
