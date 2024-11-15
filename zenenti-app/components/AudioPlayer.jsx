import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Image, Pressable, Text, View } from "react-native";

const AudioPlayer = ({
  audio,
  onProgress,
  onStateChange,
  shouldPlay = true,
}) => {
  const [state, setState] = useState("idle");
  const [sound, setSound] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [playbarLayout, setPlaybarLayout] = useState({});

  const pauseButton = require("../assets/images/pause-button.png");
  const playButton = require("../assets/images/play-button-small.png");

  const createTimeString = (seconds) => {
    const min = Math.floor(Math.floor(seconds) / 60) || 0;
    const sec = Math.floor(seconds) % 60 || 0;

    const minString = min.toLocaleString("en-US", { minimumIntegerDigits: 2 });
    const secString = sec.toLocaleString("en-US", { minimumIntegerDigits: 2 });

    return `${minString}:${secString}`;
  };

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

      // 15 a magic number for touch width, since react-native doesn't seem to want to give the actual value.
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

    return () => {
      unloadSound();
    };
  }, [sound]);

  /*
   * Workaround for `expo-av` bug which doesn't call onPlaybackStatusUpdate
   * https://github.com/expo/expo/issues/29044
   */
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
        className="h-5 flex-grow rounded-full relative overflow-hidden"
      >
        <View className="bg-white opacity-15 w-full h-full rounded-full absolute" />
        <View
          style={{ width: `${(playbackSeconds / audioDuration) * 100}%` }}
          className="bg-secondary h-full rounded-full absolute"
        />
      </View>
      <View className="flex flex-row">
        <Text className="font-alegra-medium text-white text-l">
          {createTimeString(playbackSeconds)}
        </Text>
        <Text className="font-alegra-medium text-white text-l"> / </Text>
        <Text className="font-alegra-medium text-white text-l">
          {createTimeString(audioDuration)}
        </Text>
      </View>
    </View>
  );
};

export default AudioPlayer;
