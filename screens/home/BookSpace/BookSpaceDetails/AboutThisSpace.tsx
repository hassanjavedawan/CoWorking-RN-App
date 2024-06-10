import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {StyleService, useStyleSheet, Icon, Layout} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import MapView, {Region, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomPin from 'screens/home/SpaceNearest/NearestMapView/CustomPin';
import ReadMore from 'components/ReadMore';
import {useTranslation} from 'react-i18next';

interface Props {
  state: Region;
  phoneNumber: string;
  linking: string;
  email: string;
  location: string;
}

const AboutThisSpace = ({
  state,
  linking,
  location,
  email,
  phoneNumber,
}: Props) => {
  const {t} = useTranslation('spaceDetails');
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  let data = [
    {id: 'phoneNumber', title: phoneNumber, icon: 'phone'},
    {id: 'email', title: email, icon: 'inboxActive'},
    {id: 'linking', title: linking, icon: 'website'},
    {
      id: 'location',
      title: location,
      icon: 'pinMap',
    },
  ];
  return (
    <View style={styles.container}>
      <Text category="h6" marginBottom={16}>
        {t('aboutThisSpace')}
      </Text>
      <ReadMore
        children="Join NYC’s most engaged community of designers, developers, social change agents, artists, thought-leaders and entrepreneurs that have converged to share ideas,"
        more={t('showMore').toString()}
        numberOfLines={3}
        style={styles.readMore}
      />
      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              globalStyle.flexDirection,
              globalStyle.itemsCenter,
              {
                marginBottom: 20,
                marginRight: 60,
              },
            ]}>
            <Icon pack="assets" name={item.icon} style={styles.icon} />
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                lineHeight={item.id === 'location' ? 24 : 16}
                status={item.id === 'location' ? 'basic' : 'main'}
                category="h8-p">
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <MapView
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        provider={PROVIDER_GOOGLE}
        initialRegion={state}
        style={[
          styles.mapView,
          {
            width: 311 * (width / 375),
            height: 184 * (width / 375),
          },
        ]}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          centerOffset={{x: -18, y: -60}}
          anchor={{x: 0.69, y: 1}}>
          <CustomPin isCurrent={true} />
        </Marker>
      </MapView>
      <Layout style={styles.line} level="6" />
    </View>
  );
};

export default AboutThisSpace;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 32,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  line: {
    height: 1,
    marginVertical: 32,
  },
  mapView: {
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'background-basic-color-1',
    marginTop: 16,
  },
  readMore: {
    marginRight: 32,
    marginBottom: 32,
  },
});
