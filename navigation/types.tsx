import { RouteProp } from "@react-navigation/native";
import {
  EventProps,
  RoomDetailsProps,
  SuccessScreenType,
  UserInfoProps,
} from "constants/Types";

export type RootStackParamList = {
  Intro: IntroStackParamList;
  HomeNavigator: { screen: keyof HomeStackParamList };
  Main: { screen: keyof MainStackParamList };
  Menu: undefined;
  CommunityNavigator: { screen: keyof CommunityParamList };
  CreatePostModal: undefined;
  BookTimeModal: undefined;
  WritePost: undefined;
  ChatDetails: { user: UserInfoProps };
  BookSpaceNavigator: { screen: keyof BookSpaceStackParamList };
  EventNavigator: { screen: keyof EventStackParamList };
  Profile: { screen: keyof ProfileStackParamList };
  Account: { screen: keyof AccountStackParamList };
  SuccessScr: {
    data: SuccessScreenType;
  };
};
export type IntroStackParamList = {
  OnboardingScreen: undefined;
};
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  UserProfile: undefined;
};

export type InboxNotificationStackParamList = {
  MessengerHome: undefined;
  ChatScreenDetails: undefined;
  Notifications: undefined;
};

export type MainStackParamList = {
  HomeStack: undefined;
  Community: undefined;
  Messenger: undefined;
  Menu: undefined;
  Notifications: undefined;
};
export type CommunityHomeStackParamList = {
  CommunityHome: undefined;
};
export type CommunityParamList = {
  WritePost: { title: string };
  AddSkillPost: undefined;
  PreviewPost: undefined;
  PostDetails: undefined;
};
export type EventStackParamList = {
  PublicEvent: undefined;
  ChangeLocation: undefined;
  MapEvent: undefined;
  FilterMapEvent: undefined;
  PaymentTickets: undefined;
  EventDetails: { data: EventProps };
};
export type BookSpaceStackParamList = {
  BookSpace: undefined;
  BookSpaceResult: undefined;
  BookSpaceDetails: undefined;
  ReviewsDetails: undefined;
  WriteReview: undefined;
  AvailableRoom: undefined;
  RoomDetails: { room: RoomDetailsProps };
  BookDetails: undefined;
  AddCoWorker: undefined;
  PaymentConfirm: undefined;
  SelectCard: { type: "event" | "bookSpace" };
  NewCard: undefined;
};
export type AccountStackParamList = {
  Auth: { initialIndex: number };
  ForgotPassword: undefined;
  ChangePassword: undefined;
  BasicInformation: undefined;
  JobInformation: undefined;
  SelectSkill: undefined;
};
export type HomeStackParamList = {
  AddWorkSpace: undefined;
  CalendarScreen: undefined;
  CalendarSearch: undefined;
  NearestMapView: undefined;
  SpaceNearest: undefined;
  EventDetails: { data: EventProps };
  Filter: undefined;
  CalendarDetails: { data: EventProps };
  EventTicket: { data: EventProps };
};

export type ModalScreenNavigationProp = RouteProp<
  RootStackParamList,
  "SuccessScr"
>;
export type SelectCardNavigationProp = RouteProp<
  BookSpaceStackParamList,
  "SelectCard"
>;
export type ChatDetailsNavigationProp = RouteProp<
  RootStackParamList,
  "ChatDetails"
>;

export type RoomDetailsNavigationProp = RouteProp<
  BookSpaceStackParamList,
  "RoomDetails"
>;
export type WritePostNavigationProp = RouteProp<
  CommunityParamList,
  "WritePost"
>;

export type CalendarDetailsNavigationProps = RouteProp<
  HomeStackParamList,
  "CalendarDetails"
>;

export type EventTicketNavigationProps = RouteProp<
  HomeStackParamList,
  "EventTicket"
>;

export type EventDetailsNavigationProps = RouteProp<
  EventStackParamList,
  "EventDetails"
>;

export type AuthScreenNavigationProps = RouteProp<
  AccountStackParamList,
  "Auth"
>;
