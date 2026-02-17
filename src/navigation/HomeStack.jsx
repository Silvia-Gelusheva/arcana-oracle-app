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
        headerStyle: { backgroundColor: "#0b132b", elevation: 0, height: 70 },
        headerTintColor: "#e0c097",
        headerTitle: "",
        headerLeft: () => (
          <Text
            style={{
              color: "#e0c097",
              fontSize: 20,
              fontFamily: "Cinzel_600SemiBold",
            }}
          >
            Arcana Oracle
          </Text>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {user ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.getParent()?.navigate("ProfileModal")
                  }
                >
                  <Image
                    source={{
                      uri: user.avatar || "https://i.pravatar.cc/150?img=47",
                    }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      borderWidth: 2,
                      borderColor: "#b87333",
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={logout}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#b87333",
                    backgroundColor: "#1c2541",
                  }}
                >
                  <Text style={{ color: "#e0c097", fontSize: 12 }}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.getParent()?.navigate("AuthModal")}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#b87333",
                  backgroundColor: "#1c2541",
                }}
              >
                <Text style={{ color: "#e0c097", fontSize: 12 }}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        ),
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true, title: "Authentication" }}
      />
    </Stack.Navigator>
  );
}
