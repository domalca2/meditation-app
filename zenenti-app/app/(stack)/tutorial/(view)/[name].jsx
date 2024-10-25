import { Text, SafeAreaView, View, Button } from "react-native";
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
  const [sound, setSound] = useState(null);
  const [subtitle, setSubtitle] = useState("");

  // Detener el audio y continuar en el tutorial
  const continueTutorial = async () => {
    if (sound) {
      await sound.stopAsync(); // Detener el audio
    }
    setSubtitle(""); // Limpiar subtítulos

    if (hasNext) {
      router.push(`/tutorial/${getNextTutorial().name}`);
    } else {
      navigation.navigate("tutorial/index");
    }
  };

  // Cargar y reproducir automáticamente el audio
  useEffect(() => {
    const loadSound = async () => {
      if (tutorial.audio) {
        const { sound } = await Audio.Sound.createAsync(
          tutorial.audio,
          { shouldPlay: true } // Reproducción automática al cargar
        );
        setSound(sound);
      }
    };

    loadSound();

    // Limpiar al desmontar el componente
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [tutorial.audio]);

  // Actualización de los subtítulos
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

  // Detener el audio y saltar al final
  const stopAndSkipToEnd = async () => {
    if (sound) {
      await sound.stopAsync(); // Detener el audio
    }
    setSubtitle(""); // Limpiar subtítulos
    navigation.navigate("tutorial/index"); // Redirigir a la página principal del tutorial
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

        {/* Botón para detener el audio y saltar al final */}
        <View style={{ marginVertical: 10 }}>
          <Button title="Saltar al final del tutorial" onPress={stopAndSkipToEnd} />
        </View>

        {/* Botón para continuar en el tutorial */}
        <SlideButton onPress={continueTutorial} />
      </View>
    </SafeAreaView>
  );
};

export default Name;
