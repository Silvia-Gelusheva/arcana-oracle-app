import { Animated, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";

import { useTheme } from "../context/ThemeProvider";

const BACKSIDE = require("../../assets/cards/backside.png");

export default React.memo(function TarotCard({
  card,
  width = 120,
  flipped = false,
}) {
  const { theme } = useTheme();
  const flipAnim = useRef(new Animated.Value(flipped ? 180 : 0)).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 180 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [flipped]);

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const cardHeight = width * 1.6;

  return (
    <View style={{ width, height: cardHeight }}>
      {/* Backside */}
      <Animated.View
        style={[
          styles.card,
          {
            width,
            height: cardHeight,
            backgroundColor: theme.cardBackground,
            transform: [{ rotateY: frontRotate }],
          },
        ]}
      >
        <Image source={BACKSIDE} style={styles.cardImage} resizeMode="cover" />
      </Animated.View>

      {/* Face */}
      <Animated.View
        style={[
          styles.card,
          { width, height: cardHeight, transform: [{ rotateY: backRotate }] },
        ]}
      >
        {card?.image && (
          <Image
            source={{ uri: card.image }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        )}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    backfaceVisibility: "hidden",
  },
  cardImage: { width: "100%", height: "100%", borderRadius: 12 },
});
