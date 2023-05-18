import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { appColors } from '../appColors';
import { BankAccountStackParams } from '../types/NavigationTypes';

type CreateBankAccountButtonProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
};

const CreateBankAccountButton = ({
  navigation,
}: CreateBankAccountButtonProps) => {
  return (
    <Button
      title="KREIRAJ BANKOVNI RAČUN"
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      onPress={() => {
        navigation.navigate('CreateBankAccount');
      }}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: appColors.green,
    height: 50,
  },
  containerStyle: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CreateBankAccountButton;
