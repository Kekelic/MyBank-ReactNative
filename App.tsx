import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as BankAccountProvider } from './src/context/BankAccountContext';
import { Provider as UserProvider } from './src/context/UserContext';
import RootNavigation from './src/navigation';
import store, { persistor } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider>
          <BankAccountProvider>
            <SafeAreaProvider>
              <RootNavigation />
            </SafeAreaProvider>
          </BankAccountProvider>
        </UserProvider>
      </PersistGate>
    </Provider>
  );
}
