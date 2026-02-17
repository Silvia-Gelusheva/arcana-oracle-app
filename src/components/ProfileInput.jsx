import { StyleSheet, Text, TextInput, View } from "react-native";

import { useTheme } from "../context/ThemeProvider";

export default function ProfileInput({
  label,
  editable = true,
  value,
  style,
  ...props
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: theme.accent }]}>{label}</Text>
      )}
      <TextInput
        {...props}
        value={value || "—"}
        editable={editable}
        selectTextOnFocus={editable}
        style={[
          styles.input,
          !editable && {
            backgroundColor: theme.cardBackground,
            color: theme.text,
          },
          {
            backgroundColor: theme.cardBackground,
            color: theme.text,
            borderColor: theme.accent,
            fontFamily: theme.fontFamily,
          },
          style,
        ]}
        placeholderTextColor={theme.accent + "99"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
  },
});
