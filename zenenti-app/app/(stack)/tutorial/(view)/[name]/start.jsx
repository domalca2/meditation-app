import { Text, SafeAreaView, View } from "react-native";
import useTutorial from "../../../../../hooks/useTutorial";
import Pet from "../../../../../components/Pet";
import SlideButton from "../../../../../components/SlideButton";
import { useRouter } from "expo-router";

const Start = () => {
  const router = useRouter();
  const tutorial = useTutorial();

  function startTutorial() {
    router.push("./0");
  }

  return (
    <SafeAreaView className="bg-primary flex-1 justify-center">
      <View className="flex flex-col items-center">
        <Text className="font-alegra-medium text-white">
          {tutorial.title}
        </Text>
        <View></View>
        <Pet />
        <SlideButton onPress={startTutorial} />
      </View>
    </SafeAreaView>
  );
};

export default Start;
