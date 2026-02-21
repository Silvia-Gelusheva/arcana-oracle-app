import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  YoutubeLogoIcon,
} from "phosphor-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeProvider";

export default function ContactScreen() {
  const { theme } = useTheme();

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text
            style={[
              styles.appTitle,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            Arcana
          </Text>
          <Text
            style={[
              styles.appSubtitle,
              { color: theme.textSecondary, fontFamily: theme.fontFamily },
            ]}
          >
            ORACLE
          </Text>
          <Text
            style={[
              styles.appTagline,
              { color: theme.textSecondary, fontFamily: theme.fontFamily },
            ]}
          >
            Get in touch with our support
          </Text>
        </View>

        {/* CONTACT CARD */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          {/* PROFILE IMAGE */}
          <Image
            source={require("../../../assets/contact.png")}
            style={styles.profileImage}
          />

          {/* TITLE */}
          <Text
            style={[
              styles.name,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            Arcana Oracle
          </Text>
          <Text
            style={[
              styles.tagline,
              { color: theme.accent, fontFamily: theme.fontFamily },
            ]}
          >
            Mystical Support
          </Text>

          {/* CONTACT INFO */}
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Email:
            </Text>
            <Text style={[styles.infoText, { color: theme.text }]}>
              support@arcanaoracle.com
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Phone:
            </Text>
            <Text style={[styles.infoText, { color: theme.text }]}>
              +123 456 7890
            </Text>
          </View>

          {/* SOCIAL ICONS */}
          <Text
            style={[
              styles.followText,
              { color: theme.textSecondary, fontFamily: theme.fontFamily },
            ]}
          >
            Follow us
          </Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.iconWrapper}>
              <FacebookLogoIcon size={36} color="#1877F2" weight="duotone" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <InstagramLogoIcon size={36} color="#E1306C" weight="duotone" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <YoutubeLogoIcon size={36} color="#FF0000" weight="duotone" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 30,
  },
  appTitle: { fontSize: 28, fontWeight: "600" },
  appSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 2,
    marginTop: 4,
  },
  appTagline: { fontSize: 14, marginTop: 4 },

  card: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },

  name: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  tagline: { fontSize: 16, fontWeight: "600", marginBottom: 20 },

  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  infoLabel: { fontSize: 14, fontWeight: "500" },
  infoText: { fontSize: 14, fontWeight: "600" },

  followText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "500",
  },

  socialContainer: { flexDirection: "row", justifyContent: "center" },
  iconWrapper: { marginHorizontal: 14, padding: 12, borderRadius: 50 },
});
