import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Image } from 'react-native-elements';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { Post, User } from '../types';
import { MARGINS } from '../styles/variables';

interface PostsByUserVariables {
  userId: number;
}

interface PostsByUserResult {
  postsByUser: Post[];
}

const POSTS_BY_USER_QUERY = gql`
  query PostsByUser($userId: Int!) {
    postsByUser(userId: $userId) {
      id
      title
      medias {
        id
        source
      }
    }
  }
`;

interface Props {
  me: User;
  navigation: NavigationTabProp;
}

let userId: number;
const screenWidth: number = Math.round(Dimensions.get('window').width);

export const ProfilePosts: React.FC<Props> = ({ me: { id }, navigation }) => {
  userId = id;

  const { loading, error, data, refetch } = useQuery<PostsByUserResult, PostsByUserVariables>(
    POSTS_BY_USER_QUERY,
    {
      variables: {
        userId: id,
      },
    }
  );

  useEffect(() => {
    navigation.addListener('willFocus', () => {
      refetch({ userId });
    });
  }, []);

  /**
   * @TODO Implement the Empty State components
   */
  if (loading) return null;
  if (error) return null;

  return (
    <SafeAreaView>
      <ScrollView>
        {!data.postsByUser.length && (
          <View style={styles.noPostsContainer}>
            <Text>User has no photos yet</Text>
          </View>
        )}
        <View style={styles.posts}>
          {data.postsByUser.map(({ id, medias }: Post) => (
            <Image
              key={`user_post_${id}`}
              source={{ uri: medias[0].source }}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const postSize = screenWidth / 3 - 12;

const styles = StyleSheet.create({
  noPostsContainer: {
    paddingVertical: MARGINS.default,
    alignItems: 'center',
  },
  image: {
    width: postSize,
    height: postSize,
    margin: 1,
  },
  posts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
