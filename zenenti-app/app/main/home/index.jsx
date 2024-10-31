import { SafeAreaView, Text, View } from "react-native";
import { mockQuery } from "../../../mock/mock";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const usernameQuery = useQuery({
    queryKey: ["user/name"],
    queryFn: mockQuery("user/name"),
  });

  return (
    <SafeAreaView className="flex-1 px-5 py-16 bg-bgMain">
      <View className="flex flex-col">
        {usernameQuery.isSuccess && (
          <View>
            <Text className="w-full font-alegra-medium text-4xl">
              <Text className="font-bold">Hola, </Text>
              <Text>{usernameQuery.data}</Text>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
