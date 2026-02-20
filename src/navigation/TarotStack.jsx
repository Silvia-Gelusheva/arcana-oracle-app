import DailyCardScreen from "../screens/Tarot/DailyCardScreen";
import SavedReadingsScreen from "../screens/Tarot/SavedReadingsScreen";
import SteampunkHeader from "../components/SteamPunkHeader";
import ThreeCardReadingScreen from "../screens/Tarot/ThreeCardReadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function TarotStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <SteampunkHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="DailyCard"
        component={DailyCardScreen}
        options={{ title: "Daily Card" }}
      />

      <Stack.Screen
        name="ThreeCardReading"
        component={ThreeCardReadingScreen}
        options={{ title: "Past - Present - Future" }}
      />

      <Stack.Screen
        name="SavedReadingsScreen"
        component={SavedReadingsScreen}
        options={{ title: "My Journal" }}
      />
    </Stack.Navigator>
  );
}
