import { useColorScheme } from 'react-native';

export const useAppColors = () => {
  const scheme = useColorScheme() || 'light'; // SAFE fallback

  return {
    background: '#ffffff',
    text: '#000000',
    placeholder: '#999999', // SAME for light & dark
  };
};
