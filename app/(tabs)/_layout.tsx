import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
  return (
    <ImageBackground
      source={focused ? images.highlight : null}
      className="flex flex-row justify-center items-center w-full flex-1 min-h-14 min-w-[112px] rounded-full overflow-hidden"
      resizeMode="contain"
    >
      <Image
        source={icon}
        style={{ tintColor: focused ? "#151312" : "#fff" }}
        className="size-5"
        resizeMode="contain"
      />
      {focused && (
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      )}
    </ImageBackground>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderTopWidth: 0,
          height: 48,
          paddingVertical: 0,
          paddingHorizontal: 20,
          borderRadius: 50,
          marginBottom: 48,
          marginHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.save} title="Saved" />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
