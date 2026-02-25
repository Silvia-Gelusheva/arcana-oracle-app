import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import CartScreen from "../screens/Shop/CartScreen";
import CheckoutScreen from "../screens/Shop/CheckoutScreen";
import MainTabNavigator from "./MainTabNavigator";
import ProfileStack from "./ProfileStack";
import ShopStack from "./ShopStack";
import SteampunkHeader from "../components/SteamPunkHeader";
import TarotStack from "./TarotStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      {/* Auth Modal */}
      <Stack.Screen
        name="AuthModal"
        component={AuthStack}
        options={{ presentation: "modal" }}
      />

      {/* Profile */}
      <Stack.Screen
        name="ProfileModal"
        component={user ? ProfileStack : AuthStack}
        options={{ presentation: "modal" }}
      />

      {/* Tarot */}
      <Stack.Screen
        name="TarotStack"
        component={user ? TarotStack : AuthStack}
        options={{ headerShown: false }}
      />

      {/* Arcana Store */}
      <Stack.Screen
        name="ShopStack"
        component={ShopStack}
        options={{ headerShown: false }}
      />

      {/* Cart*/}
      <Stack.Screen
        name="CartModal"
        component={CartScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          header: (props) => <SteampunkHeader {...props} />,
          title: "Cart",
        }}
      />

      {/* Checkout */}
      <Stack.Screen
        name="CheckoutModal"
        component={CheckoutScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          header: (props) => <SteampunkHeader {...props} />,
          title: "Checkout",
        }}
      />
    </Stack.Navigator>
  );
}
