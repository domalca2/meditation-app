import { SafeAreaView, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import useTutorial from "../../../../../hooks/useTutorial";
import MessageBubble from "../../../../../components/MessageBubble";
import useTutorialStep from "../../../../../hooks/useTutorialStep";
import Pet from "../../../../../components/Pet";
import SlideButton from "../../../../../components/SlideButton";

const TutorialScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const tutorial = useTutorial();
  const { index, step, hasNextStep } = useTutorialStep();

  useEffect(() => {
    navigation.setOptions({ title: tutorial.title });
  }, [navigation, tutorial.title]);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1 flex-col items-center">
        <View className="w-full py-14 px-4">
          <MessageBubble text={step.message} />
        </View>
        <Pet />
        <SlideButton
          onPress={() => {
            if (hasNextStep) {
              router.push(`./${index + 1}`);
            } else {
              // Required to navigate out of the nested context
              navigation.navigate("tutorial/index");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TutorialScreen;
