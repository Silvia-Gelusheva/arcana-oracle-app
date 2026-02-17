import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppProviders } from "./context/AppProviders";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import ThemeProvider from "./context/ThemeProvider";

export default function App() {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar style="auto" />
              <RootNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProviders>
  );
}
