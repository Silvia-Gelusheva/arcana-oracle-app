import * as ImagePicker from "expo-image-picker";

import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ProfileInput from "../../components/ProfileInput";
import { useTheme } from "../../context/ThemeProvider";
import { userService } from "../../services/userService";

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useContext(AuthContext);
  const { theme } = useTheme();

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

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access photos is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUserData((prev) => ({ ...prev, avatar: uri }));
    }
  };

  const handleChange = (field, value) =>
    setUserData((prev) => ({ ...prev, [field]: value }));

  const handleAddressChange = (field, value) =>
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));

  const handlePasswordChange = (field, value) =>
    setPasswordData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!user?.id || loading) return;

    Keyboard.dismiss();

    try {
      setLoading(true);

      //  Change password
      if (passwordData.newPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }

        await userService.changePassword(
          user.id,
          passwordData.currentPassword,
          passwordData.newPassword,
        );
      }

      //  Update profile
      await userService.updateProfile(user.id, userData);
      const freshUser = await userService.getUserById(user.id);
      updateUser(freshUser);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigation.goBack();
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* HEADER SECTION */}
            <View style={styles.headerRow}>
              <View style={styles.avatarContainer}>
                <Image
                  source={
                    userData.avatar
                      ? { uri: userData.avatar }
                      : require("../../../assets/avatar.png")
                  }
                  style={[styles.avatar, { borderColor: theme.accent }]}
                />

                <TouchableOpacity
                  style={[
                    styles.cameraButton,
                    { backgroundColor: theme.accent },
                  ]}
                  onPress={pickImage}
                >
                  <Ionicons name="camera" size={18} color={theme.background} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.topSaveButton,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.accent,
                    borderWidth: 1,
                  },
                ]}
                onPress={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={theme.accent} />
                ) : (
                  <Ionicons name="save" size={22} color={theme.accent} />
                )}
              </TouchableOpacity>
            </View>

            {/* PROFILE INPUTS */}
            <ProfileInput
              label="Username"
              value={userData.username}
              onChangeText={(text) => handleChange("username", text)}
              icon="person-outline"
            />

            <ProfileInput
              label="Phone"
              value={userData.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => handleChange("phone", text)}
              icon="call-outline"
            />

            <ProfileInput
              label="Street"
              value={userData.address.street}
              onChangeText={(text) => handleAddressChange("street", text)}
              icon="home-outline"
            />

            <ProfileInput
              label="City"
              value={userData.address.city}
              onChangeText={(text) => handleAddressChange("city", text)}
              icon="business-outline"
            />

            <ProfileInput
              label="Country"
              value={userData.address.country}
              onChangeText={(text) => handleAddressChange("country", text)}
              icon="earth-outline"
            />

            {/* PASSWORD SECTION */}
            <View style={styles.passwordSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Change Password
              </Text>

              <ProfileInput
                label="Current Password"
                value={passwordData.currentPassword}
                onChangeText={(text) =>
                  handlePasswordChange("currentPassword", text)
                }
                icon="lock-closed-outline"
                secureTextEntry
              />

              <ProfileInput
                label="New Password"
                value={passwordData.newPassword}
                onChangeText={(text) =>
                  handlePasswordChange("newPassword", text)
                }
                icon="key-outline"
                secureTextEntry
              />

              <ProfileInput
                label="Confirm Password"
                value={passwordData.confirmPassword}
                onChangeText={(text) =>
                  handlePasswordChange("confirmPassword", text)
                }
                icon="shield-checkmark-outline"
                secureTextEntry
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
  },

  cameraButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  topSaveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  passwordSection: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
  },
});
