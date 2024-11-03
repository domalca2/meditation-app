import { View, Text, SafeAreaView } from "react-native";
import CategorySelect from "../../../components/category/CategorySelect";

const Explore = () => {
  return (
    <SafeAreaView className="flex-1 flex-col py-16 px-5">
      <Text className="w-full text-center font-alegra-bold text-2xl mb-6">
        Explorar
      </Text>
      <CategorySelect />
    </SafeAreaView>
  );
};

export default Explore;
