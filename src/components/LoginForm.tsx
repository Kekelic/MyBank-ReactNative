import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { Dialog, Icon, Input } from '@rneui/themed';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import bankApi from '../api/bankApi';
import { appColors } from '../appColors';
import { setBasicAuthorization, setLoggedIn } from '../redux/auth.slice';
import { AuthStackParams } from '../types/NavigationTypes';

type LoginFormProps = {
  navigation: NativeStackNavigationProp<AuthStackParams>;
};

const LoginForm = ({ navigation }: LoginFormProps) => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');

  const [securePassword, setSecurePassword] = useState(true);
  const [visibleLoadingDialog, setVisibleLoadingDialog] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordSecurity = useCallback(() => {
    setSecurePassword(!securePassword);
  }, [securePassword]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        rules={{
          required: { value: true, message: 'Potrebno je korisničko ime' },
          maxLength: { value: 25, message: 'Korisničko ime je predugačko' },
          minLength: { value: 3, message: 'Korisničkoime je prekratko' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Korisničko ime"
            errorMessage={errors.username?.message as string}
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
        name="password"
        rules={{
          required: { value: true, message: 'Potrebna je lozinka' },
          maxLength: { value: 25, message: 'Lozika je predugačka' },
          minLength: { value: 3, message: 'Lozinka je prekratka' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Lozinka"
            errorMessage={errors.password?.message as string}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={securePassword}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={
              securePassword ? (
                <Icon
                  type="entypo"
                  name="eye"
                  size={24}
                  color="black"
                  onPress={togglePasswordSecurity}
                />
              ) : (
                <Icon
                  type="entypo"
                  name="eye-with-line"
                  size={24}
                  color="black"
                  onPress={togglePasswordSecurity}
                />
              )
            }
          />
        )}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Button
        title="PRIJAVA"
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
        onPress={handleSubmit(async function (data) {
          setVisibleLoadingDialog(true);
          dispatch(
            setBasicAuthorization({
              username: data.username,
              password: data.password,
            }),
          );
          try {
            const base64 = require('base-64');
            const response = await bankApi.get('/user', {
              headers: {
                Authorization:
                  'Basic ' + base64.encode(data.username + ':' + data.password),
              },
            });
            dispatch(setLoggedIn({ loggedIn: true }));
          } catch (err) {
            setVisibleLoadingDialog(false);
            console.log(err);
            setErrorMessage('Unesi ispravno korisničko ime i lozinku');
          }
        })}
      />
      <TouchableOpacity
        style={styles.touchableRegister}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>Nemaš račun? Registriraj se</Text>
      </TouchableOpacity>

      <Dialog
        isVisible={visibleLoadingDialog}
        onBackdropPress={() => setVisibleLoadingDialog(false)}
        overlayStyle={styles.loadingDialog}
      >
        <Dialog.Loading />
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    justifyContent: 'center',
  },
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
  loadingDialog: {
    backgroundColor: '#fffc',
  },
});

export default LoginForm;
