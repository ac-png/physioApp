import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

type PasswordInputProps = {
  labelText: string
  labelVisible: boolean
  onChangeText: any
  children?: React.ReactNode;
};

export const PasswordInputField = ({ labelText, labelVisible, onChangeText, children }: PasswordInputProps) => {
  return (  
    <View className="w-full flex gap-y-3">
		{labelVisible &&
		<Text className="text-black font-bold">
			{ labelText }
		</Text>
		}
		
		<TextInput
			className="w-full h-12 border border-gray-300 px-4 rounded-md"
			autoComplete="current-password"
			placeholder="●●●●●●●"
			onChangeText={onChangeText}
			autoCapitalize="none"
			secureTextEntry
		/>
	</View>
  );
};