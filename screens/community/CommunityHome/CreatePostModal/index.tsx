import React, {memo} from 'react';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';
import {globalStyle} from 'styles/globalStyle';
import Text from 'components/Text';
import Container from 'components/Container';
import {CommunityParamList} from 'navigation/types';
import MenuItem from 'components/MenuItem';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

const CreatePostModal = memo(() => {
  const {t} = useTranslation('community');
  const {goBack, navigate} =
    useNavigation<NavigationProp<CommunityParamList>>();
  const {height, width, top, bottom} = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container
      style={[
        styles.container,
        {
          marginTop: (top + 75) * (width / 375),
        },
      ]}>
      <TouchableOpacity
        onPress={goBack}
        style={{
          top: -224 * (width / 375),
          position: 'absolute',
          height: 224 * (width / 375),
          width: width,
        }}
      />
      <Button
        status="warning"
        onPress={goBack}
        style={[styles.close, {bottom: bottom + 90}]}
        accessoryRight={<Icon pack="assets" name="close" />}
      />
      <Text category="h4" marginBottom={40}>
        Create a Post for
      </Text>
      <MenuItem
        icon="project"
        title={t('hireProject')}
        color={theme['color-main-100']}
        onPress={() => navigate('WritePost', {title: 'Hire for a Project'})}
      />
      <MenuItem
        icon="comment"
        title={t('getAAdvice')}
        color={theme['color-primary-100']}
        onPress={() => navigate('WritePost', {title: 'Get a Advice'})}
      />
      <MenuItem
        title={t('forSale')}
        icon="sale"
        color={theme['color-orange-100']}
        onPress={() => navigate('WritePost', {title: 'For Sale'})}
      />
      <MenuItem
        title={t('justWrite')}
        icon="pencil"
        color={theme['color-malachite-100']}
        onPress={() => navigate('WritePost', {title: ''})}
      />
    </Container>
  );
});

export default CreatePostModal;

const themedStyles = StyleService.create({
  container: {
    ...globalStyle.topBorder24,
    paddingHorizontal: 32,
  },
  close: {
    position: 'absolute',
    right: 24,
    height: 48,
    width: 48,
  },
});
