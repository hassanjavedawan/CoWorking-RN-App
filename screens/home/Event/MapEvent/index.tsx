import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Container from 'components/Container';
import NavigationAction from 'components/NavigationAction';
import {globalStyle} from 'styles/globalStyle';
import CustomPin from 'screens/home/SpaceNearest/NearestMapView/CustomPin';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {EventStackParamList} from 'navigation/types';
import {Data_Event} from 'constants/Data';
import Carousel from 'react-native-snap-carousel';
import EventMapItem from './EventMapItem';
import {Images} from 'assets/images';

const MapEvent = memo(() => {
  const {goBack, navigate} =
    useNavigation<NavigationProp<EventStackParamList>>();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const itemWidth = width - 80;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
  };

  const [dataEvent, setDataEvent] = React.useState(Data_Event);
  const [state, setState] = React.useState(initialRegion);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const refMap = React.useRef<MapView | null>(null);

  const goFilter = React.useCallback(() => {
    navigate('FilterMapEvent');
  }, []);

  const renderEventMap = React.useCallback(item => {
    return <EventMapItem item={item} />;
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNav, {top: top + 8}]}
        appearance="control"
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="filter" onPress={goFilter} />}
      />
      <MapView
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        initialRegion={state}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onUserLocationChange={event => {
          // console.log(event);
        }}
        style={[styles.mapView, {width: width, height: height}]}>
        {Data_Event.map((item, i) => {
          return (
            <Marker
              key={i}
              image={i === currentIndex ? Images.pinSelect : Images.pinNormal}
              coordinate={item.mapLocation}
            />
          );
        })}
      </MapView>
      <View
        style={[
          globalStyle.fitBottom,
          {bottom: bottom + 8, alignItems: 'flex-end'},
        ]}>
        <NavigationAction
          status="white"
          icon="currentLocation"
          marginRight={32}
          marginBottom={32}
        />
        <Carousel
          layout={'default'}
          data={dataEvent}
          sliderWidth={width}
          itemWidth={311 * (width / 375)}
          contentContainerStyle={styles.contentStyle}
          inactiveSlideShift={1}
          renderItem={renderEventMap}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={1}
          scrollEventThrottle={16}
          onSnapToItem={index => {
            refMap?.current?.animateToRegion({
              ...initialRegion,
              latitude: Data_Event[index].mapLocation.latitude,
              longitude: Data_Event[index].mapLocation.longitude,
            });
            setCurrentIndex(index);
          }}
        />
      </View>
    </Container>
  );
});

export default MapEvent;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentStyle: {
    alignItems: 'center',
  },
  topNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 11,
  },
  pinMap: {
    position: 'absolute',
    right: 24,
  },
});
