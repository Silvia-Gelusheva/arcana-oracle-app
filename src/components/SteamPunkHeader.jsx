import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "../context/ThemeProvider";

export default function SteampunkHeader({ navigation, back, options }) {
  const { theme, toggleTheme } = useTheme();
  const title = options.title || "Screen";

  return (
    <View
      style={{
        height: 80,
        backgroundColor: theme.cardBackground,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderColor: theme.accent,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {back && (
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{ color: theme.text, fontSize: 20 }}>←</Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontFamily: theme.fontFamily,
          }}
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor: theme.accent,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontFamily: theme.fontFamily,
            fontWeight: "700",
          }}
        >
          Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
}
