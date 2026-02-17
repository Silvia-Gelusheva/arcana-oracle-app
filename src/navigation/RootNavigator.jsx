import AuthStack from "./AuthStack";
import CartScreen from "../screens/Shop/CartScreen";
import CheckoutScreen from "../screens/Shop/CheckoutScreen";
import MainTabNavigator from "./MainTabNavigator";
import ProfileStack from "./ProfileStack";
import SavedReadingsScreen from "../screens/Tarot/SavedReadingsScreen";
import ShopStack from "./ShopStack";
import SteampunkHeader from "../components/SteamPunkHeader";
import TarotStack from "./TarotStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      <Stack.Screen
        name="AuthModal"
        component={AuthStack}
        options={{ presentation: "modal" }}
      />

      <Stack.Screen
        name="ProfileModal"
        component={ProfileStack}
        options={{ presentation: "modal" }}
      />

      <Stack.Screen
        name="TarotStack"
        component={TarotStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedReadingsScreen"
        component={SavedReadingsScreen}
        options={{
          headerShown: true,
          header: (props) => <SteampunkHeader {...props} />,
          title: "My Journal",
        }}
      />

      <Stack.Screen
        name="ShopStack"
        component={ShopStack}
        options={{ headerShown: false }}
      />

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
