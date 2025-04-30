import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export const OnboardingButton = ({title, onPress}: ({title: string, onPress: any})) => {
  return (
    <TouchableOpacity
        className="bg-black w-full h-16 rounded-md flex items-center justify-center"
        onPress={onPress}
    >
        <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  );
};