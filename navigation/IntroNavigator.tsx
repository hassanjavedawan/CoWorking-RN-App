import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { IntroStackParamList } from "./types";

import OnboardingScreen from "screens/onboarding/Onboarding";

const Stack = createStackNavigator<IntroStackParamList>();

const IntroNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="OnboardingScreen"
    >
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
});

export default IntroNavigator;
