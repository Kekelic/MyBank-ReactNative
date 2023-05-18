import React, { useCallback, useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import { UserDataContext } from '../context/UserContext';
import { clearData } from '../redux/auth.slice';

import Toast from 'react-native-toast-message';
import {
  BankAccountDataContext,
  Context as BankAccountContext,
} from '../context/BankAccountContext';
import { Context as UserContext } from '../context/UserContext';
import { AuthState } from '../types/reduxTypes';

const AccountDelete = () => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const dispatch = useDispatch();

  const { clearUserData } = useContext(UserContext) as UserDataContext;
  const { clearBankAccounts } = useContext(
    BankAccountContext,
  ) as BankAccountDataContext;

  const createAlert = useCallback(() => {
    Alert.alert('Obriši', 'Želite li obrisati korisnički račun?', [
      {
        text: 'NE',
        style: 'cancel',
      },
      {
        text: 'DA',
        onPress: async () => {
          try {
            await bankApi.delete('/user', {
              headers: {
                Authorization: basicAuth,
              },
            });
            clearUserData();
            clearBankAccounts();
            dispatch(clearData());
          } catch (err) {
            showToast(
              'error',
              'Neuspješno',
              'Brisanje korisničkog računa nije uspjelo',
            );
            console.log('err');
          }
        },
      },
    ]);
  }, [basicAuth]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={createAlert}>
        <Text style={styles.link}>Obriši korisnički račun</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const showToast = (type: string, text1: string, text2: string) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: 2000,
    position: 'top',
    topOffset: 0,
  });
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
  },
  link: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    marginBottom: 30,
  },
});

export default AccountDelete;
