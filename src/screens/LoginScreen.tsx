import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import { AuthStackParams } from '../types/NavigationTypes';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParams>;
};

const Login = ({ navigation }: LoginScreenProps) => {
  return (
    <View style={styles.container}>
      <LoginForm navigation={navigation} />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Login;
