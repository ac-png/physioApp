import React from 'react';
import { Text, View } from 'react-native';

export const NavBar = () => {
  return (
    <View className="w-full bg-white h-20 px-8 flex flex-row justify-between items-center">
        
        {/* Home Link */}
        <View className="flex gap-y-1 items-center justify-center">
            <View className="h-8 w-8 bg-gray-300 text-gray-300 rounded-full"></View>
            <Text className="text-black text-xs font-semibold">Home</Text>
        </View>

        {/* Tasks Link */}
        <View className="flex gap-y-1 items-center justify-center">
            <View className="h-8 w-8 bg-gray-300 text-gray-300 rounded-full"></View>
            <Text className="text-black text-xs font-semibold">Tasks</Text>
        </View>

        {/* My Program Link */}
        <View className="flex gap-y-1 items-center justify-center">
            <View className="h-8 w-8 bg-gray-300 text-gray-300 rounded-full"></View>
            <Text className="text-black text-xs font-semibold">Program</Text>
        </View>

        {/* Appointments Link */}
        <View className="flex gap-y-1 items-center justify-center">
            <View className="h-8 w-8 bg-gray-300 text-gray-300 rounded-full"></View>
            <Text className="text-black text-xs font-semibold">Appoint</Text>
        </View>

        {/* Settings Link */}
        <View className="flex gap-y-1 items-center justify-center">
            <View className="h-8 w-8 bg-gray-300 text-gray-300 rounded-full"></View>
            <Text className="text-black text-xs font-semibold">Settings</Text>
        </View>

    </View>
  );
};