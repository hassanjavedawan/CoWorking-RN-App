import React, {memo} from 'react';
import {View, Image, TouchableOpacity, Platform} from 'react-native';
import {StyleService, useStyleSheet, Layout} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {Images} from 'assets/images';
import NavigationAction from 'components/NavigationAction';
import Stick from 'components/Stick';
import {isEmpty} from 'lodash';
import {Data_MeetingUpcoming, Data_WorkspaceNear} from 'constants/Data';
import {RefreshControl} from 'react-native-web-refresh-control';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';
import Upcoming from './Upcoming';
import Workspace from './Workspace';
import useModal from 'hooks/useModal';
import QuickAccess from './QuickAccess';
import {useTranslation} from 'react-i18next';

const HomeApp = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const [dataWorkSpace, setDataWorkSpace] = React.useState(Data_WorkspaceNear);
  const [dataUpcoming, setDataUpcoming] = React.useState(Data_MeetingUpcoming);
  const {modalRef, show, hide} = useModal();
  const {t} = useTranslation('home');
  const addWorkSpace = React.useCallback(() => {
    navigate('HomeNavigator', {screen: 'AddWorkSpace'});
  }, []);
  const handleCalendar = React.useCallback(() => {
    navigate('HomeNavigator', {screen: 'CalendarScreen'});
  }, []);
  const handleNearest = React.useCallback(() => {
    navigate('HomeNavigator', {screen: 'SpaceNearest'});
  }, []);
  const handleBookSpace = React.useCallback(() => {
    navigate('BookSpaceNavigator', {screen: 'BookSpace'});
  }, []);
  const handleEvent = React.useCallback(() => {
    navigate('EventNavigator', {screen: 'PublicEvent'});
  }, []);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <Layout>
        <Layout>
          <Image
            source={Images.bgHome}
            resizeMode={'cover'}
            style={[{minWidth: width, height: 136 * (height / 812)}]}
          />
          <View style={[globalStyle.absolute, {top: 40, left: 16}]}>
            <Text category="h7" status="neon">

              NEW YORK
            </Text>
            <View style={[globalStyle.flexDirection]}>
              <Text category="h3" status="white" children="57" />
              <Text
                category="h7"
                status="white"
                marginTop={-2}
                marginHorizontal={1}
                children="o"
              />
              <Text category="h5" status="white" marginTop={2} children="F" />
            </View>
          </View>
        </Layout>
        <Layout style={[globalStyle.flexSpaceBetween, styles.top]}>
          <TouchableOpacity style={globalStyle.center} onPress={handleNearest}>
            <NavigationAction
              icon="nearest"
              status="green"
              marginTop={8}
              disabled
            />
            <Text marginTop={16} category="h9-s" center>
              {t('spaceNearest')}
            </Text>
          </TouchableOpacity>
          <Stick straight />
          <TouchableOpacity
            style={globalStyle.center}
            onPress={handleBookSpace}>
            <NavigationAction
              icon="eventDate"
              status="purple"
              marginTop={8}
              disabled
            />
            <Text marginTop={16} category="h9-s" center>
              {t('bookSpaces')}
            </Text>
          </TouchableOpacity>
          <Stick straight />
          <TouchableOpacity style={globalStyle.center} onPress={handleEvent}>
            <NavigationAction
              icon="event"
              status="warning"
              marginTop={8}
              disabled
            />
            <Text marginTop={16} category="h9-s" center>
              {t('publicEvents')}
            </Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
    );
  }, []);

  const ListEmptyWorkSpace = React.useCallback(() => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={addWorkSpace}>
        <Layout
          style={[
            globalStyle.marV32,
            globalStyle.border16,
            globalStyle.center,
            globalStyle.padV24,
            globalStyle.marH32,
          ]}>
          <Image source={Images.addPlace} />
          <Text category="h8" marginTop={16} marginBottom={8}>
            {t('titleEmptyWorkspace')}
          </Text>
          <Text category="h9-s" status="body">
            {t('descriptionEmptyWorkspace')}
          </Text>
        </Layout>
      </TouchableOpacity>
    );
  }, []);

  const ListEmptyUpcoming = React.useCallback(() => {
    return (
      <View style={globalStyle.marH32}>
        <Text category="h6" marginVertical={16}>
          {t('titleUpcoming')}
        </Text>
        <Layout
          style={[
            globalStyle.border16,
            globalStyle.center,
            globalStyle.padV32,
          ]}>
          <Image source={Images.calendar} />
          <Text category="h9-s" status="body" marginTop={24}>
            {t('descriptionEmptyUpcoming')}
          </Text>
        </Layout>
      </View>
    );
  }, []);
  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <ListHeaderComponent />
      <Content
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}>
        {isEmpty(dataWorkSpace) ? (
          <ListEmptyWorkSpace />
        ) : (
          <Workspace data={dataWorkSpace} pressAddWorkSpace={show} />
        )}
        {isEmpty(dataUpcoming) ? (
          <ListEmptyUpcoming />
        ) : (
          <Upcoming data={dataUpcoming} pressCalendar={handleCalendar} />
        )}
      </Content>
      <QuickAccess
        title={t('quickAccess')}
        description={t('descriptionQuickAccess')}
        ref={modalRef}
        data={dataWorkSpace}
        onSave={hide}
      />
    </Container>
  );
});

export default HomeApp;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },

  top: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  content: {
    paddingBottom: 120,
  },
  workspaceItem: {
    paddingHorizontal: 12,
    borderRadius: 16,
    ...globalStyle.center,
    marginRight: 24,
    marginTop: 32,
  },
  img: {
    width: 40,
    height: 40,
  },
});
