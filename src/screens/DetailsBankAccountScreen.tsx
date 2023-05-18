import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import BankAccountDelete from '../components/BankAccountDelete';
import BankAccountDeposit from '../components/BankAccountDeposit';
import BankAccountInformation from '../components/BankAccountInformation';
import BankAccountTransfer from '../components/BankAccountTransfer';
import BankAccountWithdraw from '../components/BankAccountWithdraw';
import { BankAccountStackParams } from '../types/NavigationTypes';
import { AuthState } from '../types/reduxTypes';

type DetailsBankAccountScreenProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
  route: RouteProp<BankAccountStackParams, 'DetailsBankAccount'>;
};

const DetailsBankAccountScreen = ({
  route,
  navigation,
}: DetailsBankAccountScreenProps) => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const { bankAccount } = route.params;

  const [balance, setBalance] = useState(bankAccount.balance);

  const handleBalanceValue = async () => {
    const responseBalance = await bankApi.get(
      `/bank-accounts/${bankAccount.id}/balance`,
      {
        headers: {
          Authorization: basicAuth,
        },
      },
    );
    bankAccount.balance = responseBalance.data;
    setBalance(responseBalance.data);
  };

  return (
    <View style={styles.container}>
      <BankAccountInformation bankAccount={bankAccount} balance={balance} />
      <BankAccountDeposit
        bankAccount={bankAccount}
        handleBalanceValue={handleBalanceValue}
      />
      <BankAccountWithdraw
        bankAccount={bankAccount}
        handleBalanceValue={handleBalanceValue}
      />
      <BankAccountTransfer
        bankAccount={bankAccount}
        handleBalanceValue={handleBalanceValue}
      />
      <BankAccountDelete
        navigation={navigation}
        bankAccountId={bankAccount.id}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    flex: 1,
  },
});

export default DetailsBankAccountScreen;
