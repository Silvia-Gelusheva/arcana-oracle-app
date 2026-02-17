import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  deleteReading,
  getReadingsByUserId,
} from "../../services/readingsService";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Trash } from "phosphor-react-native";

export default function SavedReadingsScreen() {
  const { user } = useContext(AuthContext);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadReadings() {
      try {
        const data = await getReadingsByUserId(user.id);
        setReadings(data.reverse());
      } catch (err) {
        console.log("Failed to fetch readings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadReadings();
  }, [user]);

  const handleDelete = (readingId) => {
    Alert.alert(
      "Delete Reading",
      "Are you sure you want to delete this reading?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReading(readingId);
              setReadings((prev) =>
                prev.filter((reading) => reading.id !== readingId),
              );
            } catch (err) {
              console.log("Delete failed:", err);
              Alert.alert("Error", "Failed to delete reading");
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b87333" />
        <Text style={{ color: "#e0c097", marginTop: 8 }}>
          Loading readings...
        </Text>
      </View>
    );
  }

  if (!readings.length) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#e0c097" }}>No readings saved yet.</Text>
      </View>
    );
  }

  const formatCard = (card) => {
    if (typeof card === "string") {
      return { name: card, meaning: "-", description: "-" };
    }
    return {
      name: card.name || "-",
      meaning: card.meaning || "-",
      description: card.description || "-",
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Journal</Text>

      <FlatList
        data={readings}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.date}>{item.createdAt}</Text>
                <Text style={styles.readingType}>
                  {item.type === "single"
                    ? "Single Card Reading"
                    : "Three Card Reading"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Trash size={24} color="#b87333" weight="duotone" />
              </TouchableOpacity>
            </View>

            {item.cards.map((c, idx) => {
              const card = formatCard(c);
              return (
                <View key={idx} style={styles.cardBlock}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Text style={styles.meaning}>Meaning: {card.meaning}</Text>
                  <Text style={styles.description}>
                    Description: {card.description}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";
const panel = "#262d50";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: deepBlue, padding: 16 },
  header: {
    fontSize: 24,
    color: parchment,
    fontFamily: "Cinzel_600SemiBold",
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: deepBlue,
  },
  card: {
    backgroundColor: panel,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: brass,
    padding: 16,
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  date: { color: brass, fontSize: 12 },
  readingType: {
    color: parchment,
    fontSize: 14,
    fontWeight: "600",
  },
  cardBlock: {
    borderTopWidth: 1,
    borderTopColor: brass,
    paddingTop: 10,
    marginTop: 10,
  },
  cardName: {
    color: parchment,
    fontSize: 16,
    fontFamily: "Cinzel_600SemiBold",
    marginBottom: 4,
  },
  meaning: { color: "#f0e6ff", fontSize: 13, marginBottom: 4 },
  description: { color: parchment, fontSize: 13, lineHeight: 18 },
});
