import { Text, SafeAreaView, FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { createQuery } from "../../../query/query";

import CategorySelect from "../../../components/category/CategorySelect";
import PracticeCard from "../../../components/PracticeCard";
import PracticeTypeSelect from "../../../components/practice-type/PracticeTypeSelect";
import DurationSorter from "../../../components/DurationSorter";

const Explore = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(1);
  const [typeId, setTypeId] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const practices = useQuery({
    queryFn: createQuery(
      `/private/practice/all?order=${sortOrder}&categoryId=${categoryId}&practiceTypeId=${typeId}`,
    ),
    queryKey: ["practice", { sortOrder, categoryId, typeId }],
  });

  const category = useQuery({
    queryFn: createQuery(`private/category/${categoryId}`),
    queryKey: ["category", categoryId],
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
      <Text className="font-alegra-medium text-2xl mb-5">
        ¿Qué necesitas hoy?
      </Text>
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
          data={practices.data}
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
