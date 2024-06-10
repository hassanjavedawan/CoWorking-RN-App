import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Container from 'components/Container';
import dayjs from 'utils/dayjs';
import NavigationAction from 'components/NavigationAction';
import CalendarComponent from 'components/CalendarComponent';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Notification_Types_Enum, Time_Types_Enum} from 'constants/Types';
import EventCalendar from './EventsCalendar';
import {Images} from 'assets/images';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from 'navigation/types';

const CalendarScreen = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [maxHeight, setMaxHeight] = React.useState(0);
  const heightAnimated = useSharedValue(0);
  const firstGetHeight = React.useRef(false);
  const currentTime = 9.25;
  const {navigate} = useNavigation<NavigationProp<HomeStackParamList>>();

  React.useEffect(() => {
    if (maxHeight > 0 && !firstGetHeight.current) {
      firstGetHeight.current = true;
      heightAnimated.value = withTiming((maxHeight - 40) / 3, {
        duration: 300,
        easing: Easing.linear,
      });
    }
  }, [maxHeight]);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: {startY: number}) => {
      ctx.startY = heightAnimated.value;
    },
    onActive: (event, ctx: {startY: number}) => {
      let transYValue = (maxHeight - 40) / 3.5;
      if (ctx.startY + event.translationY < transYValue) {
        heightAnimated.value = transYValue;
      }
      if (
        ctx.startY + event.translationY >= transYValue &&
        ctx.startY + event.translationY < maxHeight - 40
      ) {
        heightAnimated.value = ctx.startY + event.translationY;
      }
      if (ctx.startY + event.translationY >= maxHeight - 40) {
        heightAnimated.value = maxHeight - 40;
      }
    },
    onEnd: (event, ctx: {startY: number}) => {
      if (event.velocityY >= 0) {
        heightAnimated.value = withTiming(maxHeight - 0, {
          duration: 200,
          easing: Easing.linear,
        });
      } else {
        heightAnimated.value = withTiming((maxHeight - 0) / 3, {
          duration: 200,
          easing: Easing.linear,
        });
      }
    },
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: theme['background-basic-color-2'],
      transform: [
        {
          translateY: heightAnimated.value,
        },
      ],
    };
  });
  const handleSearch = React.useCallback(() => {
    navigate('CalendarSearch');
  }, []);

  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        style={{paddingTop: top + 8}}
        accessoryRight={
          <NavigationAction icon="search" onPress={handleSearch} />
        }
        accessoryLeft={<NavigationAction status="primary" />}
        title={
          <Text category="h8-p" uppercase marginTop={top}>
            {dayjs().format('MMM YYYY')}
          </Text>
        }
      />
      <View
        style={{
          position: 'absolute',
          top: top + 52,
        }}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          if (height && maxHeight === 0) {
            setMaxHeight(height - (top + 52));
          }
        }}>
        <CalendarComponent />
      </View>
      <Animated.View style={animationStyle}>
        <PanGestureHandler onGestureEvent={gestureHandler} >
          <Animated.View style={[styles.content]}>
            <View style={styles.animatedView}>
              <TouchableOpacity
                style={StyleSheet.absoluteFillObject}
                activeOpacity={0.54}>
                <View style={styles.buttonSwipe} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
        <EventCalendar data={data} currentTime={currentTime} />
      </Animated.View>
    </Container>
  );
});

export default CalendarScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  buttonSwipe: {
    width: 40,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    backgroundColor: 'text-platinum-color',
    bottom: 16,
    alignSelf: 'center',
  },

  textDate: {
    position: 'absolute',
    top: 70,
    left: 24,
  },
  animatedView: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    zIndex: 10,
  },
  content: {
    zIndex: 10,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
const data = [
  {
    id: 0,
    timeStart: 9,
    typeStart: Time_Types_Enum.am,
    timeEnd: 10.5,
    typeEnd: Time_Types_Enum.pm,
    title: 'Online Meeting with Dev Team',
    type: Notification_Types_Enum.meeting,
    date: 1636102800000,
    location: '28 Liberty St f6, NY 10005',
    building: 'Serendipity Labs New York',
    room: 'Room 6A, 2nd floor, 520 Boardway',
    personInEvent: [
      {
        id: 0,
        name: 'Maria Illescas',
        avatar: Images.avatar6,
      },
      {
        id: 1,
        name: 'Luvleen Lawrence',
        avatar: Images.avatar5,
      },
      {
        id: 2,
        name: 'Balveer Bhadiar',
        avatar: Images.avatar3,
      },
    ],
  },
  {
    id: 1,
    timeStart: 14,
    typeStart: Time_Types_Enum.am,
    timeEnd: 16,
    typeEnd: Time_Types_Enum.pm,
    title: 'How to become UX Designer',
    type: Notification_Types_Enum.event,
    date: 1636120800000,
    location: '447 Broadway 2nd floor, NY, 10013',
    building: 'The Farm Soho',
    room: 'Room 6A, 2nd floor, 447 Boardway',
    price: '$25',
  },
];
