import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  BankAccountDataContext,
  Context as BankAccountContext,
} from '../context/BankAccountContext';
import { BankAccountStackParams } from '../types/NavigationTypes';
import BankAccountsFlatListItem from './BankAccountsFlatListItem';

type BankAccountFlatListProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
};

const BankAccountsFlatList = ({ navigation }: BankAccountFlatListProps) => {
  const { state } = useContext(BankAccountContext) as BankAccountDataContext;

  return (
    <FlatList
      style={styles.list}
      data={state.bankAccounts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return <BankAccountsFlatListItem navigation={navigation} item={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 5,
  },
});

export default BankAccountsFlatList;
