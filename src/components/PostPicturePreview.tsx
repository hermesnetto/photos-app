import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Picture, PICTURE_VIEWS, User, Post, GqlMutationResult } from '../types';
import { MARGINS } from '../styles/variables';
import { getPictureFormData } from '../utils';
import { uploadPicture } from '../services/http';
import { POSTS_QUERY } from './FeedPosts';

const screenWidth: number = Math.round(Dimensions.get('window').width);

interface Props {
  setView: (view: PICTURE_VIEWS) => void;
  closeCamera: () => void;
  picture: Picture;
  me: User;
}

interface CreatePostVariables {
  title: string;
  user_id: number;
  mediasSource: string[];
}

interface CreatePostResult {
  createPost: GqlMutationResult<Post>;
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $user_id: Int!, $mediasSource: [String]!) {
    createPost(input: { title: $title, user_id: $user_id, mediasSource: $mediasSource }) {
      success
      message
      data {
        id
      }
    }
  }
`;

export const PostPicturePreview: React.FC<Props> = ({ picture, setView, closeCamera, me }) => {
  const [title, setTitle] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [createPost] = useMutation<CreatePostResult, CreatePostVariables>(CREATE_POST_MUTATION, {
    update(cache, { data: { createPost } }) {
      const { posts } = cache.readQuery({ query: POSTS_QUERY });

      cache.writeQuery({
        query: POSTS_QUERY,
        data: { posts: posts.concat([createPost.data]) },
      });
    },
  });

  const savePicture = async (): Promise<void> => {
    setIsSaving(true);

    try {
      /** First upload the picture */
      const { data } = await uploadPicture(getPictureFormData(picture));

      /** Then get the source back and create the post with it */
      const newPost = { title, user_id: me.id, mediasSource: [data.source] };
      await createPost({ variables: newPost });

      setIsSaving(false);
      closeCamera();
    } catch (e) {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cancelButton}>
        <Button type="clear" title="Cancel" onPress={() => setView(PICTURE_VIEWS.Camera)} />
      </View>

      <Image source={{ uri: picture.uri }} style={styles.picture} />

      <View style={styles.form}>
        <Input
          label="Post Title"
          value={title}
          onChangeText={title => setTitle(title)}
          containerStyle={styles.input}
        />
        <Button
          title={isSaving ? 'Saving...' : 'Save Post'}
          onPress={savePicture}
          disabled={isSaving}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelButton: {
    paddingTop: MARGINS.default,
    paddingRight: MARGINS.default,
    alignSelf: 'flex-end',
  },
  picture: {
    width: screenWidth,
    height: screenWidth,
  },
  form: { padding: MARGINS.default },
  input: { marginBottom: MARGINS.default },
});
