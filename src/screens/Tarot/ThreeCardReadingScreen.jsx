import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { cards } from "../../../assets/cards/cardsData";
import { useState } from "react";

export default function ThreeCardReadingScreen() {
  const [selectedCards, setSelectedCards] = useState([]);

  const drawCards = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    const threeCards = shuffled.slice(0, 3);
    setSelectedCards(threeCards);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.instruction}>
        Think of a question and focus. When you are ready...
      </Text>

      <TouchableOpacity style={styles.button} onPress={drawCards}>
        <Text style={styles.buttonText}>🎴 Draw Cards</Text>
      </TouchableOpacity>

      {selectedCards.length > 0 && (
        <>
          <View style={styles.cardsRow}>
            {selectedCards.map((card) => (
              <View key={card.id} style={styles.cardContainer}>
                <Image source={card.image} style={styles.cardImage} />
                {/* <Text style={styles.cardName}>{card.name}</Text> */}
              </View>
            ))}
          </View>

          <View style={styles.descriptionsContainer}>
            {selectedCards.map((card, index) => (
              <View key={card.id} style={styles.descriptionBox}>
                <Text style={styles.timeLabel}>
                  {index + 1 === 1
                    ? "Past"
                    : index + 1 === 2
                      ? "Present"
                      : "Future"}
                </Text>
                <Text style={styles.cardNameInDescription}>{card.name}</Text>
                <Text style={styles.cardMeaning}>
                  {card.meaning || "No meaning available"}
                </Text>
                <Text style={styles.cardDescription}>
                  {card.card_description || "No description available"}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";
const panel = "#262d50";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
    backgroundColor: deepBlue,
  },

  instruction: {
    color: parchment,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: panel,
    borderColor: brass,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 22,
    marginBottom: 30,
    shadowColor: brass,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    color: parchment,
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

  // cardContainer: {
  //   alignItems: "center",
  //   padding: 12,
  //   borderRadius: 16,
  //   borderWidth: 1.5,
  //   borderColor: brass,
  //   backgroundColor: "rgba(28,37,65,0.85)",
  //   width: 100,
  // },

  cardImage: {
    width: 100,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },

  cardName: {
    fontSize: 14,
    fontWeight: "700",
    color: parchment,
    textAlign: "center",
  },

  descriptionsContainer: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },

  descriptionBox: {
    backgroundColor: panel,
    borderWidth: 1.5,
    borderColor: brass,
    borderRadius: 16,
    padding: 16,
  },

  timeLabel: {
    fontWeight: "700",
    color: brass,
    marginBottom: 6,
    fontSize: 14,
    textAlign: "left",
  },

  cardNameInDescription: {
    fontSize: 16,
    fontWeight: "700",
    color: parchment,
    marginBottom: 4,
    textAlign: "left",
  },

  cardMeaning: {
    fontSize: 13,
    color: "#f0e6ff",
    marginBottom: 4,
    textAlign: "left",
  },

  cardDescription: {
    color: parchment,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "justify",
  },
});
