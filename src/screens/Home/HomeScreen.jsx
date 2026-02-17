import {
  CardsIcon,
  MagicWandIcon,
  ShoppingCartIcon,
} from "phosphor-react-native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <ImageBackground
      source={{
        uri: "https://images7.alphacoders.com/136/thumb-1920-1361874.png",
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.rightMenu}>
          {user && (
            <>
              {/* DAILY CARD*/}
              <TouchableOpacity
                style={styles.steampunkButton}
                onPress={() =>
                  navigation.navigate("TarotStack", { screen: "DailyCard" })
                }
              >
                <View style={styles.buttonContent}>
                  <CardsIcon size={20} color="#e0c097" weight="duotone" />
                  <Text style={styles.buttonText}>Daily Card</Text>
                </View>
              </TouchableOpacity>
              {/* 3 CARDS*/}
              <TouchableOpacity
                style={styles.steampunkButton}
                onPress={() =>
                  navigation.navigate("TarotStack", {
                    screen: "ThreeCardReading",
                  })
                }
              >
                <View style={styles.buttonContent}>
                  <MagicWandIcon size={20} color="#e0c097" weight="duotone" />
                  <Text style={styles.buttonText}>Three Cards</Text>
                </View>
              </TouchableOpacity>
              {/* MY JOURNAL*/}
              <TouchableOpacity
                style={styles.steampunkButton}
                onPress={() =>
                  navigation.getParent()?.navigate("SavedReadingsScreen")
                }
              >
                <View style={styles.buttonContent}>
                  <MagicWandIcon size={20} color="#e0c097" weight="duotone" />
                  <Text style={styles.buttonText}>My Journal</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {/* ARCANA STORE*/}
          <TouchableOpacity
            style={[styles.steampunkButton, { marginTop: 50 }]}
            onPress={() => navigation.navigate("ShopStack")}
          >
            <View style={styles.buttonContent}>
              <ShoppingCartIcon size={20} color="#e0c097" weight="duotone" />
              <Text style={styles.buttonText}>Arcana Store</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(5,5,20,0.65)",
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },

  headerText: {
    fontFamily: "Cinzel_600SemiBold",
    fontSize: 20,
    color: "#e0c097",
    marginBottom: 30,
    textShadowColor: "#b87333",
    textShadowRadius: 6,
  },

  rightMenu: {
    position: "absolute",
    right: 20,
    top: "25%",
    width: 180,
  },

  steampunkButton: {
    backgroundColor: "#1c2541",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: "#b87333",
    shadowColor: "#07104f",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#e0c097",
    fontSize: 14,
    fontFamily: "Cinzel_600SemiBold",
    fontWeight: "600",
    marginLeft: 8,
  },
});
