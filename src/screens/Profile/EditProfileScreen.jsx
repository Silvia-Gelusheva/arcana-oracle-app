import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import ProfileInput from "../../components/ProfileInput";
import { useNavigation } from "@react-navigation/native";
import { userService } from "../../services/userService";

export default function EditProfileScreen() {
  const { user, updateUser } = useContext(AuthContext);
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
      style={{ flex: 1, backgroundColor: "#0b132b" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileInput
          placeholder="Username"
          value={userData.username}
          onChangeText={(text) => handleChange("username", text)}
        />

        <ProfileInput
          placeholder="Phone"
          value={userData.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />

        <ProfileInput
          placeholder="Avatar URL"
          value={userData.avatar}
          onChangeText={(text) => handleChange("avatar", text)}
        />

        <ProfileInput
          placeholder="Street"
          value={userData.address.street}
          onChangeText={(text) => handleAddressChange("street", text)}
        />

        <ProfileInput
          placeholder="City"
          value={userData.address.city}
          onChangeText={(text) => handleAddressChange("city", text)}
        />

        <ProfileInput
          placeholder="Country"
          value={userData.address.country}
          onChangeText={(text) => handleAddressChange("country", text)}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#b87333",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#0b132b",
    fontWeight: "700",
  },
});
