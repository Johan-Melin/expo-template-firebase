import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Welcome to your app!</Text>
      </View>
    </>
  );
}
