import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import { BankAccountStackParams } from '../types/NavigationTypes';
import { AuthState } from '../types/reduxTypes';

type BankAccountDeleteProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
  bankAccountId: number;
};

const BankAccountDelete = ({
  navigation,
  bankAccountId,
}: BankAccountDeleteProps) => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const createAlert = useCallback(() => {
    Alert.alert('Obriši', 'Želite li obrisati bankovni račun?', [
      {
        text: 'NE',
        style: 'cancel',
      },
      {
        text: 'DA',
        onPress: async () => {
          try {
            await bankApi.delete(`/bank-accounts/${bankAccountId}`, {
              headers: {
                Authorization: basicAuth,
              },
            });
            navigation.goBack();
          } catch (err) {
            showToast(
              'error',
              'Neuspješno',
              'Brisanje bankovnog računa nije uspjelo',
            );
            console.log(err);
          }
        },
      },
    ]);
  }, [bankAccountId, basicAuth]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          createAlert();
        }}
      >
        <Text style={styles.link}>Obriši bankovni račun</Text>
      </TouchableOpacity>
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
  link: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    marginBottom: 30,
  },
});

export default BankAccountDelete;
