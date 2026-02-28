import {
  BookIcon,
  HouseIcon,
  PhoneIcon,
  ShoppingCartIcon,
} from "phosphor-react-native";

import ContactScreen from "../screens/Contact/ContactScreen";
import EmptyScreen from "../screens/EmptyScreen";
import HomeStack from "./HomeStack";
import InfoScreen from "../screens/Info/InfoScreen";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../context/ThemeProvider";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { navTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: navTheme.colors.card,
          borderTopWidth: 0,
          elevation: 8,
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: navTheme.colors.primary,
        tabBarInactiveTintColor: navTheme.colors.text,
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
              <PhoneIcon
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
          fontFamily: navTheme.fonts.medium,
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
