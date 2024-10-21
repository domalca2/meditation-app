import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";

const Welcome3Screen = () => {
  const { name } = useContext(UserContext);
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Welcome3Screen;
