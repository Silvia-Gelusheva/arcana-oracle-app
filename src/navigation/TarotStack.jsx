import DailyCardScreen from "../screens/Tarot/DailyCardScreen";
import ThreeCardReadingScreen from "../screens/Tarot/ThreeCardReadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function TarotStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DailyCard"
        component={DailyCardScreen}
        options={{ title: "Daily Card" }}
      />
      <Stack.Screen
        name="ThreeCardReading"
        component={ThreeCardReadingScreen}
        options={{ title: "Three Card Reading" }}
      />
    </Stack.Navigator>
  );
}
