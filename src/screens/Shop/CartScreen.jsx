import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { Trash } from "phosphor-react-native";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function CartScreen({ navigation }) {
  const { items, decreaseQty, increaseQty, removeItem } =
    useContext(CartContext);
  const { theme } = useTheme();

  const handleCheckout = () => {
    if (navigation.getState()?.routeNames?.includes("Checkout")) {
      navigation.navigate("Checkout");
    } else {
      navigation.navigate("CheckoutModal");
    }
  };

  if (!items.length) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: theme.background }]}
      >
        <Text
          style={[
            styles.emptyTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          🜂 Your Cart is Empty
        </Text>
        <Text
          style={[
            styles.emptySubtitle,
            { color: theme.text + "cc", fontFamily: theme.fontFamily },
          ]}
        >
          The Arcana awaits your next relic...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
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
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/100" }}
              style={[
                styles.image,
                {
                  borderColor: theme.accent,
                  backgroundColor: theme.background,
                },
              ]}
            />

            <View style={styles.info}>
              <Text
                style={[
                  styles.title,
                  { color: theme.text, fontFamily: theme.fontFamily },
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <View
                style={[
                  styles.qtyWrapper,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => decreaseQty(item.id)}
                  style={styles.qtyButton}
                >
                  <Text
                    style={[
                      styles.qtyText,
                      { color: theme.text, fontFamily: theme.fontFamily },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.qtyValue,
                    { color: theme.text, fontFamily: theme.fontFamily },
                  ]}
                >
                  {item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() => increaseQty(item.id)}
                  style={styles.qtyButton}
                >
                  <Text
                    style={[
                      styles.qtyText,
                      { color: theme.text, fontFamily: theme.fontFamily },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.trash}
            >
              <Trash size={20} color={theme.accent} weight="duotone" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View
        style={[
          styles.footer,
          { backgroundColor: theme.background, borderColor: theme.accent },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            { borderColor: theme.accent, backgroundColor: theme.accent },
          ]}
          onPress={handleCheckout}
        >
          <Text
            style={[
              styles.checkoutText,
              { color: theme.background, fontFamily: theme.fontFamily },
            ]}
          >
            ⚙️ Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  emptySubtitle: { fontSize: 14, textAlign: "center", opacity: 0.8 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 14,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  info: { flex: 1, justifyContent: "center" },
  title: { fontSize: 15, fontWeight: "600", marginBottom: 8 },
  qtyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1.5,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyButton: { paddingHorizontal: 6 },
  qtyText: { fontSize: 18, fontWeight: "700" },
  qtyValue: { fontSize: 16, fontWeight: "700", marginHorizontal: 10 },
  trash: { padding: 6, marginLeft: 6 },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    borderTopWidth: 1,
  },
  checkoutButton: {
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
  },
  checkoutText: { fontWeight: "700", fontSize: 16 },
});
