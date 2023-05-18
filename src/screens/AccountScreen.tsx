import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AccountDelete from '../components/AccountDelete';
import AccountForm from '../components/AccountForm';
import { Context, UserDataContext } from '../context/UserContext';
import { AuthState } from '../types/reduxTypes';

const AccountScreen = () => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const { state, getUser } = useContext(Context) as UserDataContext;

  useEffect(() => {
    getUser(basicAuth);
  }, []);

  if (!state.user) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <AccountForm />
        <AccountDelete />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
