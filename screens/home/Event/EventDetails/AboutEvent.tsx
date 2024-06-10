import React, {memo} from 'react';
import {View} from 'react-native';
import {StyleService, useStyleSheet, Icon} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import ReadMore from 'components/ReadMore';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import CustomPin from 'screens/home/SpaceNearest/NearestMapView/CustomPin';
import {useTranslation} from 'react-i18next';
import {TouchableHighlight} from 'react-native-gesture-handler';

interface Props {
  description: string;
  phoneNumber?: string;
  email?: string;
  linking?: string;
  location?: string;
  state: Region;
  mapLocation: any;
}

const AboutEvent = memo(
  ({
    description,
    phoneNumber,
    state,
    email,
    linking,
    location,
    mapLocation,
  }: Props) => {
    const {t} = useTranslation('event');
    const {height, width, top, bottom} = useLayout();
    const styles = useStyleSheet(themedStyles);
    return (
      <View style={styles.container}>
        <Text category="h6" marginBottom={16}>
          {t('aboutThisEvent')}
        </Text>
        <ReadMore
          children={description}
          numberOfLines={3}
          more={t('showMore')}
          style={styles.readMore}
        />
        <View style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="time" style={styles.icon} />
          <Text status="main" marginBottom={24}>
            {phoneNumber}
          </Text>
        </View>
        <View style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="inboxActive" style={styles.icon} />
          <Text status="main" marginBottom={24}>
            {email}
          </Text>
        </View>
        <View style={globalStyle.flexDirection}>
          <Icon pack="assets" name="website" style={styles.icon} />
          <Text status="main" marginBottom={24}>
            {linking}
          </Text>
        </View>
        <View style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="pinMap" style={styles.icon} />
          <Text marginTop={-4} category="h8-p" lineHeight={24} marginRight={24}>
            447 Broadway, 2nd Floor, NYC, United States
          </Text>
        </View>
        <View
          style={{
            height: 216 * (height / 812),
            backgroundColor: 'transparent',
            ...globalStyle.fitBottom,
            zIndex: 10,
          }}
        />
        <MapView
          initialRegion={state}
          scrollEnabled={false}
          provider={PROVIDER_GOOGLE}
          style={[
            styles.mapView,
            {
              width: 311 * (width / 375),
              height: 184 * (width / 375),
            },
          ]}>
          <Marker
            coordinate={mapLocation}
            centerOffset={{x: -18, y: -60}}
            anchor={{x: 0.69, y: 1}}>
            <CustomPin isCurrent={true} />
          </Marker>
        </MapView>
      </View>
    );
  },
);

export default AboutEvent;

const themedStyles = StyleService.create({
  container: {},
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
    marginTop: -2,
  },
  readMore: {
    marginBottom: 32,
  },
  mapView: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'background-basic-color-1',
    marginTop: 16,
  },
});
