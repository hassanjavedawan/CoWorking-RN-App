import {EvaStatus} from '@ui-kitten/components/devsupport';
import * as ImagePicker from 'react-native-image-picker';

import {ImageRequireSource, ImageSourcePropType, ViewStyle} from 'react-native';

export interface ButtonType {
  status?: EvaStatus;
  title: string;
  onPress: () => void;
}
export interface Action {
  title?: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}
export interface NotificationProps {
  title: string;
  type: Notification_Types_Enum;
  id: number;
  description: string;
  avatar: ImageRequireSource;
  time: string;
  unread: boolean;
}
export interface WorkSpaceItemProps {
  id: number;
  title?: string;
  image?: ImageRequireSource;
  logo?: ImageRequireSource;
  isVerified?: boolean;
  rate?: string;
  quantityRate?: number;
  location?: string;
}
export interface InformationProps {
  id: number;
  name: string;
  avatar: ImageRequireSource;
}
export interface RateStatusProps {
  id: number;
  title: string;
  rate: number;
}
export interface RoomDetailsProps {
  id: number;
  image: ImageSourcePropType[];
  seat: number;
  title: string;
  amenities: string[];
  price: string;
  description: string;
}
export interface EventProps {
  id: number;
  timeStart: number;
  typeStart: Time_Types_Enum;
  timeEnd: number;
  typeEnd: Time_Types_Enum;
  date?: number;
  title: string;
  building?: string;
  room?: string;
  personInEvent?: InformationProps[];
  location?: string;
  type?: Notification_Types_Enum;
  price?: string;
  image?: ImageSourcePropType[];
  book?: boolean;
  email?: string;
  phoneNumber?: string;
  linking?: string;
  description?: string;
  mapLocation: {
    latitude?: number;
    longitude?: number;
  };
}
export interface UserInfoProps {
  id: number;
  name: string;
  avatar: ImageRequireSource;
}
export interface PostProps {
  id: number;
  name: string;
  ability: string;
  //timestamp in milliseconds
  date: number;
  like: number;
  commend: number;
  title: string;
  description: string;
  avatar: ImageSourcePropType;
  image?: ImageSourcePropType;
}
export interface BookSpaceProps {
  id: number;
  title: string;
  location?: string;
  rate: string | number;
  image: any;
  quantityRate: number;
  isVerified: boolean;
  howFar: string;
  book?: boolean;
}

export interface SuccessScreenType {
  image?: ImageRequireSource;
  title?: string;
  description?: string;
  children?: ButtonType[] | null;
  buttonsViewStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
}
export enum Category_Card_Types_Enum {
  Master = 'Master Card',
  Visa = 'Visa Master',
  AmericanExpress = 'American Express',
}
export enum EKeyAsyncStorage {
  theme = 'theme',
  intro = 'intro',
}
export enum Notification_Types_Enum {
  responses = 'responses',
  meeting = 'meeting',
  event = 'event',
  commend = 'commend',
}

export enum Time_Types_Enum {
  am = 'AM',
  pm = 'PM',
}
export enum Post_Types_Enum {
  jobHires = 'Job Hires',
  event = 'Event',
}
export enum Animation_Types_Enum {
  SlideTop,
  SlideBottom,
  SlideInRight,
  SlideInLeft,
}
