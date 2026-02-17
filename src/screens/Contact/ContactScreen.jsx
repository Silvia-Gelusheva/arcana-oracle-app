import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
} from "phosphor-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>ARCANA ORACLE</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Customer Support</Text>
        <Text style={styles.cardText}>
          For questions, guidance, or assistance regarding your readings and
          purchases, feel free to contact us.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Email</Text>
        <Text style={styles.cardText}>support@arcanaoracle.com</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phone</Text>
        <Text style={styles.cardText}>+123 456 7890</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Stay Connected</Text>
        <Text style={styles.cardText}>
          Follow us for mystical insights and new Arcana releases.
        </Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <FacebookLogo size={28} color="#e0c097" weight="duotone" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <InstagramLogo size={28} color="#e0c097" weight="duotone" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <YoutubeLogo size={28} color="#e0c097" weight="duotone" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";
const panel = "#262d50";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: deepBlue },
  content: { padding: 24, paddingBottom: 60 },

  title: {
    fontFamily: "Cinzel_600SemiBold",
    fontSize: 26,
    color: parchment,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: panel,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: brass,
    shadowColor: brass,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardTitle: {
    fontFamily: "Cinzel_600SemiBold",
    fontSize: 18,
    color: parchment,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  cardText: {
    fontFamily: "Cinzel_500Medium",
    fontSize: 15,
    color: brass,
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
    borderColor: brass,
  },
});
