import { View, Text, SafeAreaView } from "react-native";
import Button from "../../../components/Button";
import Pet from "../../../components/Pet";
import TextInput from "../../../components/TextInput";
import { router } from "expo-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, createMutation } from "../../../query/query";
import * as SecureStore from "expo-secure-store";

const RegisterScreen = () => {
  const [name, setName] = useState("");

  const registerBegin = useMutation({
    mutationFn: createMutation("/public/user/register-begin"),

    onSuccess: async (res) => {
      await SecureStore.setItemAsync("zenenti-auth-token", res.token);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/welcome/04-begin-tutorial");
    },
    onError: (error, variables, context) => {
      console.error('❌ Error en la mutación:', error);
      console.log('🔄 Variables enviadas:', variables);
      console.log('📝 Contexto adicional:', context);
    },
  });

  const handleContinue = () => {
    registerBegin.mutate({ name });
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
            setName(text);
          }}
          onSubmitEditing={handleContinue}
          placeholder={"Escribe tu nombre"}
        />
        <Pet />
        <Button
          text={"Continuar"}
          onPress={handleContinue}
          enabled={name && name.length > 0}
        />
      </View>
    </SafeAreaView>
  );
};
export default RegisterScreen;
