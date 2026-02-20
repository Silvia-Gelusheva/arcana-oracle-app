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
import { addReading } from "../../services/readingsService";
import { cards } from "../../../assets/cards/cardsData";
import { useTheme } from "../../context/ThemeProvider";

export default function DailyCardScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setSelectedCard(cards[randomIndex]);
    setIsFlipped(true);

    flipAnim.setValue(0);
    Animated.timing(flipAnim, {
      toValue: 180,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const saveReading = async () => {
    if (!selectedCard || !user) return;

    const cardData = {
      name: selectedCard.name,
      meaning: selectedCard.meaning,
      description: selectedCard.card_description,
    };

    try {
      await addReading(user.id, "single", [cardData]);
      console.log("Success", "Your daily card has been saved!");
      setSelectedCard(null);
      setIsFlipped(false);
      flipAnim.setValue(0);
    } catch (err) {
      console.log("Error", "Failed to save reading.", cardData);
    }
  };

  const newReading = () => {
    setSelectedCard(null);
    setIsFlipped(false);
    flipAnim.setValue(0);
  };

  const cardWidth = 180;
  const descriptionWidth = "85%";

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { backgroundColor: theme.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Intro Text */}
      {!selectedCard && (
        <Text style={[styles.introText, { color: theme.text }]}>
          A new day unfolds like a blank canvas. Draw a card to reveal your
          guidance.
        </Text>
      )}

      {/* Title & Meaning */}
      {isFlipped && selectedCard && (
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <Text style={[styles.cardName, { color: theme.text }]}>
            {selectedCard.name}
          </Text>
          <Text style={[styles.cardMeaning, { color: theme.textSecondary }]}>
            {selectedCard.meaning}
          </Text>
        </View>
      )}

      {/* Flip Card Container */}
      <View
        style={[
          styles.cardContainer,
          { width: cardWidth, height: cardWidth * 1.7 },
        ]}
      >
        {/* Front */}
        <Animated.View
          style={[
            styles.cardImage,
            { transform: [{ rotateY: frontInterpolate }] },
          ]}
        >
          {!isFlipped && (
            <Image
              source={require("../../../assets/cards/backside.png")}
              style={styles.cardImage}
            />
          )}
        </Animated.View>

        {/* Back */}
        <Animated.View
          style={[
            styles.cardImage,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
        >
          {isFlipped && selectedCard && (
            <Image source={selectedCard.image} style={styles.cardImage} />
          )}
        </Animated.View>
      </View>

      {/* Description  */}
      {isFlipped && selectedCard && (
        <View
          style={[
            styles.descriptionCard,
            {
              width: descriptionWidth,
              backgroundColor: theme.cardBackground,
              borderColor: theme.accent,
            },
          ]}
        >
          <Text style={[styles.cardDescription, { color: theme.text }]}>
            {selectedCard.card_description || "No description available."}
          </Text>
        </View>
      )}

      {/* Buttons */}
      {isFlipped && selectedCard && (
        <View style={[styles.buttonsContainer, { width: descriptionWidth }]}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.accent }]}
            onPress={saveReading}
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              🧭 Save Reading
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.reloadButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
              },
            ]}
            onPress={newReading}
          >
            <Text style={[styles.reloadIcon, { color: theme.accent }]}>↻</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Draw Button */}
      {!isFlipped && (
        <TouchableOpacity
          style={[
            styles.drawButton,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.accent,
            },
          ]}
          onPress={drawCard}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            🧭 Draw Your Card
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  introText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  descriptionCard: {
    padding: 18,
    borderRadius: 24,
    borderWidth: 2,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 12,
  },
  cardName: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  cardMeaning: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  drawButton: {
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    marginRight: 10,
  },
  reloadButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  reloadIcon: {
    fontSize: 20,
    fontWeight: "700",
  },
});
