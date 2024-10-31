import { Image, SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../mock/mock";

const SplashScreen = () => {
  const user = useQuery({
    queryFn: mockQuery("user"),
    queryKey: ["user"],
  });

  useEffect(() => {
    if (user.status === "success") {
      if (user.data.finishedTutorial) {
        router.replace("/main/home");
      } else {
        router.replace("/welcome/01-welcome");
      }
    }
  }, [user.status]);

  const logo = require("../../assets/images/logo-zenenti.png");
  return (
    <SafeAreaView
      className={"bg-primary flex items-center justify-center h-full"}
    >
      <View>
        <Image source={logo} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
