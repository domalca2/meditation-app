import { Text, SafeAreaView, View } from "react-native";
import useTutorial from "../../../../hooks/useTutorial";
import Pet from "../../../../components/Pet";
import SlideButton from "../../../../components/SlideButton";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import MessageBubble from "../../../../components/MessageBubble";

const Name = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { tutorial, hasNext, getNextTutorial } = useTutorial();
  const [sound, setSound] = useState();
  const [soundReady, setSoundReady] = useState(false);
  const [subtitle, setSubtitle] = useState(false);

  function continueTutorial() {
    if (hasNext) {
      router.push(`/tutorial/${getNextTutorial().name}`);
    } else {
      navigation.navigate("tutorial/index");
    }
  }

  useEffect(() => {
    const loadSound = async () => {
      if (tutorial.audio) {
        const soundObj = await Audio.Sound.createAsync(
          tutorial.audio,
          {},
          (status) => {
            if (status.isLoaded) {
              setSoundReady(true);
            }
          },
        );

        setSound(soundObj.sound);
      }
    };

    loadSound();
  }, [tutorial.audio, tutorial.subtitles]);

  useEffect(() => {
    if (sound && soundReady) {
      sound.playAsync();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound, soundReady]);

  /*
   * Workaround for `expo-av` bug which doesn't call onPlaybackStatusUpdate
   * https://github.com/expo/expo/issues/29044
   */
  useEffect(() => {
    const updateSubtitles = setInterval(async () => {
      const status = await sound.getStatusAsync();

      for (const { start, message } of tutorial.subtitles) {
        if (start < status.positionMillis / 1000) {
          setSubtitle(message);
        }
      }
    }, 500);

    return () => {
      clearInterval(updateSubtitles);
    };
  }, [sound]);

  return (
    <SafeAreaView className="bg-primary flex-1 justify-center">
      <View className="flex-1 py-16 flex-col items-center justify-between">
        <Text className="font-alegra-medium text-white text-5xl">
          {tutorial.title}
        </Text>
        <View>
          {subtitle && <MessageBubble text={subtitle} />}
        </View>
        <Pet />
        <SlideButton onPress={continueTutorial} />
      </View>
    </SafeAreaView>
  );
};

export default Name;
