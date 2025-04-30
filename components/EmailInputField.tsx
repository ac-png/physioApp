import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

type EmailInputProps = {
  placeholder: string
  labelText: string
  labelVisible: boolean
  onChangeText: any
  children?: React.ReactNode;
};

export const EmailInputField = ({ placeholder, labelText, labelVisible, onChangeText, children }: EmailInputProps) => {
  return (
    <View className="w-full flex gap-y-3">
        {labelVisible &&
        <Text className="text-black font-bold">
            { labelText }
        </Text>
        }
        
        <TextInput
            className="w-full h-12 border border-gray-300 px-4 rounded-md"
            placeholder={placeholder}
            onChangeText={onChangeText}
            autoComplete="email"
            inputMode="email"
            keyboardType="email-address"
            autoCapitalize="none"
        />
    </View>
  );
};