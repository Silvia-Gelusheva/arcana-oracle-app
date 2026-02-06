import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const readingsHistory = [
  { id: "1", title: "Daily Card", date: "2026-01-29" },
  { id: "2", title: "Three Card Reading", date: "2026-01-27" },
  { id: "3", title: "Daily Card", date: "2026-01-25" },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6INVo9HFc-pndC2fgs9t-jMZ_MTtGfQtCSA&s",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.email}>jane.doe@email.com</Text>
      </View>

      {/* Reading history */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Reading History</Text>

        <FlatList
          data={readingsHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0c29",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#6a5acd",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  historyContainer: {
    flex: 1,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: "#1c1b3a",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  historyTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  historyDate: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },
});
