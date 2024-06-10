import React, { memo } from "react";
import { CommunityParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import AddSkillPost from "screens/community/CommunityHome/CreatePost/AddSkillPost";
import WritePost from "screens/community/CommunityHome/CreatePost/WritePost";
import PreviewPost from "screens/community/CommunityHome/CreatePost/PreviewPost";
import PostDetails from "screens/community/CommunityHome/PostDetails";

const Stack = createStackNavigator<CommunityParamList>();
const CommunityNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AddSkillPost"
    >
      <Stack.Screen name="AddSkillPost" component={AddSkillPost} />
      <Stack.Screen name="WritePost" component={WritePost} />
      <Stack.Screen name="PreviewPost" component={PreviewPost} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
});

export default CommunityNavigator;
