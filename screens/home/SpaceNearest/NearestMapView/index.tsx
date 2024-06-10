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
import CustomPin from './CustomPin';
import NavigationAction from 'components/NavigationAction';
import {Data_Space} from 'constants/Data';
import ListLab from './ListLab';
import {globalStyle} from 'styles/globalStyle';
import {Images} from 'assets/images';
import Carousel from 'react-native-snap-carousel';
import BookLab from 'components/BookLab';

const NearestMapView = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const itemWidth = width - 80;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0555,
    longitudeDelta: 0.0555,
  };

  const [state, setState] = React.useState(initialRegion);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const refMap = React.useRef<MapView | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      refMap?.current?.animateToRegion({
        ...initialRegion,
        latitude: Data_Space[0].mapLocation.latitude,
        longitude: Data_Space[0].mapLocation.longitude,

      });
    }, 1000);
  }, []);

  const renderItem = React.useCallback(({item}) => {
    return <BookLab item={item} />;
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNav, {top: top + 8}]}
        appearance="control"
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="filter" />}
      />
      <MapView
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onUserLocationChange={event => {
          // console.log(event);
        }}
        style={[styles.mapView]}>

        {Data_Space.map((item, i) => {
          return (
            <Marker
              key={i}
              style={i === currentIndex ? styles.pinChoose : styles.pin}
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
          data={Data_Space}
          sliderWidth={width}
          itemWidth={itemWidth}
          loop
          inactiveSlideShift={1}
          renderItem={renderItem}
          inactiveSlideScale={0.82}
          inactiveSlideOpacity={1}
          scrollEventThrottle={16}
          onSnapToItem={index => {
            setCurrentIndex(index),
              refMap?.current?.animateToRegion({
                ...initialRegion,
                latitude: Data_Space[index].mapLocation.latitude,
                longitude: Data_Space[index].mapLocation.longitude,
              });

          }}
        />
      </View>
    </Container>
  );
});

export default NearestMapView;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 11,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pin: {
    width: 32,
    height: 32,
  },
  pinChoose: {
    width: 112,
    height: 112,
  },
});
