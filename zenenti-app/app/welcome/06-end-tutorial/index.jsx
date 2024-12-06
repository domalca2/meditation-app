import { SafeAreaView, View } from "react-native";
import MessageBubble from "../../../components/MessageBubble";
import Pet from "../../../components/Pet";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { mockMutation } from "../../../query/mock";
import { queryClient } from "../../../query/query";

const EndTutorial = () => {
  const router = useRouter();

  const tutorialMutation = useMutation({
    mutationFn: mockMutation("user/finishedTutorial"),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const goBack = () => {
    router.back();
  };

  const dismissTutorial = () => {
    router.dismissAll();
    router.replace("/main/home");

    tutorialMutation.mutate(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary py-16 px-5">
      <MessageBubble text="Ahora, echa un vistazo a todo lo que te proponemos en Zenenti. Seguro que encontrarás meditaciones y ejercicios guiados que se adapten a ti." />
      <Pet />
      <View className="flex flex-row w-full justify-between">
        <Button text="Volver atrás" onPress={goBack} styleType="secondary" />
        <Button
          text="Continuar"
          onPress={dismissTutorial}
          styleType="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default EndTutorial;
