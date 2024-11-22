import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Image, Pressable, Text, View } from "react-native";
import { createLocalTimeString } from "../util/time";

const AudioPlayer = ({
  audio,
  isPrimaryTheme,
  onProgress,
  onStateChange,
  shouldPlay = true,
}) => {
  const [state, setState] = useState("idle");
  const [sound, setSound] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [playbarLayout, setPlaybarLayout] = useState({});

  // Configuración de imágenes y colores según el tema
  const playButton = isPrimaryTheme
    ? require("../assets/images/ui/play-button-black.png")
    : require("../assets/images/ui/play-button-secondary.png");

  const pauseButton = isPrimaryTheme
    ? require("../assets/images/ui/pause-button-black.png")
    : require("../assets/images/ui/pause-button-secondary.png");

  const progressBarColor = isPrimaryTheme ? "bg-black" : "bg-secondary";
  const textColor = isPrimaryTheme ? "text-black" : "text-white"; // Color de texto dinámico

  const setPlaying = async (play) => {
    if (sound) {
      if (play) {
        await sound.playAsync();
      } else {
        await sound.pauseAsync();
      }
    }
  };

  const doPlayPause = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      await setPlaying(!status.isPlaying);
    }
  };

  const handleTouch = async (e) => {
    if (sound) {
      e.persist();
      await sound.pauseAsync();
      const localX = e.nativeEvent.pageX - playbarLayout.x - 15;
      const playbackPercent = localX / playbarLayout.width;
      const scrollTo = Math.floor(
        Math.max(0, Math.min(playbackPercent * audioDuration, audioDuration)),
      );
      setPlaybackSeconds(scrollTo);
    }
  };

  const handleTouchEnd = async (e) => {
    e.persist();
    await sound.setPositionAsync(playbackSeconds * 1000);
    await sound.playAsync();
  };

  // Sound handler
  useEffect(() => {
    const loadSound = async () => {
      if (audio) {
        const { sound } = await Audio.Sound.createAsync(
          audio,
          { shouldPlay },
          (status) => {
            setAudioDuration(status.durationMillis / 1000);
            if (status.isPlaying) {
              setState("playing");
            }
          },
        );
        setSound(sound);
        setState("loaded");
      } else {
        setState("idle");
      }
    };

    loadSound();
  }, [audio]);

  useEffect(() => {
    const unloadSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }
      setState("idle");
    };

    return () => unloadSound();
  }, [sound]);

  useEffect(() => {
    const update = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          setPlaybackSeconds(status.positionMillis / 1000);
          setState("playing");
        } else {
          setState("paused");
        }
      }
    }, 100);
    return () => clearInterval(update);
  }, [sound]);

  useEffect(() => {
    if (onProgress) {
      onProgress(playbackSeconds);
    }
  }, [onProgress, playbackSeconds]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [onStateChange, state]);

  useEffect(() => {
    setPlaying(shouldPlay);
  }, [sound, shouldPlay]);

  return (
    <View className="w-full flex-row gap-5 items-center">
      <Pressable onPress={doPlayPause} className="w-10 h-10">
        <Image
          className="w-full h-full"
          source={state === "playing" ? pauseButton : playButton}
        />
      </Pressable>
      <View
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouchEnd}
        onLayout={(e) => {
          setPlaybarLayout(e.nativeEvent.layout);
        }}
        className={`h-5 flex-grow rounded-full relative overflow-hidden`}
      >
        <View className="bg-white opacity-15 w-full h-full rounded-full absolute" />
        <View
          style={{ width: `${(playbackSeconds / audioDuration) * 100}%` }}
          className={`${progressBarColor} h-full rounded-full absolute`}
        />
      </View>
      <View className="flex flex-row">
        <Text className={`font-roboto-mono-regular ${textColor} text-l`}>
          {createLocalTimeString(playbackSeconds * 1000)}
        </Text>
        <Text className={`font-roboto-mono-regular ${textColor} text-l`}>
          {" / "}
        </Text>
        <Text className={`font-roboto-mono-regular ${textColor} text-l`}>
          {createLocalTimeString(audioDuration * 1000)}
        </Text>
      </View>
    </View>
  );
};

export default AudioPlayer;
