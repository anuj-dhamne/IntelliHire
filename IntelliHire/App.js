import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./AppNavigator/AppNavigator.js"
import { Appearance } from 'react-native';

export default function App() {
   useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);
  return (
   <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}


