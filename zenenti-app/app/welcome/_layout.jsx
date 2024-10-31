import React from "react";
import { Stack } from "expo-router";

const WelcomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="01-welcome/index" options={{ title: "Welcome" }} />
      <Stack.Screen name="02-greeting/index" options={{ title: "Greeting" }} />
      <Stack.Screen name="03-register/index" options={{ title: "Register" }} />
      <Stack.Screen
        name="04-begin-tutorial/index"
        options={{ title: "Welcome user" }}
      />
      <Stack.Screen name="tutorial/index" options={{ title: "Tutorial" }} />
      <Stack.Screen name="tutorial/(view)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default WelcomeLayout;
