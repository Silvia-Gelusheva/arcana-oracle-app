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
import { useTheme } from "../../context/ThemeProvider";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { theme, themeName } = useTheme();

  const backgroundImage =
    themeName === "light"
      ? require("../../../assets/lightTheme.png")
      : require("../../../assets/darkTheme.png");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.bg}
      resizeMode="cover"
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor:
              themeName === "light"
                ? "rgba(255,250,240,0.6)"
                : "rgba(5,5,20,0.65)",
          },
        ]}
      >
        <View style={styles.rightMenu}>
          {user && (
            <>
              <TouchableOpacity
                style={[
                  styles.steampunkButton,
                  {
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("TarotStack", { screen: "DailyCard" })
                }
              >
                <View style={styles.buttonContent}>
                  <CardsIcon size={20} color={theme.text} weight="duotone" />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.text, fontFamily: theme.fontFamily },
                    ]}
                  >
                    Daily Card
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.steampunkButton,
                  {
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("TarotStack", {
                    screen: "ThreeCardReading",
                  })
                }
              >
                <View style={styles.buttonContent}>
                  <MagicWandIcon
                    size={20}
                    color={theme.text}
                    weight="duotone"
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.text, fontFamily: theme.fontFamily },
                    ]}
                  >
                    Three Cards
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.steampunkButton,
                  {
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() =>
                  navigation.getParent()?.navigate("SavedReadingsScreen")
                }
              >
                <View style={styles.buttonContent}>
                  <MagicWandIcon
                    size={20}
                    color={theme.text}
                    weight="duotone"
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.text, fontFamily: theme.fontFamily },
                    ]}
                  >
                    My Journal
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.steampunkButton,
              {
                marginTop: 50,
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
              },
            ]}
            onPress={() => navigation.navigate("ShopStack")}
          >
            <View style={styles.buttonContent}>
              <ShoppingCartIcon size={20} color={theme.text} weight="duotone" />
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.text, fontFamily: theme.fontFamily },
                ]}
              >
                Arcana Store
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  rightMenu: { position: "absolute", right: 20, top: "25%", width: 180 },
  steampunkButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 10,
    borderWidth: 1.5,
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
  buttonText: { fontSize: 14, fontWeight: "600", marginLeft: 8 },
});
