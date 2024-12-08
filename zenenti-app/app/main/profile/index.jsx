import { SafeAreaView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { createQuery } from "../../../query/query";
import ProfileBubble from "../../../components/ProfileBubble";
import Streak from "./Streak"; 

const Profile = () => {
  const user = useQuery({
    queryFn: createQuery("/private/user"),
    queryKey: ["user"],
  });

  return (
    <SafeAreaView className="flex-1 px-4 py-14 bg-bgMain">
      
      <View className="flex flex-col">
        {user.isSuccess && (
          <View>
            <Text className="w-full font-alegra-medium text-4xl">
              <Text className="font-bold">Hola, </Text>
              <Text>{user.data.name}</Text>
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
