import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import BankAccountsFlatList from '../components/BankAccountsFlatList';
import CreateBankAccountButton from '../components/CreateBankAccountButton';
import {
  BankAccountDataContext,
  Context as BankAccountContext,
} from '../context/BankAccountContext';
import { BankAccountStackParams } from '../types/NavigationTypes';
import { AuthState } from '../types/reduxTypes';

type ListBankAccountScreenProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
};

const BankAccountsListScreen = ({ navigation }: ListBankAccountScreenProps) => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const { getBankAccounts } = useContext(
    BankAccountContext,
  ) as BankAccountDataContext;

  useFocusEffect(
    React.useCallback(() => {
      getBankAccounts(basicAuth);
    }, []),
  );

  return (
    <>
      <BankAccountsFlatList navigation={navigation} />
      <CreateBankAccountButton navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({});

export default BankAccountsListScreen;
