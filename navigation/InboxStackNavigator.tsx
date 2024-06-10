import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import MessengerHome from "screens/messenger/MessengerHome";
import { InboxNotificationStackParamList } from "./types";

const Stack = createStackNavigator<InboxNotificationStackParamList>();

const InboxNotificationStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"MessengerHome"}
    >
      <Stack.Screen name="MessengerHome" component={MessengerHome} />
    </Stack.Navigator>
  );
});

export default InboxNotificationStackNavigator;
