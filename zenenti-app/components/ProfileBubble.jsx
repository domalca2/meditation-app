import { Text, Image, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../mock/mock";

const ProfileBubble = () => {
  const user = useQuery({
    queryFn: mockQuery("user"),
    queryKey: ["user"],
  });
  return (
    user.isSuccess && (
      <View className="flex flex-col justify-center items-center">
        <Image source={user.data.profilePicture} />
        <Text className="font-alegra-medium text-2xl">{user.data.name}</Text>
      </View>
    )
  );
};

export default ProfileBubble;
