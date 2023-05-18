import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appColors } from '../appColors';
import { BankAccount } from '../types/BankAccountTypes';
import { BankAccountStackParams } from '../types/NavigationTypes';

type BankAccountsFlatListItemProps = {
  navigation: NativeStackNavigationProp<BankAccountStackParams>;
  item: BankAccount;
};

const BankAccountsFlatListItem = ({
  navigation,
  item,
}: BankAccountsFlatListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        navigation.navigate('DetailsBankAccount', {
          bankAccount: item,
        });
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text>Identifikacijski broj: </Text>
          <Text style={styles.mainText}>{item.id}</Text>
        </Text>
        <Text style={styles.text}>
          <Text>Vrijednost računa: </Text>
          <Text style={styles.mainText}>{item.balance} kn</Text>
        </Text>
      </View>
      <FontAwesome5
        name="arrow-circle-right"
        size={60}
        color="black"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginTop: 10,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: appColors.lightGreen,
    opacity: 0.8,
    borderRadius: 10,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    padding: 5,
    marginLeft: 10,
    textAlign: 'center',
  },
  mainText: {
    fontWeight: '700',
  },
  icon: {
    alignSelf: 'center',
    marginRight: 20,
  },
});

export default BankAccountsFlatListItem;
