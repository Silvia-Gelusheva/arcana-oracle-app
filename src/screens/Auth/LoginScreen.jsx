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
            Login
          </Text>

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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  returnKeyType="next"
                />
                {errors.email && touched.email && (
                  <Text style={[styles.errorText, { color: "#ff5555" }]}>
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
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                {errors.password && touched.password && (
                  <Text style={[styles.errorText, { color: "#ff5555" }]}>
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
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={[
                styles.linkText,
                { color: theme.accent, fontFamily: theme.fontFamily },
              ]}
            >
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
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
  errorText: { fontSize: 12, marginBottom: 8 },
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
