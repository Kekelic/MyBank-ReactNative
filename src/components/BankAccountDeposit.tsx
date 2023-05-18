import { Button } from '@rneui/base';
import { Dialog, Input } from '@rneui/themed';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import { appColors } from '../appColors';
import { BankAccount } from '../types/BankAccountTypes';
import { AuthState } from '../types/reduxTypes';

type BankAccountDetailsProps = {
  handleBalanceValue: () => void;
  bankAccount: BankAccount;
};

const BankAccountDeposit = ({
  bankAccount,
  handleBalanceValue,
}: BankAccountDetailsProps) => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [visibleDeposit, setVisibleDeposit] = useState(false);

  const toggleDepositDialog = useCallback(() => {
    setVisibleDeposit(!visibleDeposit);
  }, [visibleDeposit]);

  return (
    <View>
      <Button
        title="UPLATI"
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainerStyle}
        onPress={toggleDepositDialog}
      />
      <Dialog
        isVisible={visibleDeposit}
        onBackdropPress={toggleDepositDialog}
        overlayStyle={styles.dialogContainer}
      >
        <Dialog.Title
          title="Uplati na račun"
          titleStyle={styles.titleContainer}
        />
        <Controller
          control={control}
          name="depositValue"
          rules={{
            required: {
              value: true,
              message: 'Potrebno je unijeti vrijednost',
            },
            min: {
              value: 1,
              message: 'Morate unijeti pozitivnu vrijednost',
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              containerStyle={styles.inputContainer}
              label="Vrijednost"
              errorMessage={errors.depositValue?.message as string}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          )}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="UPLATI"
            titleStyle={styles.buttonTitle}
            onPress={handleSubmit(async ({ depositValue }) => {
              try {
                const responseTransfer = await bankApi.patch(
                  `/bank-accounts/${bankAccount.id}/deposit?amount=${depositValue}`,
                  {
                    headers: {
                      Authorization: basicAuth,
                    },
                  },
                );
                if (responseTransfer.data) {
                  handleBalanceValue();
                  showSuccessTransferToast();
                } else {
                  showDeniedTransferToast();
                }
                toggleDepositDialog();
              } catch (err) {
                toggleDepositDialog();
                console.log(err);
                showDeniedTransferToast();
              }
            })}
          />
          <Dialog.Button
            title="ODUSTANI"
            titleStyle={styles.buttonTitle}
            onPress={toggleDepositDialog}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const showSuccessTransferToast = () => {
  showToast('success', 'Uspješno', 'Transakcija je uspješno obavljena');
};

const showDeniedTransferToast = () => {
  showToast('error', 'Neuspješno', 'Transakcija nije uspješna');
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
  buttonStyle: {
    backgroundColor: appColors.green,
    height: 50,
    borderRadius: 20,
  },
  buttonContainerStyle: {
    marginTop: 10,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonTitle: {
    color: appColors.green,
    padding: 10,
    fontSize: 16,
  },
  titleContainer: {
    backgroundColor: appColors.green,
    color: appColors.white,
    textAlign: 'center',
    padding: 10,
    marginBottom: 20,
  },
  dialogContainer: {
    borderWidth: 1,
    borderColor: appColors.darkGreen,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 0,
  },
});

export default BankAccountDeposit;
