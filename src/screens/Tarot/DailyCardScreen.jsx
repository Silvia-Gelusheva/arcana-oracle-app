import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { addReading } from "../../services/readingsService";
import { cards } from "../../../assets/cards/cardsData";
import { useTheme } from "../../context/ThemeProvider";

export default function DailyCardScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [selectedCard, setSelectedCard] = useState(null);

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setSelectedCard(cards[randomIndex]);
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
    } catch (err) {
      console.log("Error", "Failed to save reading.", cardData);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { backgroundColor: theme.background },
      ]}
    >
      {!selectedCard && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.accent,
            },
          ]}
          onPress={drawCard}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            🧭 Deep Dive
          </Text>
        </TouchableOpacity>
      )}

      {selectedCard && (
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.accent,
            },
          ]}
        >
          <View
            style={[
              styles.imageFrame,
              { backgroundColor: theme.panel, borderColor: theme.accent },
            ]}
          >
            <Image source={selectedCard.image} style={styles.cardImage} />
          </View>

          <Text style={[styles.cardName, { color: theme.text }]}>
            {selectedCard.name}
          </Text>
          <Text style={[styles.cardMeaning, { color: theme.textSecondary }]}>
            {selectedCard.meaning}
          </Text>
          <Text style={[styles.cardDescription, { color: theme.text }]}>
            {selectedCard.card_description || "No description available."}
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: 20, backgroundColor: theme.accent },
            ]}
            onPress={saveReading}
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              🧭 Save
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },

  button: {
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 22,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
    shadowColor: "#b87333",
  },

  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },

  cardContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 22,
    borderWidth: 2,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    width: "90%",
  },

  imageFrame: {
    borderWidth: 2,
    borderRadius: 18,
    padding: 8,
    marginBottom: 12,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  cardImage: {
    width: 180,
    height: 300,
    borderRadius: 12,
  },

  cardName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },

  cardMeaning: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
    fontStyle: "italic",
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
