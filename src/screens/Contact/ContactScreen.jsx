import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  YoutubeLogoIcon,
} from "phosphor-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "../../context/ThemeProvider";

export default function ContactScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.title,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        ARCANA ORACLE
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.accent },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Customer Support
        </Text>
        <Text
          style={[
            styles.cardText,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          For questions, guidance, or assistance regarding your readings and
          purchases, feel free to contact us.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.accent },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Email
        </Text>
        <Text
          style={[
            styles.cardText,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          support@arcanaoracle.com
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.accent },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Phone
        </Text>
        <Text
          style={[
            styles.cardText,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          +123 456 7890
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.accent },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Stay Connected
        </Text>
        <Text
          style={[
            styles.cardText,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Follow us for mystical insights and new Arcana releases.
        </Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.iconWrapper, { borderColor: theme.accent }]}
          >
            <FacebookLogoIcon size={28} color={theme.text} weight="duotone" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconWrapper, { borderColor: theme.accent }]}
          >
            <InstagramLogoIcon size={28} color={theme.text} weight="duotone" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconWrapper, { borderColor: theme.accent }]}
          >
            <YoutubeLogoIcon size={28} color={theme.text} weight="duotone" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 60 },

  title: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
  },

  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1.5,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  cardText: {
    fontSize: 15,
    lineHeight: 24,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  iconWrapper: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 50,
    borderWidth: 1.5,
  },
});
