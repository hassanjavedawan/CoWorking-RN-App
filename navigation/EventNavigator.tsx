import React, { memo } from "react";
import { EventStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import PublicEvent from "screens/home/Event/PublicEvent";
import ChangeLocation from "screens/home/Event/ChangeLocation";
import MapEvent from "screens/home/Event/MapEvent";
import FilterMapEvent from "screens/home/Event/MapEvent/FilterMapEvent";
import EventDetails from "screens/home/Event/EventDetails";
import PaymentTickets from "screens/home/Event/PaymentTickets";

const Stack = createStackNavigator<EventStackParamList>();

const CommunityStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"PublicEvent"}
    >
      <Stack.Screen name="PublicEvent" component={PublicEvent} />
      <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
      <Stack.Screen name="MapEvent" component={MapEvent} />
      <Stack.Screen name="FilterMapEvent" component={FilterMapEvent} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="PaymentTickets" component={PaymentTickets} />
    </Stack.Navigator>
  );
});

export default CommunityStackNavigator;
