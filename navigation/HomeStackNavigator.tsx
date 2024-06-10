import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { HomeStackParamList } from "./types";
import AddWorkSpace from "screens/home/AddWorkSpace";
import CalendarScreen from "screens/home/CalendarScreen";
import CalendarDetails from "screens/home/CalendarScreen/CalendarDetails";
import EventDetails from "screens/home/CalendarScreen/EventDetails";
import CalendarSearch from "screens/home/CalendarScreen/CalendarSearch";
import SpaceNearest from "screens/home/SpaceNearest";
import FilterNear from "screens/home/SpaceNearest/FilterNear";
import NearestMapView from "screens/home/SpaceNearest/NearestMapView";


const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'AddWorkSpace'}>
      <Stack.Screen name="AddWorkSpace" component={AddWorkSpace} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CalendarDetails" component={CalendarDetails} />
      <Stack.Screen name="CalendarSearch" component={CalendarSearch} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="SpaceNearest" component={SpaceNearest} />
      <Stack.Screen name="Filter" component={FilterNear} />
      <Stack.Screen name="NearestMapView" component={NearestMapView} />
    </Stack.Navigator>
  );
});

export default HomeNavigator;
