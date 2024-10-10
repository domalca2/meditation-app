import { Text, Pressable } from "react-native";
import React from "react";

const Button = ({ text }) => {
  return (
    <Pressable className="bg-secondary rounded-2xl py-4  mx-4 mb-14">
      <Text className="text-center text-white font-alegra-medium text-4xl uppercase">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
