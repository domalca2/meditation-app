import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View className="mt-6 mx-2.5">
        <Text className="text-5xl font-alegra-bold">
          Open up App.js to start working on your app test!
        </Text>
        <Text className="text-3xl font-alegra-regular">
          Open up App.js to start working on your app test!
        </Text>
        <Text className="text-1xl font-alegra-medium">
          Open up App.js to start working on your app test!
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
