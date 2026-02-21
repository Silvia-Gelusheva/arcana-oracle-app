import { ScrollView, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeProvider";

export default function InfoScreen() {
  const { theme } = useTheme();

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fontFamily,
              fontSize: 28,
              fontWeight: "600",
            }}
          >
            Arcana
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontFamily: theme.fontFamily,
              fontSize: 16,
              letterSpacing: 2,
            }}
          >
            ORACLE
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontFamily: theme.fontFamily,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            Find more about tarot
          </Text>
        </View>

        {/* CHAPTERS */}
        {[
          {
            title: "Origins of Tarot",
            text: "Tarot cards date back to the 15th century in Europe, originally used for playing games. Over time, they evolved into a mystical tool for divination and self-reflection. Each card carries symbolic imagery and archetypes that guide intuition and insight.",
          },
          {
            title: "Major & Minor Arcana",
            text: "The deck is divided into Major and Minor Arcana. The Major Arcana represents life's key lessons and archetypal experiences, while the Minor Arcana reflects day-to-day events, emotions, and interactions.",
          },
          {
            title: "Symbolism & Philosophy",
            text: "Tarot has been used by mystics, philosophers, and artists for centuries. Its symbols connect to numerology, astrology, and the elements, creating a rich tapestry of esoteric knowledge.",
          },
          {
            title: "Modern Practice",
            text: "Today, Tarot is both an art form and a spiritual guide, helping individuals explore their intuition, make decisions, and connect with deeper truths.",
          },
        ].map((chapter, index) => (
          <View
            key={index}
            style={[
              styles.chapter,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chapterTitle,
                { color: theme.accent, fontFamily: theme.fontFamily },
              ]}
            >
              {chapter.title}
            </Text>
            <Text
              style={[
                styles.chapterText,
                { color: theme.text, fontFamily: theme.fontFamily },
              ]}
            >
              {chapter.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "700",
  },
  appSubtitle: {
    fontSize: 16,
    letterSpacing: 2,
    marginTop: 4,
  },
  appTagline: {
    fontSize: 14,
    marginTop: 2,
  },
  chapter: {
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  chapterText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
});
