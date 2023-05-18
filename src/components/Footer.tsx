import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appColors } from '../appColors';
import { AuthStackParams } from '../types/NavigationTypes';

type FooterProps = {
  navigation: NativeStackNavigationProp<AuthStackParams>;
};

const Footer = ({ navigation }: FooterProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableRules}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <Text style={{ color: appColors.white }}>Pravila privatnosti</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableCondition}
        onPress={() => navigation.navigate('TermOfUse')}
      >
        <Text style={{ color: appColors.white }}>Uvjeti Korištenja</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: appColors.green,
  },
  touchableRules: {
    flex: 1,
    marginLeft: 30,
    justifyContent: 'center',
  },
  touchableCondition: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 30,
    justifyContent: 'center',
  },
});

export default Footer;
