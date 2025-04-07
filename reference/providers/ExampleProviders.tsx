import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// @ts-expect-error Implicit any
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

export function ExampleProviders({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ActionSheetProvider>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            {children}
          </NavThemeProvider>
        </ActionSheetProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
} 