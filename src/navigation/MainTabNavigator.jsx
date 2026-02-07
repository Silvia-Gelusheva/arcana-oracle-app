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
        tabBarActiveTintColor: "#8342b8",
        tabBarInactiveTintColor: "#555",
        tabBarStyle: { backgroundColor: "#f5f5f5", elevation: 5 },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            HomeTab: "home-outline",
            CartTab: "cart-outline",
            InfoTab: "book-outline",
            ContactTab: "call-outline",
          };
          return <Ionicons name={icons[route.name]} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />

      {/* CART TAB → for the modal! */}
      <Tab.Screen
        name="CartTab"
        component={HomeStack}
        options={{ title: "Cart" }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent()?.navigate("CartModal");
          },
        })}
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
    </Tab.Navigator>
  );
}
