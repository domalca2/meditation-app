import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, SafeAreaView, View, Text, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../mock/mock";
import AudioPlayer from "../../components/AudioPlayer";

import navigationArrowBack from "../../assets/images/navigation-arrow-back.png";
import iconAudioPlaying from "../../assets/images/icon-audio-playing.png";

const Practice = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const practice = useQuery({
    queryFn: mockQuery(`practice/practices/${id}`),
    queryKey: ["practice", "practices", id],
  });

  const category = useQuery({
    queryFn: mockQuery(`practice/categories/${practice.data?.categoryId}`),
    queryKey: ["practice", "categories", practice.data?.categoryId],
    enabled: practice.isSuccess,
  });

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full h-full relative">
        {category.isSuccess && (
          <Image
            className="h-full w-full absolute"
            source={category.data.background}
          />
        )}
        <View className="h-full w-full absolute flex py-16 px-5">
          <View className="flex flex-row items-center">
            <View className="w-1/5">
              <Pressable onPress={goBack}>
                <Image className="h-10 w-10" source={navigationArrowBack} />
              </Pressable>
            </View>
            {category.isSuccess && (
              <Text className="flex-grow text-center font-alegra-regular text-2xl">
                {`${category.data.title} - ${practice.data.type}`}
              </Text>
            )}
            <View className="w-1/5" />
          </View>
          <View className="flex-grow"></View>
          <View className="flex flex-row justify-center mb-5">
            <Image className="h-10 w-10" source={iconAudioPlaying} />
          </View>
          <View>
            {practice.isSuccess && <AudioPlayer audio={practice.data.audio} />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Practice;
