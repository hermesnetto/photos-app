import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Divider } from 'react-native-elements';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { MARGINS } from '../styles/variables';
import { ProfileHead } from '../components/ProfileHead';
import { ProfilePosts } from '../components/ProfilePosts';
import { useMeQuery } from '../hooks/useMeQuery';
import { ROUTES } from '../types';
import { onSignOut } from '../services/auth';

interface Props {
  navigation: NavigationTabProp;
}

export const Profile: React.FC<Props> = props => {
  const { loading, error, data } = useMeQuery();

  /**
   * @TODO Implement the Empty State components
   */
  if (loading) return null;
  if (error) return null;

  const headerMenus = {
    leftComponent: {
      icon: 'photo',
      color: '#000',
      onPress: () => props.navigation.navigate(ROUTES.PostPicture),
    },
    centerComponent: { text: 'Your profile', style: { color: '#000' } },
    rightComponent: {
      text: 'Sign out',
      color: '#000',
      onPress: () => {
        onSignOut();
        props.navigation.navigate('SignedOut');
      },
    },
  };

  return (
    <View>
      <Header {...headerMenus} containerStyle={styles.header} backgroundColor="#fff" />
      <ProfileHead me={data.me} />
      <Divider style={styles.divider} />
      <ProfilePosts me={data.me} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { marginBottom: MARGINS.default },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: MARGINS.default,
    paddingHorizontal: MARGINS.default,
  },
  divider: {
    marginHorizontal: MARGINS.default,
  },
});
