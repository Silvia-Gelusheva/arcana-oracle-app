import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>The Arcana Oracle ✨</Text>

      <Text style={styles.subtitle}>A Brief History of Tarot</Text>

      <Text style={styles.text}>
        Tarot cards date back to the 15th century in Europe, originally used for
        playing games. Over time, they evolved into a mystical tool for
        divination and self-reflection. Each card carries symbolic imagery and
        archetypes that guide intuition and insight.
      </Text>

      <Text style={styles.text}>
        The deck is divided into Major and Minor Arcana. The Major Arcana
        represents life's key lessons and archetypal experiences, while the
        Minor Arcana reflects day-to-day events, emotions, and interactions.
      </Text>

      <Text style={styles.text}>
        Tarot has been used by mystics, philosophers, and artists for centuries.
        Its symbols connect to numerology, astrology, and the elements, creating
        a rich tapestry of knowledge.
      </Text>

      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Rider-Waite_tarot_deck_-_Major_Arcana.jpg",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        Today, Tarot is both an art form and a spiritual guide, helping
        individuals explore their intuition, make decisions, and connect with
        deeper truths.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#f0e6ff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#9d85ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: 22,
    color: "#d9b3ff",
    marginBottom: 15,
    textShadowColor: "#7a3fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  text: {
    fontSize: 16,
    color: "#e0d6ff",
    lineHeight: 26,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
});
