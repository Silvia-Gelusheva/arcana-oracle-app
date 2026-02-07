import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import CartScreen from "../screens/Shop/CartScreen";
import CheckoutScreen from "../screens/Shop/CheckoutScreen";
import MainTabNavigator from "./MainTabNavigator";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ShopStack from "./ShopStack";
import TarotStack from "./TarotStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />

          <Stack.Screen name="ShopStack" component={ShopStack} />

          <Stack.Screen name="TarotStack" component={TarotStack} />

          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: true, title: "Profile" }}
          />

          {/* CART MODAL */}
          <Stack.Screen
            name="CartModal"
            component={CartScreen}
            options={{
              presentation: "modal",
              headerShown: true,
              title: "Cart",
            }}
          />

          {/* CHECKOUT MODAL */}
          <Stack.Screen
            name="CheckoutModal"
            component={CheckoutScreen}
            options={{
              presentation: "modal",
              headerShown: true,
              title: "Checkout",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
