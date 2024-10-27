import { Text, SafeAreaView, View } from "react-native";
import useTutorial from "../../../../hooks/useTutorial";
import Pet from "../../../../components/Pet";
import SlideButton from "../../../../components/SlideButton";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import MessageBubble from "../../../../components/MessageBubble";
import Button from "../../../../components/Button";

const Name = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { tutorial, hasNext, getNextTutorial } = useTutorial();
  const [sound, setSound] = useState(null);
  const [subtitle, setSubtitle] = useState("");

  const continueTutorial = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    setSubtitle("");

    if (hasNext) {
      router.push(`/tutorial/${getNextTutorial().name}`);
    } else {
      navigation.navigate("tutorial/index");
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      if (tutorial.audio) {
        const { sound } = await Audio.Sound.createAsync(
          tutorial.audio,
          { shouldPlay: true }
        );
        setSound(sound);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [tutorial.audio]);

  useEffect(() => {
    const updateSubtitles = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          for (const { start, message } of tutorial.subtitles) {
            if (start <= status.positionMillis / 1000) {
              setSubtitle(message);
            }
          }
        }
      }
    }, 500);

    return () => clearInterval(updateSubtitles);
  }, [sound]);

  const stopAndSkipToEnd = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    setSubtitle("");
    navigation.navigate("tutorial/index");
  };

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

        <Button
          text="Omitir"
          onPress={stopAndSkipToEnd}
          styleType="secondary"
        />

        <SlideButton onPress={continueTutorial} />
      </View>
    </SafeAreaView>
  );
};

export default Name;
