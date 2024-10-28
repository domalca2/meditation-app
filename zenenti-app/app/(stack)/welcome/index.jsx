import { View, Text, SafeAreaView, Image, StatusBar } from "react-native";
import React from "react";
import Button from "../../../components/Button";
import { router } from "expo-router";

const WelcomeScreen = () => {
  const brand = require("../../../assets/images/brand.png");
  const logo = require("../../../assets/images/logo-zenenti.png");
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary flex-1 py-14 pb-5">
        <View className="px-14 items-center justify-center">
          <Image source={logo} />
        </View>
        <View className="px-14 items-center justify-center">
          <Image source={brand} />
        </View>
        <View className="px-7 my-11 ">
          <Text className="text-2xl text-center font-alegra-medium text-white">
            Respira profundamente
          </Text>
          <Text className="text-2xl text-center font-alegra-medium text-white">
            Empieza un nuevo camino
          </Text>
        </View>
        <Button text={"comienza"} onPress={() => router.push("/greeting")} />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
