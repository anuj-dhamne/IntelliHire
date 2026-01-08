import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./AppNavigator/AppNavigator.js"

export default function App() {
  return (
   <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}


