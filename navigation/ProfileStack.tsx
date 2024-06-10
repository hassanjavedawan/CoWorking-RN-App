import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { ProfileStackParamList } from "./types";
import ProfileScreen from "screens/profile/ProfileScreen";
import UserProfile from "screens/profile/UserProfile";

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
});

export default ProfileStack;
