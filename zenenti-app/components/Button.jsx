import { Text, Pressable } from "react-native";
import React from "react";

const Button = ({ text, onPress, enabled = true, styleType = "primary" }) => {
  const isPrimary = styleType === "primary";

  return (
    <Pressable
      onPress={enabled ? onPress : undefined}
      className={`mb-14 ${
        enabled
          ? isPrimary
            ? "bg-secondary mx-4 py-4 rounded-2xl"
            : "border-2 border-solid border-[#fffefc] bg-transparent px-1 py-1 rounded-lg"
          : "bg-disabled mx-4 py-4 rounded-2xl"
      }`}
    >
      <Text
        className={`text-center font-alegra-medium ${
          isPrimary ? "text-white text-4xl uppercase" : "text-[#fffefc] text-2xl"
        }`}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
