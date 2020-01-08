import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { PostItem } from './PostItem';
import { Post } from '../types';

interface PostsResult {
  posts: Post[];
}

export const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      user {
        id
        name
        email
      }
      medias {
        id
        source
      }
    }
  }
`;

interface Props {
  navigation: NavigationTabProp;
}

export const FeedPosts: React.FC<Props> = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery<PostsResult>(POSTS_QUERY);

  useEffect(() => {
    navigation.addListener('willFocus', () => {
      refetch();
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
        {data.posts.map((post: Post) => (
          <PostItem {...post} key={`post_${post.id}`} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
