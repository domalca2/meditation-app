import { Text, View } from "react-native";

const MessageBubble = ({ text }) => {
  return (
    <View className="bg-white rounded-lg py-6 mt-8 mb-8">
      <Text className="font-alegra-regular text-2xl text-black text-center">
        {text}
      </Text>
    </View>
  );
};

export default MessageBubble;
