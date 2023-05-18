import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import PrivacyPolicyText from '../components/PrivacyPolicyText';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView>
      <PrivacyPolicyText />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PrivacyPolicyScreen;
