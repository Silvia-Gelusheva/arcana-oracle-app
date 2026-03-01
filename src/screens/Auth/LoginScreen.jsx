import * as Yup from "yup";

import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useContext, useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeProvider";

export default function LoginScreen({ navigation }) {

  const { login } = useContext(AuthContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const passwordRef = useRef(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Too short").required("Password is required"),
  });

  const showMessage = (title, message) => {
    ToastAndroid.showWithGravity(
      `${title}: ${message}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      Keyboard.dismiss();

      const loggedUser = await login(values.email, values.password);
      const name = loggedUser?.username || loggedUser?.email || "friend";

      showMessage("Welcome", `Hello, ${name}!`);
      navigation.goBack();
    } catch (err) {
      showMessage("Error", err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={20}
        >
          <View style={styles.container}>
            {/* Header */}
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
                    {/* Email */}
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={theme.placeholder}
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    {/* Password */}
                    <TextInput
                      ref={passwordRef}
                      placeholder="Password"
                      placeholderTextColor={theme.placeholder}
                      style={styles.input}
                      secureTextEntry
                      autoCapitalize="none"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      returnKeyType="done"
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
                      activeOpacity={0.8}
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
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
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
    header: { alignItems: "center", marginBottom: 40 },
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
      backgroundColor: theme.cardBackground,
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
