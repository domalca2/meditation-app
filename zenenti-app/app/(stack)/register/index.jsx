import { View, Text, SafeAreaView } from "react-native";
import Button from "../../../components/Button";
import Pet from "../../../components/Pet";
import TextInput from "../../../components/TextInput";
import { router } from "expo-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mockMutation } from "../../../mock/mock";
import { queryClient } from "../../../query/query";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");

  const usernameMutation = useMutation({
    mutationFn: mockMutation("user/name"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "name"] });
    },
  });

  const handleContinue = async () => {
    await usernameMutation.mutate(username);

    router.push("/welcome3");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary flex-1 justify-center px-4 pb-5">
        <View className="bg-white rounded-lg py-6 mt-8 mb-8">
          <Text className="font-alegra-regular text-2xl text-black text-center">
            Me encantaría conocerte un poco mejor.
          </Text>
          <Text className="font-alegra-regular text-2xl text-black text-center">
            ¿Cómo te llamas?
          </Text>
        </View>
        <TextInput
          onChangeText={(text) => {
            setUsername(text);
          }}
          onSubmitEditing={handleContinue}
          placeholder={"Escribe tu nombre"}
        />
        <Pet />
        <Button
          text={"continuar"}
          onPress={handleContinue}
          enabled={username && username.length > 0}
        />
      </View>
    </SafeAreaView>
  );
};
export default RegisterScreen;
