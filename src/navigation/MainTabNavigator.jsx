import CartScreen from "../screens/Shop/CartScreen";
import ContactScreen from "../screens/Contact/ContactScreen";
import HomeStack from "./HomeStack";
import InfoScreen from "../screens/Info/InfoScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ffffffff" },
        tabBarActiveTintColor: "#8342b8ff",
        tabBarInactiveTintColor: "#000000ff",
        tabBarIcon: ({ color }) => {
          const icons = {
            HomeTab: "home-outline",
            CartTab: "cart-outline",
            InfoTab: "book-outline",
            ContactTab: "call-outline",
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="CartTab" component={CartScreen} />
      <Tab.Screen name="InfoTab" component={InfoScreen} />
      <Tab.Screen name="ContactTab" component={ContactScreen} />
    </Tab.Navigator>
  );
}
