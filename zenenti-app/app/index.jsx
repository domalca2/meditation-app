import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";
const brand = require("../assets/images/brand.png");
const logo = require("../assets/images/logo-zenenti.png");

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <View className=" bg-primary flex-1 py-14">
        <View className="px-14">
          <Image source={logo} />
        </View>
        <View className="px-12">
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
        <Button text={"comienza"} />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
