import { Image, Pressable, View, Text } from "react-native";
import { Tabs } from "expo-router";

import homeIcon from "../../assets/images/icon-home.png";
import exploreIcon from "../../assets/images/icon-search.png";
import profileIcon from "../../assets/images/icon-person.png";

/**
 * Custom tab bar, because the default one does not allow styling with
 * classes/tailwind. This also gives us much more control over its behavior.
 */
const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex flex-row justify-evenly py-3 bg-bgMain">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            className="flex flex-col items-center justify-center"
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Image className="w-8 h-8" source={options.tabBarIcon} />
            <Text className="font-alegra-medium mt-1">{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const MainLayout = () => {
  return (
    <Tabs tabBar={TabBar}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: homeIcon,
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: "Explorar",
          headerShown: false,
          tabBarIcon: exploreIcon,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: profileIcon,
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
