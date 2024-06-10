import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { AccountStackParamList } from "./types";
import ChangePassword from "screens/account/ChangePassword";
import ForgotPassword from "screens/account/ForgotPassword";
import Auth from "screens/account/Auth";
import BasicInformation from "screens/account/BasicInfomation";
import JobInformation from "screens/account/JobInformation";

const Stack = createStackNavigator<AccountStackParamList>();

const AccountNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Auth"}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="BasicInformation" component={BasicInformation} />
      <Stack.Screen name="JobInformation" component={JobInformation} />
    </Stack.Navigator>
  );
});

export default AccountNavigator;
