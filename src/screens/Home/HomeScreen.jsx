import { Book, Cards, ShoppingCart, Star } from "phosphor-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import AppCard from "../../components/AppCard";
import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { theme, themeName } = useTheme();

  const handlePress = (screen) => {
    if (!user) {
      navigation.getParent()?.navigate("AuthModal");
    } else {
      navigation.navigate("TarotStack", { screen });
    }
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      <View
        style={[styles.glowTop, { backgroundColor: theme.accent + "40" }]}
      />
      <View
        style={[styles.glowBottom, { backgroundColor: theme.accent + "30" }]}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* CARDS */}
        <AppCard
          icon={<Star size={28} color={theme.text} weight="duotone" />}
          title="Daily Card"
          description="Your guidance for today"
          gradientColor="#f28ee3ff"
          onPress={() => handlePress("DailyCard")}
        />

        <AppCard
          icon={<Cards size={28} color={theme.text} weight="duotone" />}
          title="Three Card Reading"
          description="Past • Present • Future"
          gradientColor="#c398e7ff"
          onPress={() => handlePress("ThreeCardReading")}
        />

        <AppCard
          icon={<Book size={28} color={theme.text} weight="duotone" />}
          title="My Journal"
          description="Saved spiritual insights"
          gradientColor="#a67ce5ff"
          onPress={() => handlePress("SavedReadingsScreen")}
        />

        <AppCard
          icon={<ShoppingCart size={28} color={theme.text} weight="duotone" />}
          title="Arcana Store"
          description="Mystical items & decks"
          gradientColor="#7c8cff"
          onPress={() => navigation.navigate("ShopStack")}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* ATMOSPHERIC GLOW */
  glowTop: {
    position: "absolute",
    top: -100,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 200,
    opacity: 0.25,
  },
  glowBottom: {
    position: "absolute",
    bottom: -120,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 200,
    opacity: 0.2,
  },
});
