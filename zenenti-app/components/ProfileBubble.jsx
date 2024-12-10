import { Text, Image, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { createQuery } from "../query/query";

import profilePicture from "../assets/images/profile-picture.png";

const ProfileBubble = () => {
  const user = useQuery({
    queryFn: createQuery("/private/user"),
    queryKey: ["user"],
  });

  return (
    user.isSuccess && (
      <View className="flex flex-col justify-center items-center">
        <Image source={profilePicture} />
        <Text className="font-alegra-medium text-2xl">{user.data.name}</Text>
      </View>
    )
  );
};

export default ProfileBubble;
