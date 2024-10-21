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
    <SafeAreaView className="flex-1">
      <View className="bg-primary flex-1 flex-col items-center">
        <Text>{tutorial.title}</Text>
        <View></View>
        <Pet />
        <SlideButton onPress={startTutorial} />
      </View>
    </SafeAreaView>
  );
};

export default Start;
