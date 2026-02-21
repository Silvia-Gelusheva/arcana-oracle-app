import * as Yup from "yup";

import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useContext, useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeProvider";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();

  const passwordRef = useRef(null);
  const styles = createStyles(theme);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Too short").required("Password is required"),
  });
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const user = await login(values.email, values.password);

      const name = user?.username || user?.email || "friend";
      alert(`Welcome, ${name}!`);

      navigation.goBack();
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Title */}
            <View style={styles.header}>
              <Text style={styles.title}>Arcana Oracle</Text>
              <Text style={styles.subtitle}>Welcome back!</Text>
            </View>

            {/* Form */}
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
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={theme.placeholder}
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <TextInput
                      ref={passwordRef}
                      placeholder="Password"
                      placeholderTextColor={theme.placeholder}
                      style={styles.input}
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 60,
    },
    header: {
      alignItems: "center",
      marginBottom: 40,
    },
    title: {
      fontSize: 42,
      fontFamily: theme.fontFamily,
      color: theme.accent,
      letterSpacing: 2,
    },
    subtitle: {
      marginTop: 8,
      fontSize: 14,
      color: theme.textSecondary,
    },
    card: {
      width: "100%",
      backgroundColor: theme.cardBackground,
      borderRadius: 28,
      padding: 24,
    },
    input: {
      backgroundColor: theme.buttonSecondary,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    errorText: {
      color: "#ff6b6b",
      marginBottom: 10,
      fontSize: 12,
    },
    button: {
      marginTop: 16,
      padding: 18,
      borderRadius: 20,
      alignItems: "center",
      backgroundColor: theme.buttonPrimary,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
      letterSpacing: 1,
    },
    linkText: {
      marginTop: 24,
      textAlign: "center",
      color: theme.accent,
      fontSize: 14,
    },
  });
