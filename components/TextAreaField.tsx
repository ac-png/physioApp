import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

type TextAreaProps = {
  placeholder: string
  value: any
  labelText: string
  labelVisible: boolean
  onChangeText: any
  numberOfLines: number
  maxLength: number
  children?: React.ReactNode;
};

export const TextAreaField = (
    { placeholder, value, labelText, labelVisible, onChangeText, numberOfLines, maxLength, children }
    : TextAreaProps) => {
  return (
    <View className="w-full flex gap-y-3">
        {labelVisible &&
        <Text className="text-black font-bold">
            { labelText }
        </Text>
        }
        
        <TextInput
            className="
            w-full border h-44 align-text-top bg-white border-gray-300 p-4 leading-6 rounded-md"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            multiline
            editable
        />
    </View>
  );
};