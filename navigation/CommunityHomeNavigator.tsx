import React, { memo } from "react";
import { CommunityHomeStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import CommunityHome from "screens/community/CommunityHome";

const Stack = createStackNavigator<CommunityHomeStackParamList>();

const CommunityHomeNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"CommunityHome"}
    >
      <Stack.Screen name="CommunityHome" component={CommunityHome} />
    </Stack.Navigator>
  );
});

export default CommunityHomeNavigator;
