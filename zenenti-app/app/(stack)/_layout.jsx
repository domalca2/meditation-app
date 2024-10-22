import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../../contexts/userContext";

const StackLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="splash/index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome/index" options={{ title: "Welcome" }} />
        <Stack.Screen name="greeting/index" options={{ title: "Greeting" }} />
        <Stack.Screen name="register/index" options={{ title: "Register" }} />
        <Stack.Screen name="tutorial/index" options={{ title: "Tutorial" }} />
        <Stack.Screen name="tutorial/(view)" options={{ headerShown: false }} />
        <Stack.Screen
          name="welcome3/index"
          options={{ title: "Welcome user" }}
        />
      </Stack>
    </UserProvider>
  );
};

export default StackLayout;
