import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Login } from './pages/Login';
import { Feed } from './pages/Feed';
import { CreateAccount } from './pages/CreateAccount';
import { Profile } from './pages/Profile';
import { PostPicture } from './pages/PostPicture';

import { withLayout } from './hocs/withLayout';
import { ROUTES } from './types';

Icon.loadFont();

export const SignedOutRoutes = createMaterialBottomTabNavigator(
  {
    [ROUTES.Login]: {
      screen: withLayout(Login),
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="lock" size={20} color={focused ? '#000' : '#ccc'} />
        ),
      }),
    },
    [ROUTES.CreateAccount]: {
      screen: withLayout(CreateAccount),
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="user" size={20} color={focused ? '#000' : '#ccc'} />
        ),
      }),
    },
  },
  {
    barStyle: {
      backgroundColor: '#fff',
    },
    initialRouteName: 'Login',
  }
);

export const SignedInRoutes = createMaterialBottomTabNavigator(
  {
    [ROUTES.Feed]: {
      screen: withLayout(Feed),
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="home" size={20} color={focused ? '#000' : '#ccc'} />
        ),
      }),
    },
    [ROUTES.Profile]: {
      screen: withLayout(Profile),
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="user" size={20} color={focused ? '#000' : '#ccc'} />
        ),
      }),
    },
  },

  {
    barStyle: {
      backgroundColor: '#fff',
    },
    initialRouteName: 'Feed',
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createStackNavigator(
      {
        SignedIn: { screen: SignedInRoutes },
        SignedOut: { screen: SignedOutRoutes },
        [ROUTES.PostPicture]: {
          screen: withLayout(PostPicture),
        },
      },
      {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: signedIn ? ROUTES.SignedIn : ROUTES.SignedOut,
        navigationOptions: {
          gesturesEnabled: false,
        },
      }
    )
  );
};
