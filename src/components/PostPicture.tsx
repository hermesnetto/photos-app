import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Picture, PICTURE_VIEWS, User } from '../types';
import { PostPictureCamera } from './PostPictureCamera';
import { PostPicturePreview } from './PostPicturePreview';

interface Props {
  closeCamera: () => void;
  me: User;
}

export const PostPicture: React.FC<Props> = ({ closeCamera, me }) => {
  const [view, setView] = useState<PICTURE_VIEWS>(PICTURE_VIEWS.Camera);
  const [picture, setPicture] = useState<Picture | null>(null);

  if (view === PICTURE_VIEWS.Camera) {
    return (
      <PostPictureCamera setView={setView} setPicture={setPicture} closeCamera={closeCamera} />
    );
  }

  if (view === PICTURE_VIEWS.Preview && picture) {
    return (
      <PostPicturePreview setView={setView} picture={picture} closeCamera={closeCamera} me={me} />
    );
  }

  return <View />;
};

const styles = StyleSheet.create({});
