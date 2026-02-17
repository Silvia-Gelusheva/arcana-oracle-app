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

export default function CartScreen({ navigation }) {
  const { items, decreaseQty, increaseQty, removeItem } =
    useContext(CartContext);

  const handleCheckout = () => {
    if (navigation.getState()?.routeNames?.includes("Checkout")) {
      navigation.navigate("Checkout");
    } else {
      navigation.navigate("CheckoutModal");
    }
  };

  if (!items.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>🜂 Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          The Arcana awaits your next relic...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* IMAGE */}
            <Image
              source={{
                uri: item.image || "https://via.placeholder.com/100",
              }}
              style={styles.image}
            />

            {/* INFO */}
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              {/* QTY CONTROL */}
              <View style={styles.qtyWrapper}>
                <TouchableOpacity
                  onPress={() => decreaseQty(item.id)}
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyValue}>{item.qty}</Text>

                <TouchableOpacity
                  onPress={() => increaseQty(item.id)}
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* DELETE */}
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.trash}
            >
              <Trash size={20} color="#e0c097" weight="duotone" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* FLOATING CHECKOUT */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>⚙️ Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const copper = "#b87333";
const gold = "#e0c097";
const bg = "#1c2541";
const cardBg = "#262d50";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
    padding: 16,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: bg,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  emptyTitle: {
    color: gold,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "Cinzel_600SemiBold",
  },

  emptySubtitle: {
    color: "#f0e6ff",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cardBg,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: copper,
    padding: 14,
    marginBottom: 14,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: copper,
    backgroundColor: bg,
    marginRight: 12,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: gold,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  qtyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: bg,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: copper,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  qtyButton: {
    paddingHorizontal: 6,
  },

  qtyText: {
    color: gold,
    fontSize: 18,
    fontWeight: "700",
  },

  qtyValue: {
    color: gold,
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 10,
  },

  trash: {
    padding: 6,
    marginLeft: 6,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: bg,
    borderTopWidth: 1,
    borderColor: copper,
  },

  checkoutButton: {
    backgroundColor: "#431375",
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: copper,
    alignItems: "center",
  },

  checkoutText: {
    color: gold,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Cinzel_600SemiBold",
  },
});
