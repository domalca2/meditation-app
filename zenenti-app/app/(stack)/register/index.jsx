import { View, Text, SafeAreaView } from "react-native";
import { useContext } from "react";
import Button from "../../../components/Button";
import Pet from "../../../components/Pet";
import TextInput from "../../../components/TextInput";
import { UserContext } from "../../../contexts/userContext";
import { router } from "expo-router";

const RegisterScreen = () => {
  const { name, setName } = useContext(UserContext);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleContinue = () => {
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
          onChangeText={handleNameChange}
          onSubmitEditing={handleContinue}
          placeholder={"Escribe tu nombre"}
        />
        <Pet />
        <Button
          text={"continuar"}
          onPress={handleContinue}
          enabled={name && name.length > 0}
        />
      </View>
    </SafeAreaView>
  );
};
export default RegisterScreen;
