import { StyleSheet, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeProvider";

export default function ProfileInput({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = "default",
  icon = "person-outline",
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.accent,
          },
        ]}
      >
        {/* Left Icon */}
        <Ionicons
          name={icon}
          size={18}
          color={theme.accent}
          style={styles.icon}
        />

        <View style={{ flex: 1 }}>
          {/* Floating Label */}
          {label && (
            <Text
              style={[styles.floatingLabel, { color: theme.textSecondary }]}
            >
              {label}
            </Text>
          )}

          <TextInput
            value={value || ""}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.accent + "66"}
            keyboardType={keyboardType}
            style={[
              styles.input,
              {
                color: theme.text,
                fontFamily: theme.fontFamily,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 18,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  icon: {
    marginRight: 10,
  },

  floatingLabel: {
    fontSize: 11,
    marginBottom: 2,
    opacity: 0.7,
    letterSpacing: 0.5,
  },

  input: {
    fontSize: 15,
    paddingVertical: 4,
  },
});
