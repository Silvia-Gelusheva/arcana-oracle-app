import ProductDetailsScreen from "../screens/Shop/ProductDetailsScreen";
import ShopScreen from "../screens/Shop/ShopScreen";
import SteampunkHeader from "../components/SteamPunkHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <SteampunkHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{ title: "Arcana Store" }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}
