import React, {memo} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import Container from 'components/Container';
import {Data_Messenger} from 'constants/Data';
import NavigationAction from 'components/NavigationAction';
import {RefreshControl} from 'react-native-web-refresh-control';
import keyExtractor from 'utils/keyExtractor';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';
import {useTranslation} from 'react-i18next';

const MessengerHome = memo(() => {
  const {t} = useTranslation('common');
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(Data_Messenger);
  const renderItem = React.useCallback(({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => navigate('ChatDetails', {user: item})}>
        <Layout
          style={[
            styles.dot,
            {
              backgroundColor: item.unread
                ? theme['color-neon-100']
                : theme['background-basic-color-2'],
            },
          ]}
        />
        <Avatar
          source={item.avatar}
          size={'small'}
          resizeMode="contain"
          /* @ts-ignore */
          style={styles.avatar}
        />
        <View>
          <Text marginTop={4} status={item.unread ? 'basic' : 'body'}>
            {item.name}
          </Text>
          <Text
            style={{maxWidth: 200 * (width / 375)}}
            numberOfLines={1}
            category="h8-p"
            status={'body'}
            marginTop={2}>
            {item.mess}
          </Text>
        </View>
        <Text
          category="h9-s"
          status="body"
          style={{position: 'absolute', bottom: 0, right: 0}}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <Layout
        style={[
          globalStyle.padH32,
          globalStyle.center,
          globalStyle.flexSpaceBetween,
          styles.topNav,
        ]}>
        <Text category="h4">{t('mess')}</Text>
        <NavigationAction icon="search" />
      </Layout>
      <FlatList
        data={data}
        style={[
          globalStyle.padV32,
          {backgroundColor: theme['background-basic-color-2']},
        ]}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
    </Container>
  );
});

export default MessengerHome;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginRight: 24,
  },
  dot: {
    backgroundColor: 'text-neon-color',
    height: 8,
    width: 8,
    borderRadius: 99,
    marginRight: 12,
  },
  content: {
    paddingRight: 32,
    paddingLeft: 12,
  },
});
