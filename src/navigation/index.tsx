import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSelector } from 'react-redux';
import { appColors } from '../appColors';
import LogoutButton from '../components/LogoutButton';
import AccountScreen from '../screens/AccountScreen';
import BankAccountsListScreen from '../screens/ListBankAccountsScreen';
import CreateBankAccountScreen from '../screens/CreateBankAccountScreen';
import DetailsBankAccountScreen from '../screens/DetailsBankAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TermOfUseScreen from '../screens/TermOfUseScreen';
import {
  AuthStackParams,
  BankAccountStackParams,
  MainTabParams,
} from '../types/NavigationTypes';
import { AuthState } from '../types/reduxTypes';

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const Tab = createBottomTabNavigator<MainTabParams>();

const BankAccountStack = createNativeStackNavigator<BankAccountStackParams>();

const BankAccountHome = () => {
  return (
    <BankAccountStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: appColors.green,
        },
        headerTintColor: appColors.white,
        headerTitleAlign: 'center',
      }}
    >
      <BankAccountStack.Screen
        name="BankAccountList"
        component={BankAccountsListScreen}
        options={{
          title: 'BANKOVNI RAČUNI',
        }}
      />
      <BankAccountStack.Screen
        name="CreateBankAccount"
        component={CreateBankAccountScreen}
        options={{
          title: 'KREIRAJ BANKOVNI RAČUN',
        }}
      />
      <BankAccountStack.Screen
        name="DetailsBankAccount"
        component={DetailsBankAccountScreen}
        options={{
          title: 'BANKOVNI RAČUN',
        }}
      />
    </BankAccountStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: appColors.green,
        },
        headerTintColor: appColors.white,
        tabBarActiveTintColor: appColors.green,
      }}
    >
      <Tab.Screen
        name="BankAccountHome"
        component={BankAccountHome}
        options={{
          title: 'KORISNIČKI RAČUN',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="list" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'KORISNIČKI RAČUN',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="account-box"
                size={30}
                color={color}
              />
            );
          },
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: appColors.green,
        },
        headerTintColor: appColors.white,
        headerTitleAlign: 'center',
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'MOJA BANKA',
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'MOJA BANKA',
        }}
      />
      <AuthStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          title: 'PRAVILA PRIVATNOSTI',
        }}
      />
      <AuthStack.Screen
        name="TermOfUse"
        component={TermOfUseScreen}
        options={{
          title: 'UVIJETI KORIŠTENJA',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default function RootNavigation() {
  const loggedIn = useSelector((state: AuthState) => state.loggedIn);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00853E" style="light" />
      {loggedIn ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
