import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { useTheme } from "../context/ThemeProvider";

export default function AppCard({
  title,
  description,
  icon,
  gradientColor,
  onPress,
  style,
}) {
  const { theme } = useTheme();

  const accentColor = gradientColor || theme.accent;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {/* Glow Accent */}
      <View style={[styles.glow, { backgroundColor: accentColor }]} />

      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: accentColor }]}>
        {icon}
      </View>

      {/* Content */}
      <Text
        style={[
          styles.title,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        {title}
      </Text>

      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {description}
      </Text>

      {/* Bottom Accent Line */}
      <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
  },
  accentLine: {
    marginTop: 14,
    height: 4,
    width: 60,
    borderRadius: 2,
  },
});
