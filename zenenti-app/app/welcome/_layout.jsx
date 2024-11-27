import React from "react";
import { Stack } from "expo-router";

const WelcomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="01-welcome/index" options={{ title: "Inicio", headerShown: false }} />
      <Stack.Screen name="02-greeting/index" options={{ title: "Inicio", headerShown: false }} />
      <Stack.Screen name="03-register/index" options={{ title: "Registro", headerShown: false }} />
      <Stack.Screen
        name="04-begin-tutorial/index"
        options={{ title: "Comienzo del tutorial", headerShown: false }}
      />
      <Stack.Screen name="05-tutorial/index" options={{ title: "Tutorial", headerShown: false }} />
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
