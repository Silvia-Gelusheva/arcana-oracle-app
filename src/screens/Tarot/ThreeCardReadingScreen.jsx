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

export default function ThreeCardReadingScreen() {
  const [selectedCards, setSelectedCards] = useState([]);
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);

  const drawCards = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setSelectedCards(shuffled.slice(0, 3));
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
    } catch (err) {
      console.log("Error saving reading:", err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.instruction, { color: theme.text }]}>
        Think of a question and focus. When you are ready...
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.accent,
          },
        ]}
        onPress={drawCards}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>
          {selectedCards.length ? "🧭 Redraw" : "🧭 Draw Cards"}
        </Text>
      </TouchableOpacity>

      {selectedCards.length > 0 && (
        <>
          <View style={styles.cardsRow}>
            {selectedCards.map((card) => (
              <View
                key={card.id}
                style={[
                  styles.cardContainer,
                  {
                    borderColor: theme.accent,
                    backgroundColor: theme.cardBackground,
                  },
                ]}
              >
                <Image source={card.image} style={styles.cardImage} />
              </View>
            ))}
          </View>

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

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: 20, backgroundColor: theme.accent },
            ]}
            onPress={saveReading}
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              🧭 Save Reading
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
  },

  instruction: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 22,
    shadowColor: "#b87333",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },

  cardContainer: {
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    width: 100,
  },

  cardImage: {
    width: 100,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },

  descriptionsContainer: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },

  descriptionBox: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
  },

  timeLabel: {
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 14,
  },

  cardNameInDescription: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  cardMeaning: {
    fontSize: 13,
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "justify",
  },
});
