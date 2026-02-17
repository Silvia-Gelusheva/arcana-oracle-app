import { Text, TouchableOpacity, View } from "react-native";

export default function SteampunkHeader({ navigation, back, options }) {
  const title = options.title || "Screen";

  return (
    <View
      style={{
        height: 80,
        backgroundColor: "#0b132b",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderColor: "#b87333",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {back && (
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{ color: "#e0c097", fontSize: 20 }}>←</Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: "#e0c097",
            fontSize: 18,
            fontFamily: "Cinzel_600SemiBold",
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
