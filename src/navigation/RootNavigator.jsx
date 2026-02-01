import DailyCardScreen from "../screens/Tarot/DailyCardScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";
import ProductDetailsScreen from "../screens/Shop/ProductDetailsScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ThreeCardReadingScreen from "../screens/Tarot/ThreeCardReadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true, title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true, title: "Register" }}
      />
      <Stack.Screen
        name="DailyCard"
        component={DailyCardScreen}
        options={{ headerShown: true, title: "Daily Card" }}
      />
      <Stack.Screen
        name="ThreeCardReading"
        component={ThreeCardReadingScreen}
        options={{ headerShown: true, title: "Three Card Reading" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: true, title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}
