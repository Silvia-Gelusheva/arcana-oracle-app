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

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return Alert.alert("Error", "All fields are required");
    }

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
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#d9c79e"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#d9c79e"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#d9c79e"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#e0c097" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#1c2541";
const panel = "#262d50";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: deepBlue,
  },
  title: {
    fontSize: 32,
    color: parchment,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: brass,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    backgroundColor: panel,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: parchment,
    borderWidth: 1.5,
    borderColor: brass,
    shadowColor: brass,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: panel,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    borderColor: brass,
    shadowColor: brass,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: parchment,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  linkText: {
    color: brass,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
