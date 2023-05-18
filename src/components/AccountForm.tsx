import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import { appColors } from '../appColors';
import { Context, UserDataContext } from '../context/UserContext';

import Toast from 'react-native-toast-message';
import { AuthState } from '../types/reduxTypes';

const AccountForm = () => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const { state } = useContext(Context) as UserDataContext;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{state.user.username}</Text>
      </View>
      <Controller
        control={control}
        defaultValue={state.user.firstName}
        name="firstName"
        rules={{
          required: { value: true, message: 'Potrebno je ime' },
          maxLength: { value: 25, message: 'Ime je predugačko' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Ime"
            errorMessage={errors.firstName?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={state.user.lastName}
        name="lastName"
        rules={{
          required: { value: true, message: 'Potrebno je prezime' },
          maxLength: { value: 25, message: 'Prezime je predugačko' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Prezime"
            errorMessage={errors.lastName?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue={state.user.address}
        name="address"
        rules={{
          required: { value: true, message: 'Potrebna je adresa' },
          maxLength: { value: 40, message: 'Adresa je predugačka' },
          minLength: { value: 3, message: 'Adresa je prekratka' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Adresa"
            errorMessage={errors.address?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue={state.user.phone}
        name="phone"
        rules={{
          maxLength: { value: 20, message: 'Broj telefona je predugačak' },
          minLength: { value: 6, message: 'Broj telefona je prekratak' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Telefon"
            errorMessage={errors.phone?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      <Button
        title="SPREMI PROMJENE"
        buttonStyle={{
          backgroundColor: appColors.green,
          width: 200,
          height: 50,
        }}
        containerStyle={{
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={handleSubmit(
          async ({ firstName, lastName, address, phone }) => {
            try {
              await bankApi.put(
                '/user',
                { firstName, lastName, address, phone },
                {
                  headers: {
                    Authorization: basicAuth,
                  },
                },
              );
              Keyboard.dismiss();
              showToast(
                'success',
                'Spremljeno',
                'Korisnički podatci su uspješno promijenjeni',
              );
            } catch (err) {
              console.log(err);
              showToast(
                'error',
                'Neuspješno',
                'Korisnički podatci nisu uspješno spremljeni',
              );
            }
          },
        )}
      />
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
  },
  textContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    color: appColors.green,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default AccountForm;
