import React, {memo} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService,
} from '@ui-kitten/components';
import {MainStackParamList} from './types';
import MessengerStackNavigator from './InboxStackNavigator';
import Notifications from 'screens/notifications';
import useLayout from 'hooks/useLayout';
import Text from 'components/Text';
import {globalStyle} from 'styles/globalStyle';
import HomeApp from 'screens/home/HomeApp';
import CommunityHomeNavigator from './CommunityHomeNavigator';
import MenuApp from 'screens/menuApp';
import MessengerHome from 'screens/messenger/MessengerHome';

interface ButtonTabProps {
  focused: boolean;
  iconActive: string;
  iconNormal: string;
  numberNotification?: number;
}

const BottomTab = createBottomTabNavigator<MainStackParamList>();

const MainNavigator = memo(() => {
  const theme = useTheme();
  const {width, height, bottom, top} = useLayout();
  const HEIGHT_BOTTOM_TAB = bottom + 66;
  const styles = useStyleSheet(themedStyles);
  const ButtonTab = React.useCallback(
    ({focused, iconActive, iconNormal, numberNotification}: ButtonTabProps) => {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            ...globalStyle.center,
            backgroundColor: focused
              ? theme['text-main-color']
              : theme['color-white-smoke-100'],
          }}>
          {numberNotification ? (
            focused ? null : (
              <View style={styles.notification}>
                <Text center category="h10" status="white" marginTop={1}>
                  {numberNotification}
                </Text>
              </View>
            )
          ) : null}
          <Icon
            pack="assets"
            name={focused ? iconActive : iconNormal}
            style={{
              tintColor: focused
                ? theme['text-white-color']
                : theme['text-body-color'],
            }}
          />
        </View>
      );
    },
    [],
  );
  return (
    <BottomTab.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: HEIGHT_BOTTOM_TAB,
          ...globalStyle.topBorder24,
        },
      }}>
      <BottomTab.Screen
        name="HomeStack"
        component={HomeApp}
        options={{
          tabBarIcon: ({focused}) => (
            <ButtonTab
              focused={focused}
              iconActive="homeActive"
              iconNormal="homeActive"
              numberNotification={undefined}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityHomeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <ButtonTab
              focused={focused}
              iconActive="communityActive"
              iconNormal="communityActive"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Messenger"
        component={MessengerHome}
        options={{
          tabBarIcon: ({color, focused}) => (
            <ButtonTab
              focused={focused}
              iconActive="inboxActive"
              iconNormal="inboxActive"
              numberNotification={2}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color, focused}) => (
            <ButtonTab
              focused={focused}
              iconActive="notificationActive"
              iconNormal="notificationActive"
              numberNotification={4}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuApp}
        options={{
          tabBarIcon: ({color, focused}) => (
            <ButtonTab
              focused={focused}
              iconActive="moreActive"
              iconNormal="moreNormal"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
});
export default MainNavigator;

const themedStyles = StyleService.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  viewButtonTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'background-basic-color-1',
    paddingTop: 16,
    paddingBottom: 10,
  },
  buttonTab: {
    borderRadius: 12,
    backgroundColor: 'blue',
    height: 40,
    width: 40,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  notification: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    zIndex: 10,
    top: -4,
    right: -4,
  },
});
