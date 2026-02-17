import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../../context/ThemeProvider";

export default function InfoScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.title,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        ARCANA ORACLE
      </Text>

      <View style={styles.chapter}>
        <Text
          style={[
            styles.chapterTitle,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Origins of Tarot
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.accent, fontFamily: theme.fontFamily },
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
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Major & Minor Arcana
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.accent, fontFamily: theme.fontFamily },
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
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Symbolism & Philosophy
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.accent, fontFamily: theme.fontFamily },
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
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Modern Practice
        </Text>
        <Text
          style={[
            styles.chapterText,
            { color: theme.accent, fontFamily: theme.fontFamily },
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

  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },

  chapter: {
    marginBottom: 30,
  },

  chapterTitle: {
    fontSize: 16,
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  chapterText: {
    fontSize: 15,
    lineHeight: 28,
    textAlign: "justify",
  },
});
