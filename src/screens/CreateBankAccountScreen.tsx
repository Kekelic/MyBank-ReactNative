import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateBankAccountForm from '../components/CreateBankAccountForm';
import { BankAccountStackParams } from '../types/NavigationTypes';

type CreateBankAccountScreenProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
};

const CreateBankAccountScreen = ({
  navigation,
}: CreateBankAccountScreenProps) => {
  return (
    <View style={styles.container}>
      <CreateBankAccountForm navigation={navigation} />
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
});

export default CreateBankAccountScreen;
