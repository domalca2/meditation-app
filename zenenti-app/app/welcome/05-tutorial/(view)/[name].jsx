// Create transition
import { Text, SafeAreaView, View } from "react-native";
import useTutorial from "../../../../hooks/useTutorial";
import Pet from "../../../../components/Pet";
import SlideButton from "../../../../components/SlideButton";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import MessageBubble from "../../../../components/MessageBubble";
import Button from "../../../../components/Button";
import AudioPlayer from "../../../../components/AudioPlayer";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const Name = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { tutorial, hasNext, getNextTutorial } = useTutorial();
  const [playAudio, setPlayAudio] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const translateY = useSharedValue(0);

  const continueTutorial = async () => {
    setPlayAudio(false);
    setSubtitle("");

    if (hasNext) {
      router.push(`/welcome/05-tutorial/${getNextTutorial().name}`);
    } else {
      navigation.navigate("05-tutorial/index");
    }
  };

  const stopAndSkipToEnd = async () => {
    setPlayAudio(false);
    setSubtitle("");
    navigation.navigate("05-tutorial/index");
  };

  const onPlaybackProgress = (seconds) => {
    for (const { start, message } of tutorial.subtitles) {
      if (start <= seconds) {
        setSubtitle(message);
      }
    }
  };

  useEffect(() => {
    setPlayAudio(true);
    return () => setPlayAudio(false);
  }, [setPlayAudio]);

  const handleNextTutorial = () => {
    translateY.value = withSpring(-500, { damping: 25, stiffness: 100 });

    setTimeout(() => {
      continueTutorial();
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
    <SafeAreaView className="bg-primary flex-1 justify-center py-20">
      <Animated.View style={[{ flex: 3 }, animatedStyle]}>
        <View className="flex-1 flex-col items-center">
          <View className="flex flex-row w-full items-center justify-between px-5">
            <Text className="h-full w-1/4" />
            <View className="h-full w-1/2">
              <Text className="text-center font-alegra-medium text-white text-5xl">
                {tutorial.title}
              </Text>
              <Text className="heading">{tutorial.title}</Text>
            </View>
            <View className="h-full w-1/4">
              <Button
                text="Omitir"
                onPress={stopAndSkipToEnd}
                styleType="secondary"
              />
            </View>
          </View>
          <View className="w-full px-5">
            {subtitle && <MessageBubble text={subtitle} />}
          </View>
          <View className="w-full px-5">
            <AudioPlayer
              audio={tutorial.audio}
              shouldPlay={playAudio}
              onProgress={onPlaybackProgress}
            />
          </View>
          <Pet />
          <SlideButton onPress={handleNextTutorial} />
          </View>

          <View className="flex-1 items-center justify-center my-15">
            <Pet />
          </View>

          <View className="w-full px-5">
            <AudioPlayer
              audio={tutorial.audio}
              shouldPlay={playAudio}
              onProgress={onPlaybackProgress}
            />
          </View>

          <View className="w-full px-5">
            {subtitle && <MessageBubble text={subtitle} />}
          </View>

          <SlideButton onPress={continueTutorial} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Name;
