import { Button } from '@rneui/base';
import { Dialog, Input } from '@rneui/themed';
import React, { useCallback, useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import bankApi from '../api/bankApi';
import { appColors } from '../appColors';
import { BankAccount } from '../types/BankAccountTypes';
import { AuthState } from '../types/reduxTypes';
import { ButtonGroup } from '@rneui/themed';
import {
  BankAccountDataContext,
  Context as BankAccountContext,
} from '../context/BankAccountContext';

type BankAccountTransferProps = {
  handleBalanceValue: () => void;
  bankAccount: BankAccount;
};

const BankAccountTransfer = ({
  bankAccount,
  handleBalanceValue,
}: BankAccountTransferProps) => {
  const basicAuth = useSelector((state: AuthState) => state.basicAuth);
  const { state, getBankAccounts } = useContext(
    BankAccountContext,
  ) as BankAccountDataContext;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [visibleTransfer, setVisibleTransfer] = useState(false);

  const toggleTransferDialog = useCallback(() => {
    setVisibleTransfer(!visibleTransfer);
  }, [visibleTransfer]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [selectedId, setSelectedId] = useState(-1);

  const [errorNotSelected, setErrorNotSelected] = useState('');

  return (
    <View>
      <Button
        title="PREBACI"
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainerStyle}
        onPress={() => {
          getBankAccounts(basicAuth);
          toggleTransferDialog();
        }}
      />
      <Dialog
        isVisible={visibleTransfer}
        onBackdropPress={toggleTransferDialog}
        overlayStyle={styles.dialogContainer}
      >
        <Dialog.Title
          title="Prebaci sredstva na drugi račun"
          titleStyle={styles.titleContainer}
        />
        <ButtonGroup
          buttons={['ODABERI S LISTE', 'UNESI ID']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={{ backgroundColor: appColors.green }}
        />
        {selectedIndex ? (
          <Controller
            control={control}
            name="targetBankAccountId"
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
                label="Id ciljanog bankovnog računa"
                errorMessage={errors.targetBankAccountId?.message as string}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
              />
            )}
          />
        ) : (
          <View>
            <FlatList
              style={styles.list}
              horizontal
              data={state.bankAccounts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedId(item.id);
                      setErrorNotSelected('');
                    }}
                    style={
                      item.id === selectedId
                        ? styles.touchableSelcted
                        : styles.touchable
                    }
                  >
                    <View>
                      <Text style={styles.text}>
                        <Text>Id: </Text>
                        <Text style={styles.mainText}>{item.id}</Text>
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.mainText}>{item.balance} kn</Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            {errorNotSelected && (
              <Text style={styles.errorMessage}>{errorNotSelected}</Text>
            )}
          </View>
        )}

        <Controller
          control={control}
          name="transferValue"
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
              errorMessage={errors.transferValue?.message as string}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          )}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="PREBACI"
            titleStyle={styles.buttonTitle}
            onPress={handleSubmit(
              async ({ targetBankAccountId, transferValue }) => {
                if (
                  (selectedIndex == 0 && selectedId != -1) ||
                  selectedIndex == 1
                ) {
                  try {
                    const responseTransfer = await bankApi.patch(
                      `/bank-accounts/${bankAccount.id}/transfer/${
                        selectedIndex ? targetBankAccountId : selectedId
                      }?amount=${transferValue}`,
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
                    toggleTransferDialog();
                  } catch (err) {
                    toggleTransferDialog();
                    showDeniedTransferToast();
                    console.log(err);
                  }
                } else {
                  setErrorNotSelected('Odaberi ciljani bankovni račun');
                }
              },
            )}
          />
          <Dialog.Button
            title="ODUSTANI"
            titleStyle={styles.buttonTitle}
            onPress={toggleTransferDialog}
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
  buttonGroupContainer: {
    marginBottom: 30,
  },
  list: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
  },
  touchableSelcted: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    backgroundColor: appColors.green,
    borderWidth: 1,
    borderColor: appColors.gray,
  },
  touchable: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: appColors.gray,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  mainText: {
    fontWeight: '700',
  },
  errorMessage: {
    color: 'red',
    marginLeft: 5,
    merginRight: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default BankAccountTransfer;
