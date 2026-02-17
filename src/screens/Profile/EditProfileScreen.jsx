import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import ProfileInput from "../../components/ProfileInput";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeProvider";
import { userService } from "../../services/userService";

export default function EditProfileScreen() {
  const { user, updateUser } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      country: user?.address?.country || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!user?.id || loading) return;

    Keyboard.dismiss();

    try {
      setLoading(true);
      await userService.updateProfile(user.id, userData);
      const freshUser = await userService.getUserById(user.id);
      updateUser(freshUser);
      navigation.goBack();
    } catch (error) {
      console.log("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { padding: 16 }]}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileInput
          placeholder="Username"
          value={userData.username}
          onChangeText={(text) => handleChange("username", text)}
          theme={theme}
        />

        <ProfileInput
          placeholder="Phone"
          value={userData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          theme={theme}
        />

        <ProfileInput
          placeholder="Avatar URL"
          value={userData.avatar}
          onChangeText={(text) => handleChange("avatar", text)}
          theme={theme}
        />

        <ProfileInput
          placeholder="Street"
          value={userData.address.street}
          onChangeText={(text) => handleAddressChange("street", text)}
          theme={theme}
        />

        <ProfileInput
          placeholder="City"
          value={userData.address.city}
          onChangeText={(text) => handleAddressChange("city", text)}
          theme={theme}
        />

        <ProfileInput
          placeholder="Country"
          value={userData.address.country}
          onChangeText={(text) => handleAddressChange("country", text)}
          theme={theme}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.accent },
            loading && { opacity: 0.6 },
          ]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  button: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
