import {
  BookIcon,
  CardsIcon,
  ShoppingCartIcon,
  StarIcon,
} from "phosphor-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import AppCard from "../../components/AppCard";
import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const handlePress = (screen) => {
    if (!user) {
      navigation.getParent()?.navigate("AuthModal");
    } else {
      navigation.navigate("TarotStack", { screen });
    }
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      {/* Glow effects */}
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
        {/* DAILY CARD */}
        <AppCard
          icon={
            <StarIcon size={28} color={theme.colors.star} weight="duotone" />
          }
          title="Daily Card"
          description="Your guidance for today"
          gradientColor={theme.colors.gradients.star}
          onPress={() => handlePress("DailyCard")}
        />

        {/* THREE CARD READING */}
        <AppCard
          icon={
            <CardsIcon size={28} color={theme.colors.cards} weight="duotone" />
          }
          title="Three Card Reading"
          description="Past • Present • Future"
          gradientColor={theme.colors.gradients.cards}
          onPress={() => handlePress("ThreeCardReading")}
        />

        {/* MY JOURNAL */}
        <AppCard
          icon={
            <BookIcon size={28} color={theme.colors.book} weight="duotone" />
          }
          title="My Journal"
          description="Saved spiritual insights"
          gradientColor={theme.colors.gradients.book}
          onPress={() => handlePress("SavedReadingsScreen")}
        />

        {/* ARCANA STORE */}
        <AppCard
          icon={
            <ShoppingCartIcon
              size={28}
              color={theme.colors.cart}
              weight="duotone"
            />
          }
          title="Arcana Store"
          description="Mystical items & decks"
          gradientColor={theme.colors.gradients.cart}
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
