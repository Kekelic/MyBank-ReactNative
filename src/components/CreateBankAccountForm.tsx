import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '@rneui/base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import { appColors } from '../appColors';
import { BankAccountStackParams } from '../types/NavigationTypes';
import { AuthState } from '../types/reduxTypes';

type CreateBankAccountFormProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
};

const CreateBankAccountForm = ({ navigation }: CreateBankAccountFormProps) => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View>
      <Controller
        control={control}
        name="allowedMinus"
        rules={{
          required: { value: true, message: 'Potrebno je unijeti vrijednost' },
          min: {
            value: 0,
            message: 'Unesite pozitivnu vrijednost',
          },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Dozvoljeni minus"
            errorMessage={errors.allowedMinus?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
          />
        )}
      />

      <Controller
        control={control}
        name="limitWithdraw"
        rules={{
          required: { value: true, message: 'Potrebno je unijeti vrijednost' },
          min: {
            value: 1,
            message: 'Morate unijeti pozitivnu vrijednost',
          },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Limit podizanja"
            errorMessage={errors.limitWithdraw?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
          />
        )}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Button
        title="KREIRAJ BANKOVNI RAČUN"
        buttonStyle={{
          backgroundColor: appColors.green,
          height: 50,
        }}
        containerStyle={{
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={handleSubmit(async ({ allowedMinus, limitWithdraw }) => {
          try {
            await bankApi.post(
              '/bank-accounts',
              { allowedMinus: -allowedMinus, limitWithdraw },
              {
                headers: {
                  Authorization: basicAuth,
                },
              },
            );
            Keyboard.dismiss();
            navigation.goBack();
          } catch (err) {
            setErrorMessage('Zahtjev odbijen! Provjeri unesene podatke.');
            console.log(err);
          }
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touchableRegister: {
    marginTop: 10,
  },
  link: {
    textAlign: 'center',
    color: appColors.green,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 10,
    merginRight: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CreateBankAccountForm;
