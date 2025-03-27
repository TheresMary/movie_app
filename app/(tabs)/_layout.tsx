import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import Typography from "@/components/Typography";
import LinearGradient from "react-native-linear-gradient";

const TabIcon = ({ focused, icon, text }: any) => {
  if (focused) {
    return (
      <View
        className={`flex-row flex-1 w-full justify-center items-center gap-1 mt-1 min-w-[100px] min-h-[45px] overflow-hidden bg-primary-gradient`}
      >
        <Image source={icon} tintColor="#151312" className="!size-4" />
        <Typography tag="p" className="text-secondary">
          {text}
        </Typography>
      </View>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-1 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="!size-4" />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ 
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      tabBarStyle: {
        backgroundColor: "#0F0D23",
        marginBottom: 36,
        height: 45,
        position: "absolute",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#0F0D23"
      },
     }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} text="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} text="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="call"
        options={{
          title: "Call",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.call} text="Call" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} text="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
