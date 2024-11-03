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
      <Stack.Screen name="05-tutorial/index" options={{ title: "Tutorial" }} />
      <Stack.Screen
        name="05-tutorial/(view)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="06-end-tutorial/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default WelcomeLayout;
