import { Cinzel_600SemiBold, useFonts } from "@expo-google-fonts/cinzel";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppProviders } from "./context/AppProviders";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded] = useFonts({
    Cinzel_600SemiBold,
  });

  if (!fontsLoaded) return null;
  return (
    <AppProviders>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </AppProviders>
  );
}
