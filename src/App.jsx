import * as SplashScreen from "expo-splash-screen";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { AppProviders } from "./context/AppProviders";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import ThemeProvider from "./context/ThemeProvider";

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!appReady) return null;

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
