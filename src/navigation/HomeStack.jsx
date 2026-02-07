import { Image, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#dbdbdbff", elevation: 4 },
        headerTintColor: "#050000",
        headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
        headerRight: () => {
          const rootNav = navigation.getParent()?.getParent();
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              {user ? (
                <>
                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => rootNav?.navigate("ProfileScreen")}
                  >
                    <Image
                      source={{
                        uri: user.avatar || "https://i.pravatar.cc/150",
                      }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        borderWidth: 1,
                        borderColor: "#6f6f6f",
                        backgroundColor: "#fff",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={logout}>
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>Login</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        },
      })}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Arcana Oracle ✨" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
}
