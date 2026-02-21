import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { addReading } from "../../services/readingsService";
import { cards } from "../../../assets/cards/cardsData";
import { useTheme } from "../../context/ThemeProvider";

export default function ThreeCardReadingScreen() {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);

  const [selectedCards, setSelectedCards] = useState([]);
  const [flipped, setFlipped] = useState(false);

  const flipAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const drawCards = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setSelectedCards(shuffled.slice(0, 3));
    setFlipped(true);

    flipAnims.forEach((anim) => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    });
  };

  const saveReading = async () => {
    if (!user || selectedCards.length === 0) return;

    const cardsData = selectedCards.map((card) => ({
      name: card.name,
      meaning: card.meaning,
      description: card.card_description,
    }));

    try {
      await addReading(user.id, "three", cardsData);
      console.log("Success", "Your three-card reading has been saved!");
      setSelectedCards([]);
      setFlipped(false);
      flipAnims.forEach((anim) => anim.setValue(0));
    } catch (err) {
      console.log("Error saving reading:", err);
    }
  };

  const reloadCards = () => {
    setFlipped(false);
    flipAnims.forEach((anim) => anim.setValue(0));
  };

  const cardWidth = 100;
  const cardHeight = cardWidth * 1.7;

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {!flipped && (
          <Text style={[styles.instruction, { color: theme.text }]}>
            Focus on your question and press "Draw Cards" to reveal your
            reading.
          </Text>
        )}

        {/* Cards Row */}
        <View style={styles.cardsRow}>
          {[0, 1, 2].map((i) => {
            const card = selectedCards[i];
            const flipAnim = flipAnims[i];

            const frontInterpolate = flipAnim.interpolate({
              inputRange: [0, 180],
              outputRange: ["0deg", "180deg"],
            });
            const backInterpolate = flipAnim.interpolate({
              inputRange: [0, 180],
              outputRange: ["180deg", "360deg"],
            });

            return (
              <View key={i} style={{ width: cardWidth, height: cardHeight }}>
                {/* Front */}
                {!flipped && (
                  <Animated.View
                    style={[
                      styles.cardImage,
                      {
                        transform: [{ rotateY: frontInterpolate }],
                        backgroundColor: theme.cardBackground,
                      },
                    ]}
                  >
                    <Image
                      source={require("../../../assets/cards/backside.png")}
                      style={styles.cardImage}
                    />
                  </Animated.View>
                )}

                {/* Back */}
                {flipped && card && (
                  <Animated.View
                    style={[
                      styles.cardImage,
                      styles.cardBack,
                      { transform: [{ rotateY: backInterpolate }] },
                    ]}
                  >
                    <Image source={card.image} style={styles.cardImage} />
                  </Animated.View>
                )}
              </View>
            );
          })}
        </View>

        {/* Descriptions */}
        {flipped && (
          <View style={styles.descriptionsContainer}>
            {selectedCards.map((card, index) => (
              <View
                key={card.id}
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
                <Text
                  style={[styles.cardNameInDescription, { color: theme.text }]}
                >
                  {card.name}
                </Text>
                <Text
                  style={[styles.cardMeaning, { color: theme.textSecondary }]}
                >
                  {card.meaning || "No meaning available"}
                </Text>
                <Text style={[styles.cardDescription, { color: theme.text }]}>
                  {card.card_description || "No description available"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Draw / Save & Reload Buttons */}
        <View style={styles.buttonsWrapper}>
          {!flipped ? (
            <TouchableOpacity
              style={[
                styles.singleButton,
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
            <>
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
                onPress={reloadCards}
              >
                <Text style={[styles.buttonText, { color: theme.accent }]}>
                  🧭 New Draw
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backfaceVisibility: "hidden",
  },
  cardBack: { position: "absolute", top: 0, left: 0 },
  descriptionsContainer: { width: "100%", marginTop: 10, gap: 12 },
  descriptionBox: { borderWidth: 1.5, borderRadius: 16, padding: 16 },
  timeLabel: { fontWeight: "700", marginBottom: 6, fontSize: 14 },
  cardNameInDescription: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  cardMeaning: { fontSize: 13, marginBottom: 4 },
  cardDescription: { fontSize: 13, lineHeight: 18, textAlign: "justify" },

  /* Buttons */
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  singleButton: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
