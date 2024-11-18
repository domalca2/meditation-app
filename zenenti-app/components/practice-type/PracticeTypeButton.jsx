import { Pressable, Text } from "react-native";

const PracticeTypeButton = ({ onPress, title, active }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`${active ? "bg-secondary" : ""} rounded-full border-[1px] py-1 px-3 border-secondary`}
    >
      <Text
        className={`${active ? "color-white" : "color-secondary"} font-alegra-medium text-l`}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default PracticeTypeButton;
