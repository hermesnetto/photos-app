import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { MARGINS } from '../styles/variables';
import { LoginForm } from '../components/LoginForm';

interface Props {
  navigation: NavigationTabProp;
}

export const Login: React.FC<Props> = props => {
  return (
    <View>
      <Header
        centerComponent={{ text: 'Login into your account', style: { color: '#000' } }}
        containerStyle={styles.header}
        backgroundColor="#fff"
      />
      <View style={styles.body}>
        <LoginForm {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: MARGINS.default,
  },
  body: {
    paddingHorizontal: MARGINS.default,
  },
});
