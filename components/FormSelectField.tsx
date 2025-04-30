import React from 'react';
import { Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type FormSelectFieldProps = {
    labelText: string;
    selectData: [] | object;
    onSelect: any;
    innerLabelRightVisible: boolean;
    innerLabelRightText: string;
    children?: React.ReactNode;
};

const exampleData = [
    1,
    2,
    3,
    4,
    5,
    6
]

export const FormSelectField = (
    { labelText, selectData, onSelect, innerLabelRightVisible, innerLabelRightText, children }
    : FormSelectFieldProps) => {

  return (
    <View className="flex gap-y-3">
        <Text className="text-black font-bold">
            { labelText }
        </Text>
        <SelectDropdown
            data={exampleData}
            onSelect={onSelect}
            renderButton={(selectedItem, isOpened) => {
            return (
                <View className="bg-white rounded-md h-12 px-4 flex flex-row items-center justify-between">
                    <Text>
                        {(selectedItem) || 0}
                    </Text>
                    { innerLabelRightVisible &&
                    <Text className="text-gray-400">
                        { innerLabelRightText }
                    </Text>
                    }
                </View>
            );
            }}
            renderItem={(item, index, isSelected) => {
            return (
                <View className="mb-2">
                    <Text>{item}</Text>
                </View>
            );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: 6,
                padding: 16,
                paddingBottom: 8
            }}
        />
    </View>
  );

};