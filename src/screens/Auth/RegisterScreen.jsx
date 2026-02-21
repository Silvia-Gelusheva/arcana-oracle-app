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
import { useTheme } from "../../context/ThemeProvider";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const { theme } = useTheme();

  const styles = createStyles(theme);
  const passwordRef = useRef(null);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username too short")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      await register(values);
      alert("Account created!");
      resetForm();
      navigation.goBack();
    } catch (err) {
      alert("Register error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Join us</Text>
            <Text style={styles.subtitle}> Begin your journey</Text>
          </View>

          {/* Form */}
          <View style={styles.card}>
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
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
                    placeholder="Username"
                    placeholderTextColor={theme.placeholder}
                    style={styles.input}
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    returnKeyType="next"
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.placeholder}
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
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
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
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
                      <Text style={styles.buttonText}>Sign up</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
      backgroundColor: theme.background,
    },
    header: {
      alignItems: "center",
      marginBottom: 40,
    },
    title: {
      fontSize: 34,
      fontFamily: theme.fontFamily,
      color: theme.accent,
      letterSpacing: 1.5,
    },
    subtitle: {
      marginTop: 6,
      fontSize: 14,
      color: theme.textSecondary,
    },
    card: {
      width: "100%",
      backgroundColor: theme.cardBackground,
      borderRadius: 24,
      padding: 24,
    },
    input: {
      backgroundColor: theme.buttonSecondary,
      borderRadius: 14,
      padding: 16,
      marginBottom: 12,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    errorText: {
      color: "#ff6b6b",
      fontSize: 12,
      marginBottom: 8,
    },
    button: {
      marginTop: 16,
      padding: 16,
      borderRadius: 18,
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
      marginTop: 20,
      textAlign: "center",
      color: theme.accent,
      fontSize: 14,
    },
  });
