import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import {PostProps} from 'constants/Types';
import dayjs from 'dayjs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';

interface PostViewProps {
  item: PostProps;
}
const ViewPost = memo(({item}: PostViewProps) => {
  const {
    ability,
    avatar,
    title,
    date,
    description,
    image,
    name,
    like,
    commend,
  } = item;
  const {width} = useLayout();
  const [liked, setLiked] = React.useState(false);
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
      <View style={globalStyle.flexDirection}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('Profile', {screen: 'UserProfile'})}>
          <Avatar
            source={avatar}
            size="small"
            /* @ts-ignore */
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={globalStyle.flexOne}>
          <Text category="h7" marginBottom={2}>
            {name}
          </Text>
          <View style={[globalStyle.flexSpaceBetween]}>
            <Text category="h8-p" lineHeight={16} status="body">
              {ability}
            </Text>
            <Text category="h9-s" lineHeight={16} status="body">
              {dayjs(date).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </View>

      {image ? (
        <Image
          source={image}
          style={{
            width: 279 * (width / 375),
            height: 160 * (width / 375),
            borderRadius: 16,
            marginTop: 16,
          }}
        />
      ) : null}
      <Text
        uppercase
        category="h9"
        marginTop={16}
        marginBottom={8}
        status="body"
        children={title}
      />
      <Text category="h8-p" marginBottom={16}>
        {description}
      </Text>
      <View style={globalStyle.flexDirection}>
        <TouchableOpacity style={styles.like} onPress={() => setLiked(!liked)}>
          <Icon
            pack="assets"
            name="likeActive"
            style={[
              styles.icon,
              {
                tintColor: liked
                  ? theme['text-neon-color']
                  : theme['text-body-color'],
              },
            ]}
          />
          <Text uppercase status="body" category="h9-s">
            {like >= 1000 ? `${like / 1000}k` : like}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyle.flexDirection]}>
          <Icon pack="assets" name="commend" style={styles.icon} />
          <Text uppercase status="body" category="h9-s">
            {commend >= 1000 ? `${commend / 1000}k` : commend}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOption}>
          <Icon pack="assets" name="option" style={styles.iconOption} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
});

export default ViewPost;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  like: {
    flexDirection: 'row',
    marginRight: 28,
  },
  icon: {
    width: 16,
    height: 16,
    marginTop: -2,
    marginRight: 4,
  },
  btnOption: {
    position: 'absolute',
    right: 16,
    bottom: 0,
  },
  iconOption: {
    width: 16,
    height: 16,
    tintColor: 'text-body-color',
  },
});
