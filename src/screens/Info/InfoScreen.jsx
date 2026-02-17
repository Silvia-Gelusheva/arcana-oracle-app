import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>ARCANA ORACLE</Text>

      <View style={styles.chapter}>
        <Text style={styles.chapterTitle}>Origins of Tarot</Text>
        <Text style={styles.chapterText}>
          Tarot cards date back to the 15th century in Europe, originally used
          for playing games. Over time, they evolved into a mystical tool for
          divination and self-reflection. Each card carries symbolic imagery and
          archetypes that guide intuition and insight.
        </Text>
      </View>

      <View style={styles.chapter}>
        <Text style={styles.chapterTitle}>Major & Minor Arcana</Text>
        <Text style={styles.chapterText}>
          The deck is divided into Major and Minor Arcana. The Major Arcana
          represents life's key lessons and archetypal experiences, while the
          Minor Arcana reflects day-to-day events, emotions, and interactions.
        </Text>
      </View>

      <View style={styles.chapter}>
        <Text style={styles.chapterTitle}>Symbolism & Philosophy</Text>
        <Text style={styles.chapterText}>
          Tarot has been used by mystics, philosophers, and artists for
          centuries. Its symbols connect to numerology, astrology, and the
          elements, creating a rich tapestry of esoteric knowledge.
        </Text>
      </View>

      <View style={styles.chapter}>
        <Text style={styles.chapterTitle}>Modern Practice</Text>
        <Text style={styles.chapterText}>
          Today, Tarot is both an art form and a spiritual guide, helping
          individuals explore their intuition, make decisions, and connect with
          deeper truths.
        </Text>
      </View>
    </ScrollView>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepBlue,
  },

  content: {
    padding: 28,
    paddingBottom: 60,
  },

  title: {
    fontFamily: "Cinzel_600SemiBold",
    fontSize: 26,
    color: parchment,
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },

  chapter: {
    marginBottom: 30,
  },

  chapterTitle: {
    fontFamily: "Cinzel_600SemiBold",
    fontSize: 15,
    color: parchment,
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  chapterText: {
    fontFamily: "Cinzel_500Medium",
    fontSize: 15,
    color: brass,
    lineHeight: 28,
    textAlign: "justify",
  },
});
