import { Button, Text, View } from "react-native";

export default function ShopScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text>Shop</Text>
      <Button
        title="Go to Cart"
        onPress={() => navigation.getParent()?.navigate("Cart")}
      />
    </View>
  );
}
