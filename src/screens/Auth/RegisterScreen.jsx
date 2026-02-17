import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeProvider";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const { theme } = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password)
      return Alert.alert("Error", "All fields are required");

    try {
      setLoading(true);
      await register({ username, email, password });
      Alert.alert("Success", "Account created!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Register error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: theme.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={[
              styles.title,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            Create Account
          </Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor={theme.accent + "aa"}
            style={[
              styles.input,
              {
                backgroundColor: theme.cardBackground,
                color: theme.text,
                borderColor: theme.accent,
                fontFamily: theme.fontFamily,
              },
            ]}
            value={username}
            onChangeText={setUsername}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.accent + "aa"}
            style={[
              styles.input,
              {
                backgroundColor: theme.cardBackground,
                color: theme.text,
                borderColor: theme.accent,
                fontFamily: theme.fontFamily,
              },
            ]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.accent + "aa"}
            style={[
              styles.input,
              {
                backgroundColor: theme.cardBackground,
                color: theme.text,
                borderColor: theme.accent,
                fontFamily: theme.fontFamily,
              },
            ]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme.buttonPrimary,
                borderColor: theme.accent,
              },
              loading && { opacity: 0.6 },
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.text} />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.textSecondary, fontFamily: theme.fontFamily },
                ]}
              >
                Register
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={[
                styles.linkText,
                { color: theme.accent, fontFamily: theme.fontFamily },
              ]}
            >
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1.5,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  linkText: {
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
