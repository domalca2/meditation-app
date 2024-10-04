import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <View className=" bg-primary p-10 flex-1">
        <Text className="text-5xl text-center font-alegra-bold text-secondary">
          Respira profundamente
        </Text>
        <Text className="text-3xl font-alegra-regular">
          Empieza un nuevo camino
        </Text>
        <Text className="text-1xl font-alegra-medium text-bgMain">
          Open up App.js to start working on your app test!
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
