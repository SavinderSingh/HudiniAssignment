import React, {useEffect} from 'react';
import {Text, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/configStore';
import AppNavigator from './navigator/AppNavigator';

const App = () => {
  useEffect(() => {
    _init();
    // props.start();
    return () => {};
  }, []);

  const _init = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Non-serializable values were found in the navigation state',
    ]);
  };
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigator />
        {/* <Toast refs={ref => Toast.setRef(ref)} config={toastConfig} /> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
