import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome/index" options={{ title: "Welcome" }} />
      <Stack.Screen name="greeting/index" options={{ title: "Greeting" }} />
      <Stack.Screen name="register/index" options={{ title: "Register" }} />
    </Stack>
  );
};

export default StackLayout;
