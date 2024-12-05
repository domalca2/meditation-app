import { SafeAreaView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../../mock/mock";
import ProfileBubble from "../../../components/ProfileBubble";
import Streak from "./Streak"; 

const Profile = () => {
  const username = useQuery({
    queryFn: mockQuery("user/name"),
    queryKey: ["user", "name"],
  });

  return (
    <SafeAreaView className="flex-1 px-4 py-14 bg-bgMain">
      
      <View className="flex flex-col">
        {username.isSuccess && (
          <View>
            <Text className="w-full font-alegra-medium text-4xl">
              <Text className="font-bold">Hola, </Text>
              <Text>{username.data}</Text>
            </Text>
          </View>
        )}
      </View>
     
      <View className="flex flex-row justify-end px-10">
        <ProfileBubble />
      </View>
     
      <View>
        <Text className="font-alegra-bold text-2xl mb-2">Semilla</Text>
        <Text className="font-alegra-medium">
          Potencial, posibilidades y nuevos comienzos.
        </Text>
      
        <View style={{ marginTop: 100, paddingHorizontal: 10 }}>
          <Streak />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
