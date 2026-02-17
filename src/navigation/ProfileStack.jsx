import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SteampunkHeader from "../components/SteamPunkHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <SteampunkHeader {...props} /> }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
