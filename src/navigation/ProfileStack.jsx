import { Image, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
          shadowColor: "#ccc",
          elevation: 3,
        },
        headerTintColor: "#050000",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        headerRight: () => {
          const avatarUri =
            user?.avatar ||
            "https://static.vecteezy.com/system/resources/previews/009/667/933/non_2x/pretty-stargazer-witch-avatar-for-game-or-advertising-halloween-magician-girl-with-big-hat-with-space-ancient-dress-vector.jpg";

          return (
            <TouchableOpacity
              onPress={user ? logout : null}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              {user && (
                <Text
                  style={{
                    color: "#050000",
                    fontWeight: "600",
                    marginRight: 8,
                    fontSize: 16,
                  }}
                >
                  Logout
                </Text>
              )}
              <Image
                source={{ uri: avatarUri }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#ccc",
                }}
              />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}
