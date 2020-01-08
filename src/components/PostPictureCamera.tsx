import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements';
import Sound from 'react-native-sound';

import { MARGINS } from '../styles/variables';
import { Picture, PICTURE_VIEWS } from '../types';
import { DEV_URL } from '../constants';

interface Props {
  setView: (view: PICTURE_VIEWS) => void;
  setPicture: (picture: Picture) => void;
  closeCamera: () => void;
}

const {
  Constants: { Type },
} = Camera;

/**
 * @TODO
 * 1. Play sound when taking a picture
 * */
export const PostPictureCamera: React.FC<Props> = ({ setView, setPicture, closeCamera }) => {
  const [type, setType] = useState(Type.back);
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(null);

  let camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const switchCameraType = (): void => {
    setType(type === Type.back ? Type.front : Type.back);
  };

  const takePicture = async (): Promise<void> => {
    setIsTakingPicture(true);
    let picture = await camera.current.takePictureAsync();

    setIsTakingPicture(false);
    setPicture(picture);
    setView(PICTURE_VIEWS.Preview);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera type={type} ref={camera} style={styles.camera}>
        {isTakingPicture && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Taking picture</Text>
          </View>
        )}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={switchCameraType}>
            <Text style={styles.topBarText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeCamera}>
            <Icon
              name="close"
              type="MaterialCommunityIcons"
              size={30}
              iconStyle={styles.topBarIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={takePicture}>
            <Icon name="camera" size={50} iconStyle={styles.bottomBarCaptureIcon} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: MARGINS.small,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  topBarText: {
    color: '#fff',
    fontSize: 20,
  },
  topBarIcon: {
    color: '#fff',
  },
  bottomBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: MARGINS.small,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  bottomBarCaptureIcon: {
    color: '#fff',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
  },
});
