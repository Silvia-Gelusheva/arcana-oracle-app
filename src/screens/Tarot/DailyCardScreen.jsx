import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { addReading, getRandomCard } from "../../services/readingsService";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import TarotCard from "../../components/TarotCard";
import { useTheme } from "../../context/ThemeProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function DailyCardScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [selectedCard, setSelectedCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardWidth = SCREEN_WIDTH * 0.5;

  const drawCard = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const card = await getRandomCard();
      if (!card) return;

      // Preload card image
      if (card.image) await Image.prefetch(card.image);

      setSelectedCard(card);
      setFlipped(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveReading = async () => {
    if (!user || !selectedCard) return;

    const userId = user.uid || user.id;
    const cardData = {
      name: selectedCard.name,
      meaning: selectedCard.meaning || "No meaning available",
      description: selectedCard.card_description || "No description available",
      image: selectedCard.image,
    };

    try {
      await addReading(userId, "single", [cardData]);

      ToastAndroid.showWithGravity(
        `Reading saved: ${selectedCard.name}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      setTimeout(() => {
        setSelectedCard(null);
        setFlipped(false);
      }, 300);
    } catch (err) {
      ToastAndroid.showWithGravity(
        `Error saving reading`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.error(err);
    }
  };

  const newDraw = () => {
    setSelectedCard(null);
    setFlipped(false);
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        {!selectedCard && !loading && (
          <Text style={[styles.introText, { color: theme.text }]}>
            A new day unfolds like a blank canvas. Draw a card to reveal your
            guidance.
          </Text>
        )}

        {/* Loading */}
        {loading && (
          <View style={{ marginVertical: 20 }}>
            <ActivityIndicator size="large" color={theme.accent} />
            <Text
              style={{
                color: theme.textSecondary,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Loading card...
            </Text>
          </View>
        )}

        {/* Tarot Card */}
        <View style={styles.cardContainer}>
          <TarotCard
            card={selectedCard || { image: null }}
            width={cardWidth}
            flipped={flipped}
          />
        </View>

        {/* Card Description */}
        {selectedCard && flipped && (
          <View
            style={[
              styles.descriptionCard,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
              },
            ]}
          >
            <Text style={[styles.cardName, { color: theme.text }]}>
              {selectedCard.name}
            </Text>
            <Text style={[styles.cardMeaning, { color: theme.textSecondary }]}>
              {selectedCard.meaning}
            </Text>
            <Text style={[styles.cardDescription, { color: theme.text }]}>
              {selectedCard.card_description || selectedCard.description}
            </Text>
          </View>
        )}

        {/* Buttons */}
        {selectedCard && flipped ? (
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accent }]}
              onPress={saveReading}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>
                📖 Save Reading
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.accent,
                  borderWidth: 2,
                },
              ]}
              onPress={newDraw}
            >
              <Text style={[styles.buttonText, { color: theme.accent }]}>
                🧭 New Draw
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          !loading && (
            <TouchableOpacity
              style={[
                styles.drawButton,
                {
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.accent,
                  borderWidth: 2,
                },
              ]}
              onPress={drawCard}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                🧭 Draw Card
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingVertical: 24,
  },
  introText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  cardContainer: { alignItems: "center", marginBottom: 20 },
  descriptionCard: {
    padding: 14,
    borderWidth: 2,
    borderRadius: 14,
    marginBottom: 20,
    width: "90%",
  },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  cardMeaning: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 6,
  },
  cardDescription: { fontSize: 13, textAlign: "center", lineHeight: 18 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  drawButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  buttonText: { fontWeight: "700", fontSize: 16, textAlign: "center" },
});
