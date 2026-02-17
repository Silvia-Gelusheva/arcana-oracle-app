import {
  BookIcon,
  HouseIcon,
  Phone,
  ShoppingCartIcon,
} from "phosphor-react-native";

import { AuthContext } from "../context/AuthContext";
import ContactScreen from "../screens/Contact/ContactScreen";
import EmptyScreen from "../screens/EmptyScreen";
import HomeStack from "./HomeStack";
import InfoScreen from "../screens/Info/InfoScreen";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { user } = useContext(AuthContext);

  const tabBarColors = {
    active: "#b87333",
    inactive: "#e0c097aa",
    background: "#0b132b",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarColors.background,
          borderTopWidth: 0,
          elevation: 8,
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: tabBarColors.active,
        tabBarInactiveTintColor: tabBarColors.inactive,
        tabBarIcon: ({ color, focused }) => {
          const icons = {
            HomeTab: (
              <HouseIcon
                weight={focused ? "duotone" : "regular"}
                color={color}
                size={28}
              />
            ),
            InfoTab: (
              <BookIcon
                weight={focused ? "duotone" : "regular"}
                color={color}
                size={28}
              />
            ),
            ContactTab: (
              <Phone
                weight={focused ? "duotone" : "regular"}
                color={color}
                size={28}
              />
            ),
            CartTab: (
              <ShoppingCartIcon
                weight={focused ? "duotone" : "regular"}
                color={color}
                size={28}
              />
            ),
          };
          return <View>{icons[route.name]}</View>;
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
          fontFamily: "Cinzel_600SemiBold",
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="InfoTab"
        component={InfoScreen}
        options={{ title: "Info" }}
      />
      <Tab.Screen
        name="ContactTab"
        component={ContactScreen}
        options={{ title: "Contact" }}
      />

      <Tab.Screen
        name="CartTab"
        component={EmptyScreen}
        options={{ title: "Cart" }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent()?.navigate("CartModal");
          },
        })}
      />
    </Tab.Navigator>
  );
}
