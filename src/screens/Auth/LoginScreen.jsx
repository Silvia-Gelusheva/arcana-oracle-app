import * as Yup from "yup";

import {
  ActivityIndicator,
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

import { AuthContext } from "../../context/AuthContext";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Too short").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const user = await login(values.email, values.password);
      alert(`Welcome ${user.username}!`);
      navigation.goBack();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#1a0f2e", "#2d1554", "#1a0f2e"]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title */}
            <View style={styles.header}>
              <Text style={[styles.title, { fontFamily: theme.fontFamily }]}>
                Arcana
              </Text>
              <Text style={styles.subtitle}>Welcome back, seeker</Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <>
                    {/* Email */}
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#999"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    {/* Password */}
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#999"
                      style={styles.input}
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      onSubmitEditing={handleSubmit}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    {/* Button */}
                    <TouchableOpacity
                      style={[styles.button, isSubmitting && { opacity: 0.6 }]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </Formik>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    color: "#f5d0fe",
    fontWeight: "700",
    letterSpacing: 2,
  },
  subtitle: {
    color: "#c084fc",
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: "rgba(20,20,20,0.85)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  input: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#b87333",
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#b87333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  linkText: {
    marginTop: 20,
    textAlign: "center",
    color: "#c084fc",
    fontSize: 14,
  },
});
