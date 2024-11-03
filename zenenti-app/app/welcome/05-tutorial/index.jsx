import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import tutorial from "../../tutorial";
import Button from "../../../components/Button";

const TutorialIndexButton = ({ index, text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex flex-row items-center">
        <Text className="bg-secondary rounded-full w-16 h-16 font-alegra-medium text-center align-middle text-white text-3xl">
          {index}
        </Text>
        <Text className="px-5 font-alegra-medium text-3xl text-white">
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const TutorialIndex = () => {
  const router = useRouter();

  const endTutorial = () => {
    router.push("/welcome/06-end-tutorial");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex h-full pb-5">
        <View>
          <Text className="text-5xl text-center font-alegra-regular text-white p-14">
            ¿Qué parte quieres volver a ver?
          </Text>
        </View>
        <View className="flex-1 flex-col px-10 gap-5">
          {tutorial.map(({ name, title }, index) => (
            <TutorialIndexButton
              key={name}
              index={index + 1}
              text={title}
              onPress={() => {
                router.push(`/welcome/05-tutorial/${name}`);
              }}
            />
          ))}
        </View>
        <View className="px-5">
          <Button text="Continuar" onPress={endTutorial} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TutorialIndex;
