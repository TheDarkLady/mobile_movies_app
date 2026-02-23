import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12"; // any default image

const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const loadAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      aspect: [1, 1],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 justify-center items-center  bg-dark-200 gap-4">
      <View className="flex items-center justify-center">
        <View style={{ position: "relative" }}>
          {/* Avatar */}
          <Image
            source={{ uri: avatar || DEFAULT_AVATAR }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
            }}
          />

          {/* Edit Button */}
          <Pressable
            onPress={loadAvatar}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#6C63FF",
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>✏️</Text>
          </Pressable>
        </View>
        <Text className="text-white text-2xl font-bold mt-5">Hi 👋 XYZ</Text>
      </View>
        <View>
          <Text className="text-white text-2xl font-bold mt-5">
            Email : xyz@gmail.com
          </Text>
          <Text className="text-white text-2xl font-bold mt-5">
            Phone : 1234567890
          </Text>
          <Text className="text-white text-2xl font-bold mt-5">
            Member Since : 12/12/2022
          </Text>
          <Text className="text-white text-2xl font-bold mt-5">
            Renewal Date : 12/12/2022
          </Text>
        </View>
          <View>
            <Pressable
              onPress={() => console.log("Logout")}
              className="bg-[#AB8BFF] px-4 py-2 rounded-lg my-5"
            >
              <Text className="text-white font-semibold">Logout</Text>
            </Pressable>
          </View>
    </View>
  );
};

export default Profile;
