import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';
import { AuthStackParams } from '../types/NavigationTypes';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParams>;
};

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  return (
    <View style={styles.container}>
      <RegisterForm navigation={navigation} />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegisterScreen;
