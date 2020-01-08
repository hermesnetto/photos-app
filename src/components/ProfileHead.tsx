import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

import { User } from '../types';
import { MARGINS } from '../styles/variables';

interface Props {
  me: User;
}

export const ProfileHead: React.FC<Props> = ({ me: { name } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarAndName}>
        <Avatar rounded title="A" size="medium" containerStyle={styles.avatar} />
        <Text>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: MARGINS.default,
  },
  avatar: {
    marginRight: MARGINS.small,
  },
  avatarAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
