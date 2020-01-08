import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { Image, Input, Button, Icon } from 'react-native-elements';

enum VIEW {
  Camera = 'Camera',
  Details = 'Details',
}

const screenWidth: number = Math.round(Dimensions.get('window').width);

export const Camera = ({ closeCamera }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [picture, setPicture] = useState(null);
  const [view, setView] = useState<VIEW>(VIEW.Camera);

  let camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function takePicture() {
    setIsCapturing(true);
    let picture = await camera.current.takePictureAsync();

    setIsCapturing(false);
    setPicture(picture);
    setView(VIEW.Details);

    // const imagesData = new FormData();

    // imagesData.append('image', {
    //   uri: image.uri,
    //   type: 'image/jpeg',
    //   name: `${'lorem ipsum dollor'}_${1}.jpg`,
    // });
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (view === VIEW.Details && picture) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 30, paddingRight: 20, alignSelf: 'flex-end' }}>
          <Button
            type="clear"
            icon={<Icon name="close" />}
            title="Cancel"
            onPress={() => setView(VIEW.Camera)}
          />
        </View>
        <Image source={{ uri: picture.uri }} style={{ width: screenWidth, height: screenWidth }} />
        <View style={{ padding: 20 }}>
          <Input label="Post Title" />
          <Button title="Save Post" onPress={closeCamera} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type} ref={camera}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginLeft: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              setType(
                type === ExpoCamera.Constants.Type.back
                  ? ExpoCamera.Constants.Type.front
                  : ExpoCamera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
              marginRight: 20,
              marginBottom: 20,
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {isCapturing ? 'Capturing Picture...' : 'Take Picture'}
            </Text>
          </TouchableOpacity>
        </View>
      </ExpoCamera>
    </View>
  );
};

const styles = StyleSheet.create({});
