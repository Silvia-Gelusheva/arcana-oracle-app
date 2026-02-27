import * as Yup from "yup";

import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../../context/ThemeProvider";

const showMessage = (title, message) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(
      `${title}: ${message}`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  } else {
    Alert.alert(title, message);
  }
};

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const emailRef = useRef(null);
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

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const newUser = await register(values);
      showMessage(
        "Success",
        `Account created successfully! Welcome, ${newUser.username || newUser.email}`,
      );
      navigation.getParent()?.goBack();
    } catch (err) {
      showMessage("Register Error", err?.message || "Failed to register");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Join us</Text>
            <Text style={styles.subtitle}>Begin your mystical journey</Text>
          </View>

          {/* Card */}
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
                    blurOnSubmit={false}
                    onSubmitEditing={() => emailRef.current?.focus()}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  <TextInput
                    ref={emailRef}
                    placeholder="Email"
                    placeholderTextColor={theme.placeholder}
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
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
                    onSubmitEditing={handleSubmit}
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
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
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
    header: { alignItems: "center", marginBottom: 40 },
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
      backgroundColor: theme.cardBackground,
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
