import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Pet from "../../../components/Pet";
import SlideButton from "../../../components/SlideButton";
import { useRouter,useNavigation } from "expo-router";
import { useQuery } from "@tanstack/react-query";
// import { mockQuery } from "../../../mock/mock";
import { useEffect } from "react";
import Animated,{
  withSpring,
  useSharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import { createQuery } from "../../../query/query";

const BeginTutorialScreen = () => {
  const router = useRouter();
  const user = useQuery({
    queryKey: ["user"],
    queryFn: createQuery("/private/user"),
  });

  function startTutorial() {
    router.push("/welcome/05-tutorial/introduction");
  }
  const translateY = useSharedValue(0);

  const navigation = useNavigation();

  const handlerstarTutorial = () => {
    translateY.value = withSpring(-500, { damping: 25, stiffness: 100 });

    setTimeout(() => {
      startTutorial();
    }, 300);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      translateY.value = 0; 
    });
  
    const unsubscribeBlur = navigation.addListener("blur", () => {
      translateY.value = 0; 
    });
  
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1">
      <Animated.View style={[{ flex: 3 }, animatedStyle]}>
      <View className="bg-primary flex-1 justify-center px-4 pb-5">
        <View className="bg-white rounded-lg py-6 mt-8 mb-8">
          <Text className="font-alegra-regular text-2xl text-black text-center">
            ¡Qué bien conocerte! {user.data?.name}
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
        <View className="w-full flex items-center mt-4">
          <SlideButton onPress={handlerstarTutorial} />
        </View>
      </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default BeginTutorialScreen;
