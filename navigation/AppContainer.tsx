import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import IntroNavigator from './IntroNavigator';
import SuccessScr from 'screens/SuccessScr';
import AccountNavigator from './AccountNavigator';
import {LogBox} from 'react-native';
import MainNavigator from './MainNavigator';
import HomeNavigator from './HomeStackNavigator';
import BookSpaceNavigator from './BookSpaceNavigator';
import EventNavigator from './EventNavigator';
import CreatePostModal from 'screens/community/CommunityHome/CreatePostModal';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import CommunityNavigator from './CommunityNavigator';
import WritePost from 'screens/community/CommunityHome/CreatePost/WritePost';
import ChatScreen from 'screens/messenger/ChatScreen';
import ProfileStack from './ProfileStack';
import BookTimeModal from 'screens/home/BookSpace/BookTimeModal';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Stack = createStackNavigator<RootStackParamList>();
const AppContainer = () => {
  const {width, height, top, bottom} = useLayout();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroNavigator} />
        <Stack.Screen name="Account" component={AccountNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        <Stack.Screen name="SuccessScr" component={SuccessScr} />
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="ChatDetails" component={ChatScreen} />
        <Stack.Screen
          name="CommunityNavigator"
          component={CommunityNavigator}
        />
        <Stack.Screen
          name="BookSpaceNavigator"
          component={BookSpaceNavigator}
        />
        <Stack.Screen name="EventNavigator" component={EventNavigator} />
        <Stack.Group
          screenOptions={{
            animationEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
          }}>
          <Stack.Screen
            name="CreatePostModal"
            component={CreatePostModal}
            options={{
              presentation: 'transparentModal',
              animationEnabled: true,
              cardOverlayEnabled: true,
              cardStyle: [
                globalStyle.absolute,
                {
                  width: width,
                },
              ],
            }}
          />
          <Stack.Screen
            name="BookTimeModal"
            component={BookTimeModal}
            options={{
              presentation: 'transparentModal',
              animationEnabled: true,
              cardOverlayEnabled: true,
              cardStyle: [
                globalStyle.absolute,
                {
                  width: width,
                },
              ],
            }}
          />
          <Stack.Screen name="WritePost" component={WritePost} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
