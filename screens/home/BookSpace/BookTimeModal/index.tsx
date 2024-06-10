import React, {memo} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Button,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import TimeLineItem from './TimeLineItem';
import {convertStartTime} from './convertStartTime';

type CtxProps = {
  translateY: number;
};
type ContextHeight = {
  heightView: number;
};

const BookTimeModal = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const translateY = useSharedValue(8 * 80);
  const heightAnimated = useSharedValue(40);
  const refScrollView = React.useRef<ScrollView>(null);
  const [heightTime, setHeightTime] = React.useState(0);
  const [positionTime, setPositionTime] = React.useState(0);

  React.useEffect(() => {
    if (translateY.value) {
      refScrollView.current?.scrollTo({
        y: translateY.value - 20,
        animated: true,
      });
    }
  }, [translateY]);
  React.useEffect(() => {}, []);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    CtxProps
  >({
    onStart: (_, ctx) => {
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      let y = event.translationY + ctx.translateY;
      translateY.value = y;
    },
    onEnd: () => {},
  });
  const gestureHandlerHight = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextHeight
  >({
    onStart: (_, ctx) => {
      ctx.heightView = heightAnimated.value;
    },
    onActive: (event, ctx) => {
      heightAnimated.value = event.translationY + ctx.heightView;
    },
    onEnd: (event, ctx) => {},
  });
  const animationHeight = useAnimatedStyle(() => {
    return {
      height: heightAnimated.value,
      width: 84,
      alignSelf: 'center',
      marginTop: 40,
    };
  });
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      width: 287 * (width / 375),
    };
  });
  React.useEffect(() => {}, []);
  return (
    <Container
      style={[
        styles.container,
        {
          marginTop: (top + 32) * (width / 375),
        },
      ]}
      useSafeArea={false}>
      <NavigationAction marginLeft={32} marginBottom={32} marginTop={24} />
      <Text marginLeft={32} marginBottom={48} category="h4">
        {convertStartTime(translateY.value, heightTime)}
      </Text>
      <ScrollView
        contentContainerStyle={styles.content}
        ref={refScrollView}
        showsVerticalScrollIndicator={false}>
        <PanGestureHandler
          onGestureEvent={gestureHandler}
          onHandlerStateChange={event => {
            setPositionTime(event.nativeEvent.y);
          }}>
          <Animated.View
            style={[animationStyle, styles.timeView]}
            onLayout={e => {
              setHeightTime(e.nativeEvent.layout.height);
            }}>
            <PanGestureHandler onGestureEvent={gestureHandlerHight}>
              <Animated.View style={animationHeight}>
                <TouchableOpacity activeOpacity={0.7} style={styles.drag}>
                  <Icon name="moreNormal" pack="assets" style={styles.icon} />
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.timeLine}>
          {Data_DayTime.map((item, i) => {
            return <TimeLineItem item={item} key={i} />;
          })}
        </View>
      </ScrollView>
      <Layout style={[styles.bottom, {paddingBottom: bottom + 4}]} level="1">
        <Button children="Done" size="giant" status="basic" />
      </Layout>
    </Container>
  );
});

export default BookTimeModal;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    ...globalStyle.topBorder24,
  },
  content: {
    height: 80 * 24,
    marginTop: 40,
    marginBottom: 120,
  },
  timeStart: {
    position: 'absolute',
    top: -12,
    left: 0,
    zIndex: -10,
  },
  timeView: {
    backgroundColor: 'color-malachite-100',
    alignSelf: 'flex-end',
  },
  drag: {
    backgroundColor: 'text-white-color',
    height: 24,
    width: 24,
    ...globalStyle.center,
    borderRadius: 99,
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: 'color-malachite-100',
    zIndex: 10,
    position: 'absolute',
    bottom: -12,
  },
  icon: {
    height: 12,
    width: 12,
  },
  timeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -10,
  },
  bottom: {
    paddingBottom: 4,
    paddingTop: 16,
    paddingHorizontal: 32,
    ...globalStyle.topBorder24,
    ...globalStyle.shadowFade,
  },
});
const Data_DayTime = [
  {id: 0, time: '01:00', dayTime: 'AM'},
  {id: 1, time: '02:00', dayTime: 'AM'},
  {id: 2, time: '03:00', dayTime: 'AM'},
  {id: 3, time: '04:00', dayTime: 'AM'},
  {id: 4, time: '05:00', dayTime: 'AM'},
  {id: 5, time: '06:00', dayTime: 'AM'},
  {id: 6, time: '07:00', dayTime: 'AM'},
  {id: 7, time: '08:00', dayTime: 'AM'},
  {id: 8, time: '09:00', dayTime: 'AM'},
  {id: 9, time: '10:00', dayTime: 'AM'},
  {id: 10, time: '11:00', dayTime: 'AM'},
  {id: 11, time: '12:00', dayTime: 'AM'},
  {id: 12, time: '01:00', dayTime: 'PM'},
  {id: 13, time: '02:00', dayTime: 'PM'},
  {id: 14, time: '03:00', dayTime: 'PM'},
  {id: 15, time: '04:00', dayTime: 'PM'},
  {id: 16, time: '05:00', dayTime: 'PM'},
  {id: 17, time: '06:00', dayTime: 'PM'},
  {id: 18, time: '07:00', dayTime: 'PM'},
  {id: 19, time: '08:00', dayTime: 'PM'},
  {id: 20, time: '09:00', dayTime: 'PM'},
  {id: 21, time: '10:00', dayTime: 'PM'},
  {id: 22, time: '11:00', dayTime: 'PM'},
  {id: 23, time: '12:00', dayTime: 'AM'},
];
