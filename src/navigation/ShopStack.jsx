import CartScreen from "../screens/Shop/CartScreen";
import CheckoutScreen from "../screens/Shop/CheckoutScreen";
import ProductDetailsScreen from "../screens/Shop/ProductDetailsScreen";
import ShopScreen from "../screens/Shop/ShopScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{ title: "Shop" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />
    </Stack.Navigator>
  );
}
