import { Animated, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";

export default function TarotCard({
  card,
  width = 120,
  theme,
  flipped = false,
}) {
  const flipAnim = useRef(new Animated.Value(flipped ? 180 : 0)).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 180 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [flipped]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const cardHeight = width * 1.6;

  return (
    <View style={{ width, height: cardHeight }}>
      {/* Front (Backside) */}
      <Animated.View
        style={[
          styles.card,
          {
            width,
            height: cardHeight,
            backgroundColor: theme.cardBackground,
            transform: [{ rotateY: frontInterpolate }],
            position: "absolute",
            top: 0,
            left: 0,
          },
        ]}
      >
        {!flipped && (
          <Image
            source={require("../../assets/cards/backside.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        )}
      </Animated.View>

      {/* Back (Face) */}
      <Animated.View
        style={[
          styles.card,
          {
            width,
            height: cardHeight,
            transform: [{ rotateY: backInterpolate }],
            position: "absolute",
            top: 0,
            left: 0,
          },
        ]}
      >
        {flipped && card?.image && (
          <Image
            source={{ uri: card.image }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    backfaceVisibility: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
