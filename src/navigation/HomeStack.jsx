import { Image, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ShopScreen from "../screens/Shop/ShopScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#ffffffff" },
        headerTintColor: "#000000ff",
        headerBackTitleVisible: false,
        headerRight: () =>
          user ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Text style={{ color: "#000000ff", marginRight: 8 }}>Logout</Text>
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 28, height: 28, borderRadius: 14 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: "#020000ff" }}>Login</Text>
            </TouchableOpacity>
          ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Arcana Oracle ✨" }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{ title: "Shop" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}
