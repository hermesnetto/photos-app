import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar, Image } from 'react-native-elements';

import { Post } from '../types';
import { MARGINS } from '../styles/variables';
import { DEV_URL } from '../constants';

interface Props extends Post {}

/**
 * @TODOS Show all images in a carousel
 */
export const PostItem: React.FC<Props> = ({ id, title, medias, user }) => {
  const imageUri = medias[0].source.includes('uploads/')
    ? `${DEV_URL}/${medias[0].source}`
    : medias[0].source;

  return (
    <View style={styles.container} key={`post_${id}`}>
      <View style={styles.header}>
        <Avatar
          rounded
          size={40}
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={styles.headerUserAvatar}
        />
        <Text style={styles.headerUserName}>{user.name}</Text>
      </View>
      <Image
        style={styles.media}
        source={{ uri: imageUri }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.contentBox}>
        <View style={styles.title}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGINS.default,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: MARGINS.small,
    paddingHorizontal: MARGINS.default,
    alignItems: 'center',
  },
  headerUserAvatar: {
    marginRight: MARGINS.small,
  },
  headerUserName: {
    fontWeight: 'bold',
  },
  contentBox: {
    padding: MARGINS.default,
  },
  title: {
    flexDirection: 'row',
  },
  userName: {
    fontWeight: 'bold',
    paddingRight: MARGINS.extraSmall,
  },
  media: {
    width: '100%',
    height: 400,
  },
});
