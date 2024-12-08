import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, SafeAreaView, View, Text, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { createQuery } from "../../query/query";
import AudioPlayer from "../../components/AudioPlayer";

import navigationArrowBack from "../../assets/images/ui/navigation-arrow-back.png";
import iconAudioPlaying from "../../assets/images/icon-audio-playing.png";

const Practice = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const practice = useQuery({
    queryFn: createQuery(`/private/practice/${id}`),
    queryKey: ["practice", id],
  });

  const category = useQuery({
    queryFn: createQuery(`/private/category/${practice.data?.categoryId}`),
    queryKey: ["category", practice.data?.categoryId],
    enabled: practice.isSuccess,
  });

  const type = useQuery({
    queryFn: createQuery(
      `/private/practice-type/${practice.data?.practiceTypeId}`,
    ),
    queryKey: ["practice", practice.data?.practiceTypeId],
    enabled: practice.isSuccess,
  });

  const background = useQuery({
    queryFn: createQuery(`/private/asset/${category.data?.backgroundUrl}`, {
      raw: true,
    }),
    queryKey: ["asset", category.data?.backgroundUrl],
    enabled: category.isSuccess,
  });

  const audio = useQuery({
    queryFn: createQuery(`/private/asset/${practice.data?.audioUrl}`, {
      raw: true,
    }),
    queryKey: ["asset", practice.data?.audioUrl],
    enabled: practice.isSuccess,
  });

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full h-full relative">
        {background.isSuccess && (
          <Image className="h-full w-full absolute" source={background.data} />
        )}
        <View className="h-full w-full absolute flex py-16 px-5">
          <View className="flex flex-row items-center">
            <View className="w-1/5">
              <Pressable onPress={goBack}>
                <Image className="h-10 w-10" source={navigationArrowBack} />
              </Pressable>
            </View>
            {category.isSuccess && type.isSuccess && (
              <Text className="flex-grow text-center font-alegra-regular text-2xl">
                {`${category.data.title} - ${type.data.title}`}
              </Text>
            )}
            <View className="w-1/5" />
          </View>
          <View className="flex-grow"></View>
          <View className="flex flex-row justify-center mb-5">
            <Image className="h-10 w-10" source={iconAudioPlaying} />
          </View>
          <View className="flex items-center justify-center px-2 py-10 rounded-xl bg-semitransparent">
            {audio.isSuccess && (
              <AudioPlayer audio={audio.data} isPrimaryTheme={true} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Practice;
