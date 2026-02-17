import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ProfileInput({
  label,
  editable = true,
  value,
  style,
  ...props
}) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        value={value || "—"}
        editable={editable}
        selectTextOnFocus={editable}
        style={[styles.input, !editable && styles.readonly, style]}
        placeholderTextColor="#ccc"
      />
    </View>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const darkBlue = "#0b132b";
const panel = "#262d50";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: brass,
    marginBottom: 4,
  },
  input: {
    backgroundColor: panel,
    padding: 12,
    borderRadius: 10,
    color: parchment,
    borderWidth: 1,
    borderColor: brass,
    fontSize: 14,
  },
  readonly: {
    backgroundColor: darkBlue,
    color: parchment,
  },
});
