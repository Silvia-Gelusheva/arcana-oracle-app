import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addReading, getAllCards } from "../../services/readingsService";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import TarotCard from "../../components/TarotCard";
import { useTheme } from "../../context/ThemeProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ThreeCardReadingScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [selectedCards, setSelectedCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardWidth = SCREEN_WIDTH / 3 - 16;

  const drawCards = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const allCards = await getAllCards();
      if (!allCards.length) return;

      const shuffled = [...allCards].sort(() => 0.5 - Math.random());
      const drawn = shuffled.slice(0, 3);

      // Prefetch images
      await Promise.all(drawn.map((c) => c.image && Image.prefetch(c.image)));

      setSelectedCards(drawn);
      setFlipped(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveReading = async () => {
    if (!user || selectedCards.length !== 3) return;

    const userId = user.uid || user.id;
    const cardsData = selectedCards.map((card) => ({
      name: card.name,
      meaning: card.meaning || "No meaning available",
      description: card.card_description || "No description available",
      image: card.image,
    }));

    try {
      await addReading(userId, "three", cardsData);
      setSelectedCards([]);
      setFlipped(false);
    } catch (err) {
      console.error(err);
    }
  };

  const newDraw = () => {
    setSelectedCards([]);
    setFlipped(false);
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <ActivityIndicator
            size="large"
            color={theme.accent}
            style={{ margin: 20 }}
          />
        )}

        {!flipped && !loading && (
          <Text style={[styles.instruction, { color: theme.text }]}>
            Focus on your question and press "Draw Cards" to reveal your
            reading.
          </Text>
        )}

        {/* Cards Row */}
        <View style={styles.cardsRow}>
          {[0, 1, 2].map((i) => (
            <TarotCard
              key={i}
              card={
                selectedCards[i] || {
                  name: "",
                  meaning: "",
                  card_description: "",
                  image: null,
                }
              }
              width={cardWidth}
              flipped={flipped}
            />
          ))}
        </View>

        {/* Descriptions */}
        {flipped && selectedCards.length === 3 && (
          <View style={styles.descriptionsContainer}>
            {selectedCards.map((card, index) => (
              <View
                key={index}
                style={[
                  styles.descriptionBox,
                  {
                    borderColor: theme.accent,
                    backgroundColor: theme.cardBackground,
                  },
                ]}
              >
                <Text style={[styles.timeLabel, { color: theme.accent }]}>
                  {index === 0 ? "Past" : index === 1 ? "Present" : "Future"}
                </Text>
                <Text style={[styles.cardName, { color: theme.text }]}>
                  {card.name}
                </Text>
                <Text
                  style={[styles.cardMeaning, { color: theme.textSecondary }]}
                >
                  {card.meaning}
                </Text>
                <Text style={[styles.cardDescription, { color: theme.text }]}>
                  {card.card_description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Buttons */}
        {!flipped && !loading ? (
          <TouchableOpacity
            style={[
              styles.drawButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
                borderWidth: 2,
              },
            ]}
            onPress={drawCards}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              🧭 Draw Cards
            </Text>
          </TouchableOpacity>
        ) : (
          !loading && (
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.accent }]}
                onPress={saveReading}
              >
                <Text style={[styles.buttonText, { color: theme.background }]}>
                  📖 Save Reading
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
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
          )
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 16, paddingTop: 40 },
  instruction: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  descriptionsContainer: { width: "100%", marginTop: 10, gap: 12 },
  descriptionBox: { borderWidth: 1.5, borderRadius: 16, padding: 16 },
  timeLabel: { fontWeight: "700", marginBottom: 6, fontSize: 14 },
  cardName: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  cardMeaning: { fontSize: 13, marginBottom: 4 },
  cardDescription: { fontSize: 13, lineHeight: 18, textAlign: "justify" },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  drawButton: {
    width: "90%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  buttonText: { fontWeight: "700", fontSize: 16, textAlign: "center" },
});
