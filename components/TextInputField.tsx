import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

type TextInputProps = {
	placeholder: string;
	value: any;
	labelText: string;
	labelVisible: boolean;
  	isDisabled: boolean;
	keyboardType: "default" | "number-pad" | "numeric" | "url";
	autoComplete: "off" | "name" | "tel" | "birthdate-full" | "one-time-code";
	onChangeText: any;
	children?: React.ReactNode;
};

export const TextInputField = ({ placeholder, value, labelText, labelVisible, keyboardType, autoComplete, isDisabled, onChangeText, children }: TextInputProps) => {
	return (
		<View className="w-full flex gap-y-3">
			{labelVisible &&
			<Text className="text-black font-bold">
				{ labelText }
			</Text>
			}

			{isDisabled ? (
				<TextInput
					className="bg-gray-300/60 w-full h-12 border border-gray-300 px-4 rounded-md"
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					autoCapitalize="none"
					editable={false}
				/>
			) : (
				<TextInput
					className="bg-white w-full h-12 border border-gray-300 px-4 rounded-md"
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					autoComplete={autoComplete}
					keyboardType={keyboardType}
					autoCapitalize="none"
					editable
				/>
			)}

		</View>
	);
};