import { Text, SafeAreaView, View, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../../mock/mock";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import CategorySelect from "../../../components/category/CategorySelect";
import PracticeCard from "../../../components/PracticeCard";

const Explore = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(0);

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
        className="mb-10"
        onCategorySelect={(id) => {
          setCategoryId(id);
        }}
      />
      {category.isSuccess && (
        <FlatList
          contentContainerStyle={{ gap: 15 }}
          data={practices.data.filter(
            (practice) => practice.category === category.data.title,
          )}
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
