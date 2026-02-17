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

export default function DailyCardScreen() {
  const { user } = useContext(AuthContext);
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
      console.log(cardData);
    } catch (err) {
      console.log(err);
      console.log("Error", "Failed to save reading.");
      console.log(cardData);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {!selectedCard && (
        <TouchableOpacity style={styles.button} onPress={drawCard}>
          <Text style={styles.buttonText}>🧭 Deep Dive</Text>
        </TouchableOpacity>
      )}
      {selectedCard && (
        <View style={styles.cardContainer}>
          <View style={styles.imageFrame}>
            <Image source={selectedCard.image} style={styles.cardImage} />
          </View>

          <Text style={styles.cardName}>{selectedCard.name}</Text>
          <Text style={styles.cardMeaning}>{selectedCard.meaning}</Text>
          <Text style={styles.cardDescription}>
            {selectedCard?.card_description || "No description available."}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: 20 },
              { backgroundColor: "#b87333" },
            ]}
            onPress={saveReading}
          >
            <Text style={styles.buttonText}>🧭 Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";
const panel = "#262d50";
const accent = "#431375";

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: deepBlue,
  },

  button: {
    backgroundColor: panel,
    borderColor: brass,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 22,
    shadowColor: brass,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },

  buttonText: {
    color: parchment,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },

  cardContainer: {
    alignItems: "center",
    backgroundColor: panel,
    padding: 20,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: brass,
    shadowColor: brass,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    width: "90%",
  },

  imageFrame: {
    borderWidth: 2,
    borderColor: brass,
    borderRadius: 18,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#1c2541",
    shadowColor: brass,
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
    color: parchment,
    marginBottom: 6,
    textAlign: "center",
  },

  cardMeaning: {
    fontSize: 14,
    color: "#f0e6ff",
    textAlign: "center",
    marginBottom: 8,
    fontStyle: "italic",
  },

  cardDescription: {
    fontSize: 14,
    color: parchment,
    lineHeight: 20,
    textAlign: "center",
  },
});
