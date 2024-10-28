import { Text, Pressable } from "react-native";
import React from "react";

const Button = ({ text, onPress, enabled = true, styleType = "primary" }) => {
  if (styleType === "primary") {
    return (
      <Pressable
        onPress={enabled ? onPress : undefined}
        className={`${enabled ? "bg-secondary" : "bg-disabled"} mx-4 py-4 rounded-2xl`}
      >
        <Text className="text-center font-alegra-medium text-white text-4xl uppercase">
          {text}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={enabled ? onPress : undefined}
        className="border-2 border-solid border-[#fffefc] bg-transparent px-1 py-1 rounded-lg"
      >
        <Text className="text-center font-alegra-medium text-[#fffefc] text-2xl">
          {text}
        </Text>
      </Pressable>
    );
  }
};

export default Button;
