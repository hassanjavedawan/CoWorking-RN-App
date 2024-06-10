import React, { memo } from "react";
import { BookSpaceStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import BookSpace from "screens/home/BookSpace/BookSpace";
import BookSpaceResult from "screens/home/BookSpace/BookSpaceResult";
import BookSpaceDetails from "screens/home/BookSpace/BookSpaceDetails";
import ReviewsDetails from "screens/home/BookSpace/ReviewsDetails";
import WriteReview from "screens/home/BookSpace/WriteReview";
import AvailableRoom from "screens/home/BookSpace/AvailableRoom";
import RoomDetails from "screens/home/BookSpace/AvailableRoom/RoomDetails";
import BookDetails from "screens/home/BookSpace/BookDetails";
import AddCoWorker from "screens/home/BookSpace/BookDetails/AddCoWorker";
import PaymentConfirm from "screens/home/BookSpace/Payment/PaymentConfirm";
import SelectCard from "screens/home/BookSpace/Payment/SelectCard";
import NewCard from "screens/home/BookSpace/Payment/NewCard";

const Stack = createStackNavigator<BookSpaceStackParamList>();

const BookSpaceNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"BookSpace"}
    >
      <Stack.Screen name="BookSpace" component={BookSpace} />
      <Stack.Screen name="BookSpaceResult" component={BookSpaceResult} />
      <Stack.Screen name="BookSpaceDetails" component={BookSpaceDetails} />
      <Stack.Screen name="ReviewsDetails" component={ReviewsDetails} />
      <Stack.Screen name="WriteReview" component={WriteReview} />
      <Stack.Screen name="AvailableRoom" component={AvailableRoom} />
      <Stack.Screen name="RoomDetails" component={RoomDetails} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="AddCoWorker" component={AddCoWorker} />
      <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
      <Stack.Screen name="SelectCard" component={SelectCard} />
      <Stack.Screen name="NewCard" component={NewCard} />
    </Stack.Navigator>
  );
});

export default BookSpaceNavigator;
