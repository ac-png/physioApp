import { icons } from 'constants/icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

type FormPageHeaderProps = {
    backPageName: string
    backPageURI: string
    headerText: string
    descriptionText: string,
    descriptionVisible: boolean
    children?: React.ReactNode;
};

export const FormPageHeader = (
    { backPageName, backPageURI, headerText, descriptionText, descriptionVisible, children }
    : FormPageHeaderProps) => {
  return (
    <View className="w-full flex gap-y-6 pt-9 px-6">

        <TouchableOpacity
            className="text-gray-400 font-medium flex flex-row items-center gap-x-3"
            onPress={() => router.navigate(`/${backPageURI}`)}
        >
            <Image
                source={icons.chevronLeft}
                className="size-2 aspect-[calc(6/9)]"
                tintColor="#BCC2CC"
            />
            <Text className="text-gray-400 font-medium">Back to { backPageName }</Text>
        </TouchableOpacity>

        <Text className="text-black text-3xl font-bold tracking-wide">{ headerText }</Text>

        {descriptionVisible &&
        <Text className="text-gray-500 leading-6">
            { descriptionText }
        </Text>
        }
    </View>
  );
};