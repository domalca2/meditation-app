import { Image, SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createQuery } from "../../query/query";

const SplashScreen = () => {
  const user = useQuery({
    queryFn: createQuery("/private/user"),
    queryKey: ["user"],
  });

  useEffect(() => {
    // console.log('usuario:', user);
    if (!user.isSuccess) router.replace("/welcome/01-welcome");

    if (user.data) {
      router.replace("/main/home");
    } else {
      router.replace("/welcome/01-welcome");
    }
  }, [user]);

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
