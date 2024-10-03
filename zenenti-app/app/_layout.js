import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "AlegreyaSans-Medium": require("../assets/fonts/AlegreyaSans-Medium.ttf"),
    "AlegreyaSans-Regular": require("../assets/fonts/AlegreyaSans-Regular.ttf"),
    "AlegreyaSans-Bold": require("../assets/fonts/AlegreyaSans-Bold.ttf"),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return <Slot />;
};

export default RootLayout;
