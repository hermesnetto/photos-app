import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { MARGINS } from '../styles/variables';
import { PostPicture as Picture } from '../components/PostPicture';
import { useMeQuery } from '../hooks/useMeQuery';
import { ROUTES } from '../types';

interface Props {
  navigation: NavigationTabProp;
}

export const PostPicture: React.FC<Props> = props => {
  const { loading, data } = useMeQuery();

  if (loading) return <View />;

  const handleCloseCamera = (): void => {
    props.navigation.navigate(ROUTES.Feed);
  };

  return <Picture me={data.me} closeCamera={handleCloseCamera} />;
};

const styles = StyleSheet.create({
  container: {
    /** MAGIC NUMBER : Must find a better way to find out the TABS and action bottom buttons height */
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
