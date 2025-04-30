import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type FormButtonProps = {
    text: string
    onPress: any
    children?: React.ReactNode;
};

export const FormButton = (
    { text, onPress, children }
    : FormButtonProps) => {
  return (
    <TouchableOpacity
        className="bg-pastel-green w-full h-14 rounded-full flex items-center justify-center"
        onPress={onPress}
    >
        <Text className="text-black text-lg font-medium tracking-wide">
            { text }
        </Text>
    </TouchableOpacity>
  );
};