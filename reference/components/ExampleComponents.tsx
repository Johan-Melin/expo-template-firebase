import { useActionSheet } from '@expo/react-native-action-sheet';
import { Icon } from '@roninoss/icons';
import * as StoreReview from 'expo-store-review';
import * as React from 'react';
import {
  Button as RNButton,
  ButtonProps,
  Linking,
  Platform,
  Share,
  View,
  Alert,
} from 'react-native';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { Picker, PickerItem } from '~/components/nativewindui/Picker';
import { ProgressIndicator } from '~/components/nativewindui/ProgressIndicator';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Slider } from '~/components/nativewindui/Slider';
import { Text } from '~/components/nativewindui/Text';
import { Toggle } from '~/components/nativewindui/Toggle';
import { useColorScheme } from '~/lib/useColorScheme';

function DefaultButton({ color, ...props }: ButtonProps) {
  const { colors } = useColorScheme();
  return <RNButton color={color ?? colors.primary} {...props} />;
}

export const ExampleComponents = [
  {
    name: 'Picker',
    component: function PickerExample() {
      const { colors } = useColorScheme();
      const [picker, setPicker] = React.useState('blue');
      return (
        <Picker selectedValue={picker} onValueChange={(itemValue) => setPicker(itemValue)}>
          <PickerItem
            label="Red"
            value="red"
            color={colors.foreground}
            style={{
              backgroundColor: colors.root,
            }}
          />
          <PickerItem
            label="Blue"
            value="blue"
            color={colors.foreground}
            style={{
              backgroundColor: colors.root,
            }}
          />
          <PickerItem
            label="Green"
            value="green"
            color={colors.foreground}
            style={{
              backgroundColor: colors.root,
            }}
          />
        </Picker>
      );
    },
  },
  {
    name: 'Date Picker',
    component: function DatePickerExample() {
      const [date, setDate] = React.useState(new Date());
      return (
        <View className="items-center">
          <DatePicker
            value={date}
            mode="datetime"
            onChange={(ev) => {
              setDate(new Date(ev.nativeEvent.timestamp));
            }}
          />
        </View>
      );
    },
  },
  {
    name: 'Slider',
    component: function SliderExample() {
      const [sliderValue, setSliderValue] = React.useState(0.5);
      return <Slider value={sliderValue} onValueChange={setSliderValue} />;
    },
  },
  {
    name: 'Toggle',
    component: function ToggleExample() {
      const [switchValue, setSwitchValue] = React.useState(true);
      return (
        <View className="items-center">
          <Toggle value={switchValue} onValueChange={setSwitchValue} />
        </View>
      );
    },
  },
  {
    name: 'Progress Indicator',
    component: function ProgressIndicatorExample() {
      const [progress, setProgress] = React.useState(13);
      let id: ReturnType<typeof setInterval> | null = null;
      React.useEffect(() => {
        if (!id) {
          id = setInterval(() => {
            setProgress((prev) => (prev >= 99 ? 0 : prev + 5));
          }, 1000);
        }
        return () => {
          if (id) clearInterval(id);
        };
      }, []);
      return (
        <View className="p-4">
          <ProgressIndicator value={progress} />
        </View>
      );
    },
  },
  {
    name: 'Activity Indicator',
    component: function ActivityIndicatorExample() {
      return (
        <View className="items-center p-4">
          <ActivityIndicator />
        </View>
      );
    },
  },
  {
    name: 'Action Sheet',
    component: function ActionSheetExample() {
      const { colorScheme, colors } = useColorScheme();
      const { showActionSheetWithOptions } = useActionSheet();
      return (
        <View className="items-center">
          <DefaultButton
            color="grey"
            onPress={async () => {
              const options = ['Delete', 'Save', 'Cancel'];
              const destructiveButtonIndex = 0;
              const cancelButtonIndex = 2;

              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex,
                  destructiveButtonIndex,
                  containerStyle: {
                    backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                  },
                  textStyle: {
                    color: colors.foreground,
                  },
                },
                (selectedIndex) => {
                  switch (selectedIndex) {
                    case 1:
                      // Save
                      break;
                    case destructiveButtonIndex:
                      // Delete
                      break;
                    case cancelButtonIndex:
                    // Canceled
                  }
                }
              );
            }}
            title="Open action sheet"
          />
        </View>
      );
    },
  },
  {
    name: 'Activity View',
    component: function ActivityViewExample() {
      return (
        <View className="items-center">
          <DefaultButton
            onPress={async () => {
              try {
                const result = await Share.share({
                  message: 'NativeWindUI | Familiar interface, native feel.',
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error: any) {
                Alert.alert(error.message);
              }
            }}
            title="Share a message"
          />
        </View>
      );
    },
  },
  {
    name: 'Bottom Sheet',
    component: function BottomSheetExample() {
      const { colorScheme } = useColorScheme();
      const bottomSheetModalRef = useSheetRef();

      return (
        <View className="items-center">
          <DefaultButton
            color={colorScheme === 'dark' && Platform.OS === 'ios' ? 'white' : 'black'}
            title="Open Bottom Sheet"
            onPress={() => bottomSheetModalRef.current?.present()}
          />
          <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
            <View className="flex-1 items-center justify-center pb-8">
              <Text>@gorhom/bottom-sheet 🎉</Text>
            </View>
          </Sheet>
        </View>
      );
    },
  },
  {
    name: 'Avatar',
    component: function AvatarExample() {
      const TWITTER_AVATAR_URI =
        'https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg';
      return (
        <View className="items-center">
          <Avatar alt="NativeWindUI Avatar">
            <AvatarImage source={{ uri: TWITTER_AVATAR_URI }} />
            <AvatarFallback>
              <Text>NUI</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      );
    },
  },
] as const; 