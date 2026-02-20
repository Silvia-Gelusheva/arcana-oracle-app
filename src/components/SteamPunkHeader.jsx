import { Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeProvider";

export default function SteampunkHeader({ navigation, back, options }) {
  const { theme } = useTheme();
  const title = options.title || "Screen";

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ width: "100%" }}>
      <View
        style={{
          paddingTop: 40, // за status bar
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* BACK BUTTON */}
          {back ? (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: theme.cardBackground,
                borderWidth: 1,
                borderColor: theme.accent,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: theme.accent,
                  fontSize: 20,
                  fontFamily: theme.fontFamily, // fontFamily за стрелката
                }}
              >
                ←
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 36 }} />
          )}

          {/* TITLE */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 20,
                fontWeight: "500",
                letterSpacing: 1,
                fontFamily: theme.fontFamily,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          {/* Spacer */}
          <View style={{ width: 36 }} />
        </View>

        {/* DIVIDER */}
        <View
          style={{
            height: 1,
            backgroundColor: theme.accent,
            marginTop: 24,
          }}
        />
      </View>
    </LinearGradient>
  );
}
