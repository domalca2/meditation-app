import {useEffect, useState} from "react";
import {Audio} from "expo-av";
import {View} from "react-native";

const AudioPlayer = ({ audio, shouldPlay = true }) => {
  const [state, setState] = useState("idle");
  const [sound, setSound] = useState(null);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);

  // Sound handler
  useEffect(() => {
    const loadSound = async () => {
      if (audio) {
        const { sound } = await Audio.Sound.createAsync(audio,
          { shouldPlay },
          (status) => {
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

    const unloadSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }

      setState("idle");
    };

    loadSound();

    return () => {
      unloadSound();
    };
  }, [audio]);

  // Seconds counter
  useEffect(() => {
    const update = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();

        if (status.isPlaying) {
          setPlaybackSeconds(Math.floor(status.positionMillis / 1000));
          setState("playing");
        } else {
          setState("idle");
        }
      }
    }, 100);

    return () => clearInterval(update);
  }, [sound]);

  return (
    <View>

    </View>
  );
};

export default AudioPlayer;
