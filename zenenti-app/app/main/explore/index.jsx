import { Text, SafeAreaView, View } from "react-native";
import CategorySelect from "../../../components/category/CategorySelect";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../../mock/mock";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";

const Explore = () => {
  const router = useRouter();
  const practices = useQuery({
    queryFn: mockQuery("practice/practices"),
    queryKey: ["practice", "practices"],
  });

  const startPractice = (id) => {
    router.push(`/practice/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 flex-col py-16 px-5 bg-bgMain">
      <Text className="w-full text-center font-alegra-bold text-2xl mb-6">
        Explorar
      </Text>
      <CategorySelect />
      <View className="flex flex-col gap-5 py-5">
        {practices.isSuccess &&
          practices.data.map((practice) => (
            <Button
              key={practice.id}
              text={practice.name}
              onPress={() => {
                startPractice(practice.id);
              }}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

export default Explore;
