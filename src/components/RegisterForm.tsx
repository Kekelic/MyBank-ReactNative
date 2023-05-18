import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { Dialog, Icon, Input } from '@rneui/themed';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import bankApi from '../api/bankApi';
import { appColors } from '../appColors';
import { setBasicAuthorization, setLoggedIn } from '../redux/auth.slice';
import { AuthStackParams } from '../types/NavigationTypes';

type RegisterFormProps = {
  navigation: NativeStackNavigationProp<AuthStackParams>;
};

const RegisterForm = ({ navigation }: RegisterFormProps) => {
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
    <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
      <Controller
        control={control}
        name="username"
        rules={{
          required: { value: true, message: 'Potrebno je korisničko ime' },
          maxLength: { value: 25, message: 'Korisničko ime je predugačko' },
          minLength: { value: 3, message: 'Korisničko ime je prekratko' },
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
        title="REGISTRACIJA"
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
          async ({
            username,
            password,
            firstName,
            lastName,
            address,
            phone,
          }) => {
            setVisibleLoadingDialog(true);
            dispatch(setBasicAuthorization({ username, password }));
            try {
              await bankApi.post('/user', {
                username,
                password,
                firstName,
                lastName,
                address,
                phone,
              });
              dispatch(setLoggedIn({ loggedIn: true }));
            } catch (err) {
              setVisibleLoadingDialog(false);
              console.log(err);
              setErrorMessage(
                'Nešto je pošlo po krivu, pokušajte s drugim korisničkim imenom',
              );
            }
          },
        )}
      />
      <TouchableOpacity
        style={styles.touchableRegister}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>Već imaš račun? Prijavi se</Text>
      </TouchableOpacity>

      <Dialog
        isVisible={visibleLoadingDialog}
        onBackdropPress={() => setVisibleLoadingDialog(false)}
        overlayStyle={styles.loadingDialog}
      >
        <Dialog.Loading />
      </Dialog>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 5,
    marginBottom: 2,
  },
  touchableRegister: {
    marginTop: 10,
    marginBottom: 30,
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

export default RegisterForm;
