import { Text, SafeAreaView, FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../../mock/mock";
import { useRouter } from "expo-router";
import { useState } from "react";

import CategorySelect from "../../../components/category/CategorySelect";
import PracticeCard from "../../../components/PracticeCard";
import PracticeTypeSelect from "../../../components/practice-type/PracticeTypeSelect";
import DurationSorter from "../../../components/DurationSorter";

const Explore = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [sortOrder, setSortOrder] = useState("descending");

  const practices = useQuery({
    queryFn: mockQuery("practice/practices"),
    queryKey: ["practice", "practices"],
  });

  const category = useQuery({
    queryFn: mockQuery(`practice/categories/${categoryId}`),
    queryKey: ["practice", "categories", categoryId],
  });

  const startPractice = (id) => {
    router.push(`/practice/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 flex-col py-16 px-5 bg-bgMain">
      <Text className="w-full text-center font-alegra-bold text-2xl mb-6">
        Explorar
      </Text>
      <CategorySelect
        className="mb-5"
        onCategorySelect={(id) => {
          setCategoryId(id);
        }}
      />
      <View className="flex flex-row justify-between items-center mb-5">
        <PracticeTypeSelect onPracticeTypeSelect={(id) => setTypeId(id)} />
        <DurationSorter
          onChangeSortOrder={(order) => setSortOrder(order)}
          sortOrder={sortOrder}
        />
      </View>
      {category.isSuccess && (
        <FlatList
          contentContainerStyle={{ gap: 15 }}
          data={practices.data
            .filter(
              (practice) =>
                practice.categoryId === categoryId &&
                practice.typeId === typeId,
            )
            .sort((a, b) => {
              if (sortOrder === "ascending") {
                return a.durationMillis - b.durationMillis;
              } else {
                return b.durationMillis - a.durationMillis;
              }
            })}
          keyExtractor={(practice) => practice.durationMillis}
          renderItem={({ item }) => (
            <PracticeCard
              practice={item}
              onPress={() => {
                startPractice(item.id);
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Explore;
