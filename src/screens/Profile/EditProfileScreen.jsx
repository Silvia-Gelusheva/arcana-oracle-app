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
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth, storage } from "../../firebase/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useContext, useEffect, useState } from "react";

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
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      country: user?.address?.country || "",
    },
    avatar: user?.avatar || "",
  });

  const [avatarMarkedForDelete, setAvatarMarkedForDelete] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [saveReminder, setSaveReminder] = useState(false);

  // --- IMAGE PICKER ---
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    const localUri = result.assets[0].uri;

    try {
      setImageUploading(true);

      const response = await fetch(localUri);
      const blob = await response.blob();

      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      setUserData((prev) => ({
        ...prev,
        avatar: downloadURL,
      }));

      setAvatarMarkedForDelete(false);
      setSaveReminder(true);
    } catch (err) {
      console.error("Upload failed:", err);
      ToastAndroid.show("Image upload failed", ToastAndroid.SHORT);
    } finally {
      setImageUploading(false);
    }
  };

  // --- DELETE AVATAR (MARK ONLY) ---
  const deleteImage = () => {
    if (!userData.avatar) return;

    setAvatarMarkedForDelete(true);
    setSaveReminder(true);
  };

  // --- SAVE REMINDER TOAST ---
  useEffect(() => {
    if (saveReminder) {
      ToastAndroid.showWithGravityAndOffset(
        "Press Save to apply changes",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,
        100,
      );

      const timer = setTimeout(() => setSaveReminder(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [saveReminder]);

  // --- HANDLE CHANGE ---
  const handleChange = (field, value) =>
    setUserData((prev) => ({ ...prev, [field]: value }));

  const handleAddressChange = (field, value) =>
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));

  const handlePasswordChange = (field, value) =>
    setPasswordData((prev) => ({ ...prev, [field]: value }));

  const showMessage = (title, message) => {
    ToastAndroid.showWithGravity(
      `${title}: ${message}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  // --- SAVE PROFILE ---
  const handleSave = async () => {
    if (!user?.uid || saving) return;

    Keyboard.dismiss();
    setSaving(true);

    try {
      let finalUserData = { ...userData };

      if (avatarMarkedForDelete) {
        const storageRef = ref(storage, `avatars/${user.uid}`);

        try {
          await deleteObject(storageRef);
        } catch (err) {
          if (err.code !== "storage/object-not-found") {
            throw err;
          }
        }

        finalUserData.avatar = "";
      }

      const updatedUser = await userService.updateUser(user.uid, finalUserData);

      await updateUser(updatedUser);

      const { currentPassword, newPassword, confirmPassword } = passwordData;

      if (currentPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword)
          throw new Error("Passwords do not match");

        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );

        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
      }

      setAvatarMarkedForDelete(false);

      showMessage("Success", "Profile updated!");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      ToastAndroid.show(err.message || "Update failed", ToastAndroid.SHORT);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarContainer}>
                <Image
                  source={
                    userData.avatar && !avatarMarkedForDelete
                      ? { uri: userData.avatar }
                      : require("../../../assets/avatar.png")
                  }
                  style={[styles.avatar, { borderColor: theme.accent }]}
                />

                {imageUploading && (
                  <View style={styles.avatarOverlay}>
                    <ActivityIndicator size="large" color={theme.accent} />
                  </View>
                )}

                <TouchableOpacity
                  style={[
                    styles.cameraButton,
                    { backgroundColor: theme.accent },
                  ]}
                  onPress={pickImage}
                  disabled={imageUploading}
                >
                  <Ionicons name="camera" size={18} color={theme.background} />
                </TouchableOpacity>
              </View>

              <View style={{ width: "100%", marginTop: 24 }}>
                <TouchableOpacity
                  onPress={
                    userData.avatar && !avatarMarkedForDelete
                      ? deleteImage
                      : null
                  }
                  disabled={
                    !userData.avatar || avatarMarkedForDelete || imageUploading
                  }
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.accent,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        userData.avatar && !avatarMarkedForDelete
                          ? theme.accent
                          : theme.textSecondary,
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    {userData.avatar && !avatarMarkedForDelete
                      ? "Delete Photo"
                      : "No photo"}
                  </Text>
                </TouchableOpacity>
              </View>
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
              disabled={saving || imageUploading}
            >
              {saving ? (
                <ActivityIndicator size="small" color={theme.accent} />
              ) : (
                <Ionicons name="save" size={22} color={theme.accent} />
              )}
            </TouchableOpacity>
          </View>

          {/* Profile Inputs */}

          <ProfileInput
            label="Username"
            value={userData.username}
            onChangeText={(text) => handleChange("username", text)}
            icon="person-outline"
          />

          <ProfileInput
            label="Phone"
            value={userData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            icon="call-outline"
            keyboardType="phone-pad"
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

          {/* Password Section */}

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 15,
                color: theme.text,
              }}
            >
              Change Password
            </Text>

            <ProfileInput
              label="Current Password"
              secureTextEntry
              value={passwordData.currentPassword}
              onChangeText={(text) =>
                handlePasswordChange("currentPassword", text)
              }
              icon="lock-closed-outline"
            />

            <ProfileInput
              label="New Password"
              secureTextEntry
              value={passwordData.newPassword}
              onChangeText={(text) => handlePasswordChange("newPassword", text)}
              icon="key-outline"
            />

            <ProfileInput
              label="Confirm New Password"
              secureTextEntry
              value={passwordData.confirmPassword}
              onChangeText={(text) =>
                handlePasswordChange("confirmPassword", text)
              }
              icon="shield-checkmark-outline"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  avatarWrapper: { alignItems: "center" },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  floatingLabel: {
    fontSize: 11,
    marginBottom: 2,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  topSaveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
