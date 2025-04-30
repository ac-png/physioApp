import * as Linking from 'expo-linking';
import { Text, View, TouchableOpacity } from 'react-native';

export const OnboardingPolicies = () => {
  return (
    <View className="w-full flex-row items-center justify-center gap-x-4 py-6">
        <TouchableOpacity
          onPress={() => Linking.openURL(`${process.env.APP_LANDING_URL}/privacy-policy`)}
        >
            <Text>Privacy Policy</Text>
        </TouchableOpacity>
        <View className="bg-black w-1 h-1 rounded-full" />
        <TouchableOpacity
          onPress={() => Linking.openURL(`${process.env.APP_LANDING_URL}/terms-of-service`)}
        >
            <Text>Terms of Service</Text>
        </TouchableOpacity>
    </View>
  );
};