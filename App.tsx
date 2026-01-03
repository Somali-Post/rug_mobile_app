/**
 * Rug - Somali Digital Postal Service
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor={COLORS.background} 
          />
          <AppNavigator />
        </>
      </PersistGate>
    </Provider>
  );
}

export default App;
