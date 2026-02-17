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
import { useTheme } from "../../context/ThemeProvider";

export default function SavedReadingsScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
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
              setReadings((prev) => prev.filter((r) => r.id !== readingId));
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
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{ color: theme.textSecondary, marginTop: 8 }}>
          Loading readings...
        </Text>
      </View>
    );
  }

  if (!readings.length) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No readings saved yet.</Text>
      </View>
    );
  }

  const formatCard = (card) => {
    if (typeof card === "string")
      return { name: card, meaning: "-", description: "-" };
    return {
      name: card.name || "-",
      meaning: card.meaning || "-",
      description: card.description || "-",
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Journal</Text>

      <FlatList
        data={readings}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
              },
            ]}
          >
            <View style={styles.headerRow}>
              <View>
                <Text style={[styles.date, { color: theme.accent }]}>
                  {item.createdAt}
                </Text>
                <Text style={[styles.readingType, { color: theme.text }]}>
                  {item.type === "single"
                    ? "Single Card Reading"
                    : "Three Card Reading"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Trash size={24} color={theme.accent} weight="duotone" />
              </TouchableOpacity>
            </View>

            {item.cards.map((c, idx) => {
              const card = formatCard(c);
              return (
                <View
                  key={idx}
                  style={[styles.cardBlock, { borderTopColor: theme.accent }]}
                >
                  <Text style={[styles.cardName, { color: theme.text }]}>
                    {card.name}
                  </Text>
                  <Text
                    style={[styles.meaning, { color: theme.textSecondary }]}
                  >
                    Meaning: {card.meaning}
                  </Text>
                  <Text style={[styles.description, { color: theme.text }]}>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontFamily: "Cinzel_600SemiBold", marginBottom: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { borderRadius: 18, borderWidth: 1.5, padding: 16, marginBottom: 14 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  date: { fontSize: 12 },
  readingType: { fontSize: 14, fontWeight: "600" },
  cardBlock: { borderTopWidth: 1, paddingTop: 10, marginTop: 10 },
  cardName: { fontSize: 16, fontFamily: "Cinzel_600SemiBold", marginBottom: 4 },
  meaning: { fontSize: 13, marginBottom: 4 },
  description: { fontSize: 13, lineHeight: 18 },
});
