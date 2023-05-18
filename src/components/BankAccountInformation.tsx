import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../appColors';
import { BankAccount } from '../types/BankAccountTypes';

type BankAccountInformationProps = {
  bankAccount: BankAccount;
  balance: number;
};

const BankAccountInformation = ({
  bankAccount,
  balance,
}: BankAccountInformationProps) => {
  useEffect(() => {
    bankAccount.balance = balance;
  }, [balance]);

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text>Identifikacijski broj: </Text>
          <Text style={styles.mainText}>{bankAccount.id}</Text>
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text>Dozvoljeni minus: </Text>
          <Text style={styles.mainText}>{bankAccount.allowedMinus} kn</Text>
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text>Limit podizanja: </Text>
          <Text style={styles.mainText}>{bankAccount.limitWithdraw} kn</Text>
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text>Vrijednost računa: </Text>
          <Text style={styles.mainText}>{bankAccount.balance} kn</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: appColors.lightGreen,
  },
  text: {
    fontSize: 18,
    paddingBottom: 5,
    textAlign: 'center',
  },
  mainText: {
    fontWeight: '700',
  },
});

export default BankAccountInformation;
