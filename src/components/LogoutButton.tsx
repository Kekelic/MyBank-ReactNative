import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { appColors } from '../appColors';
import {
  BankAccountDataContext,
  Context as BankAccountContext,
} from '../context/BankAccountContext';
import {
  Context as UserContext,
  UserDataContext,
} from '../context/UserContext';
import { clearData } from '../redux/auth.slice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { clearUserData } = useContext(UserContext) as UserDataContext;
  const { clearBankAccounts } = useContext(
    BankAccountContext,
  ) as BankAccountDataContext;

  return (
    <Button
      title="ODJAVI SE"
      titleStyle={{
        color: appColors.black,
        fontSize: 8,
      }}
      buttonStyle={{
        marginRight: 20,
      }}
      icon={<MaterialIcons name="logout" size={30} />}
      iconPosition="top"
      type="clear"
      onPress={() => {
        clearUserData();
        clearBankAccounts();
        dispatch(clearData());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default LogoutButton;
