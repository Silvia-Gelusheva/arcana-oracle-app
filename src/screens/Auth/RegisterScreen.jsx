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
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const { theme } = useTheme();

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
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  returnKeyType="next"
                />
                {errors.username && touched.username && (
                  <Text style={[styles.errorText, { color: "red" }]}>
                    {errors.username}
                  </Text>
                )}

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
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                {errors.email && touched.email && (
                  <Text style={[styles.errorText, { color: "red" }]}>
                    {errors.email}
                  </Text>
                )}

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
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                {errors.password && touched.password && (
                  <Text style={[styles.errorText, { color: "red" }]}>
                    {errors.password}
                  </Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: theme.buttonPrimary,
                      borderColor: theme.accent,
                    },
                    isSubmitting && { opacity: 0.6 },
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color={theme.text} />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: theme.textSecondary,
                          fontFamily: theme.fontFamily,
                        },
                      ]}
                    >
                      Register
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

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
    marginBottom: 8,
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
  errorText: {
    marginBottom: 8,
    fontSize: 12,
  },
});
