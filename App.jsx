import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useAppTheme } from './src/Theme/ThemeContext';
import Universal from './Navigation/Universal';

// Wrapper component to access theme inside NavigationContainer
function AppContent() {
  const { mode, theme } = useAppTheme();

  return (
    <>
      <StatusBar
        barStyle={mode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <NavigationContainer theme={theme}>
        <Universal />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (  
     <Provider store={store}>
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
      </Provider>
  );
}

export default App;