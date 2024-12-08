import React from 'react';
import { View, Text, Image } from 'react-native';
import WaterIcon from "../../../assets/images/ui/ion_water.png";
import WaterOutlineIcon from "../../../assets/images/ui/ion_water-outline.png";

const Streak = () => {
  const days = ['Vie', 'Sab', 'Dom', 'Lun', 'Mar', 'Mie', 'Jue'];
  const completedDays = [true, true, false, true, true, false, false]; 

  const totalCompleted = completedDays.filter(Boolean).length;

  return (
    <View className="p-4 bg-gray-100 rounded-lg">
      <View className="flex-row justify-around mb-4">
        {days.map((day, index) => (
          <View key={index} className="items-center">
            <Text className="text-base mb-2 text-blue-700">{day}</Text>
            <Image
              className="w-6 h-6"
              source={completedDays[index] ? WaterIcon : WaterOutlineIcon}
            />
          </View>
        ))}
      </View>
      <View className="items-center">
        <Text className="text-base mb-1 text-blue-700">Avance total</Text>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold mr-1 text-orange-500">
            {totalCompleted}
          </Text>
          <Image
            className="w-5 h-5"
            source={WaterIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Streak;
