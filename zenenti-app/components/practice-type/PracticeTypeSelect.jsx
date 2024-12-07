import { useQuery } from "@tanstack/react-query";
import { mockQuery } from "../../query/mock";
import { FlatList, View } from "react-native";
import PracticeTypeButton from "./PracticeTypeButton";
import { useState } from "react";

const PracticeTypeSelect = ({ onPracticeTypeSelect, className }) => {
  const [selectedTypeId, setSelectedTypeId] = useState(0);

  const practiceTypes = useQuery({
    queryFn: mockQuery("practice/types"),
    queryKey: ["practice", "types"],
  });

  return (
    <View className={`${className}`}>
      {practiceTypes.isSuccess && (
        <FlatList
          contentContainerStyle={{ gap: 5 }}
          horizontal={true}
          data={practiceTypes.data}
          renderItem={({ item }) => (
            <PracticeTypeButton
              title={item.title}
              active={item.id === selectedTypeId}
              onPress={() => {
                setSelectedTypeId(item.id);

                if (onPracticeTypeSelect) {
                  onPracticeTypeSelect(item.id);
                }
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default PracticeTypeSelect;
