import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { MARGINS } from '../styles/variables';
import { FeedPosts } from '../components/FeedPosts';
import { onSignOut } from '../services/auth';
import { ROUTES } from '../types';

interface Props {
  navigation: NavigationTabProp;
}

export const Feed: React.FC<Props> = props => {
  const headerMenus = {
    leftComponent: {
      icon: 'camera',
      type: 'antdesign',
      color: '#000',
      onPress: () => {
        props.navigation.navigate(ROUTES.PostPicture);
      },
    },
    centerComponent: { text: 'Most recent posts', style: { color: '#000' } },
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
    <View style={styles.container}>
      <Header {...headerMenus} containerStyle={styles.header} backgroundColor="#fff" />
      <FeedPosts {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /** @TODO MAGIC NUMBER : Must find a better way to find out the TABS and action bottom buttons height */
    paddingBottom: 200,
  },
  header: { marginBottom: MARGINS.default },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: MARGINS.default,
    paddingHorizontal: MARGINS.default,
  },
});
