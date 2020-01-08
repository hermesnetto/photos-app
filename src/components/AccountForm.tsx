import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, Overlay, Icon } from 'react-native-elements';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs';

import { MARGINS } from '../styles/variables';
import { User, GqlMutationResult } from '../types';
import { ROUTES } from '../types';

interface CreateAccountVariables {
  name: string;
  email: string;
  password: string;
}

interface CreateAccountResult {
  createUser: GqlMutationResult<User>;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser(input: { email: $email, password: $password, name: $name }) {
      success
      message
      data {
        id
      }
    }
  }
`;

interface Props {
  navigation: NavigationTabProp;
}

export const AccountForm: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [createUser, { loading, error, data }] = useMutation<
    CreateAccountResult,
    CreateAccountVariables
  >(CREATE_ACCOUNT_MUTATION);

  useEffect(() => {
    if (data && data.createUser.success) {
      setShowOverlay(true);
    }
  }, [data]);

  const handleCreateAccount = (): void => {
    if (email && password && name) {
      try {
        createUser({ variables: { email, password, name } });
      } catch (e) {}
    }
  };

  const closeOverlayAndRedirect = (): void => {
    setShowOverlay(false);
    navigate(ROUTES.Login);
  };

  return (
    <View>
      {error && <Text style={styles.errorMessage}>Oh no! {error.message}</Text>}

      <View>
        <Overlay
          height={100}
          onBackdropPress={!loading ? closeOverlayAndRedirect : () => {}}
          overlayStyle={styles.overlay}
          isVisible={loading || showOverlay}
        >
          <View>
            <View style={styles.overlayContent}>
              <Text>
                {loading && 'Saving user...'}
                {showOverlay && 'User successfully created!'}
              </Text>
              {loading && (
                <Icon name="spinner" type="font-awesome" containerStyle={styles.overlayIcon} />
              )}
              {!loading && <Icon name="check" color="green" containerStyle={styles.overlayIcon} />}
            </View>
            <Button onPress={closeOverlayAndRedirect} title="Login" type="clear" />
          </View>
        </Overlay>
      </View>

      <Input
        placeholder="john@mail.com"
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope', size: 16 }}
        leftIconContainerStyle={styles.inputIcon}
        containerStyle={styles.input}
        onChangeText={(email: string): void => setEmail(email)}
        autoCompleteType="email"
      />
      <Input
        placeholder="******"
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'key', size: 16 }}
        leftIconContainerStyle={styles.inputIcon}
        containerStyle={styles.input}
        onChangeText={(password: string): void => setPassword(password)}
        autoCompleteType="password"
        secureTextEntry
      />
      <Input
        placeholder="John Doe"
        label="Name"
        leftIcon={{ type: 'font-awesome', name: 'user', size: 16 }}
        leftIconContainerStyle={styles.inputIcon}
        containerStyle={styles.input}
        onChangeText={(name: string): void => setName(name)}
      />
      <Button
        title="Create account"
        onPress={handleCreateAccount}
        disabled={!email || !password || !name}
      />
      <Button title="Login" onPress={() => navigate(ROUTES.Login)} type="clear" />
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
  errorMessage: {
    color: 'red',
    marginBottom: MARGINS.default,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    flexDirection: 'row',
  },
  overlayIcon: {
    marginLeft: MARGINS.extraSmall,
  },
});
