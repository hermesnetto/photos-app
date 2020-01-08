import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { onSignIn } from '../services/auth';
import { ROUTES } from '../types';
import { TEST_URL } from '../constants';
import { MARGINS } from '../styles/variables';

interface Props {
  navigation: NavigationTabProp;
}

const url = `${TEST_URL}/login`;

export const LoginForm: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitForm = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `email=${email}&password=${password}`,
    })
      .then(response => response.json())
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            alert('Email not found, please retry');
          }
          if (response.status === 401) {
            alert('Email and password do not match, please retry');
          }
        }
        return response;
      })
      .then(data => {
        if (data.success) {
          onSignIn(data.token);
          navigate(ROUTES.SignedIn);
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <View>
      <Input
        placeholder="john@mail.com"
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope', size: 16 }}
        leftIconContainerStyle={styles.inputIcon}
        containerStyle={styles.input}
        onChangeText={(email: string): void => setEmail(email)}
      />
      <Input
        placeholder="******"
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'key', size: 16 }}
        leftIconContainerStyle={styles.inputIcon}
        containerStyle={styles.input}
        onChangeText={(password: string): void => setPassword(password)}
        secureTextEntry
      />
      <Button title="Login" disabled={!email || !password} onPress={submitForm} />
      <Button title="Create account" type="clear" onPress={() => navigate(ROUTES.CreateAccount)} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginRight: MARGINS.small,
  },
  input: {
    marginBottom: MARGINS.default,
  },
});
