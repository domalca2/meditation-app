import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View className="mt-6 mx-2.5 bg-primary p-10">
        <Text className="text-5xl font-alegra-bold text-secondary">
          Open up App.js to start working on your app test!
        </Text>
        <Text className="text-3xl font-alegra-regular">
          Open up App.js to start working on your app test!
        </Text>
        <Text className="text-1xl font-alegra-medium text-bgMain">
          Open up App.js to start working on your app test!
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
