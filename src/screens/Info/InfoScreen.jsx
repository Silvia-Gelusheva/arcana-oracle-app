import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../../context/ThemeProvider";

export default function InfoScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      {/* HEADER  */}
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
          Unveil the mysteries of the cards
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.chapter}>
        <Text
          style={[
            styles.chapterTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Origins of Tarot
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Tarot cards date back to the 15th century in Europe, originally used
          for playing games. Over time, they evolved into a mystical tool for
          divination and self-reflection. Each card carries symbolic imagery and
          archetypes that guide intuition and insight.
        </Text>
      </View>

      <View style={styles.chapter}>
        <Text
          style={[
            styles.chapterTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Major & Minor Arcana
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          The deck is divided into Major and Minor Arcana. The Major Arcana
          represents life's key lessons and archetypal experiences, while the
          Minor Arcana reflects day-to-day events, emotions, and interactions.
        </Text>
      </View>

      <View style={styles.chapter}>
        <Text
          style={[
            styles.chapterTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Symbolism & Philosophy
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Tarot has been used by mystics, philosophers, and artists for
          centuries. Its symbols connect to numerology, astrology, and the
          elements, creating a rich tapestry of esoteric knowledge.
        </Text>
      </View>

      <View style={styles.chapter}>
        <Text
          style={[
            styles.chapterTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Modern Practice
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Today, Tarot is both an art form and a spiritual guide, helping
          individuals explore their intuition, make decisions, and connect with
          deeper truths.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 28,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: "flex-start",
  },
  chapter: {
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  chapterTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  chapterText: {
    fontSize: 15,
    lineHeight: 26,
    textAlign: "justify",
  },
});
