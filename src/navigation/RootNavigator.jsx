import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
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
          <Stack.Screen
            name="TarotStack"
            component={TarotStack}
            options={{ headerShown: false, title: "Tarot" }}
          />
          <Stack.Screen
            name="ShopStack"
            component={ShopStack}
            options={{ headerShown: false, title: "Shop" }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: true, title: "Profile" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
