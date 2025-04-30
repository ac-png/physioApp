import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { numberToWords } from 'services/numberHelpers';


type PainLevelSliderProps = {
    onChangeLevel: any;
};

export const PainLevelsSlider = ({ onChangeLevel }: PainLevelSliderProps) => {

    const [selectedPainLevel, setSelectedPainLevel]= useState<number>(1);

    const painLevelColours = [
        '#6BCD5E',
        '#73C35D',
        '#72B55A',
        '#88A557',
        '#99A557',
        '#A59057',
        '#A57F57',
        '#A56E57',
        '#A45B51',
        '#984646'
    ];

    useEffect(() => {

        onChangeLevel(selectedPainLevel);

    }, [selectedPainLevel]);

    return (
    <View className="flex gap-y-3 -mx-1">

        <View className="flex flex-row justify-between px-1">
            <Text className="text-black font-bold">
                Pain Level
            </Text>
            <Text className="text-gray-400">
                { selectedPainLevel } / 10
            </Text>
        </View>

        <View className="w-full flex flex-row">
            
            {Array.from({ length: 10 }, (_, i) => (
            <TouchableOpacity
                className="w-[10%] h-24 px-0.5"
                onPress={() => setSelectedPainLevel(i + 1)}
                key={i + 1}
            >
                {i + 1 === selectedPainLevel ? (
                <View className="bg-pastel-green w-full h-20 px-1 pt-1 rounded-lg flex items-center">
                    <View className="w-full h-12 rounded-md" style={{ backgroundColor: painLevelColours[i] }} />
                    <Text className="text-black text-sm font-bold">{i + 1}</Text>
                </View>
                ) : (
                <View className="w-full h-20 px-0.5 pt-1 rounded-md flex items-center">
                    <View className="w-full h-12 rounded-md" style={{ backgroundColor: painLevelColours[i] }} />
                    <Text className="text-gray-400 text-sm font-bold">{i + 1}</Text>
                </View>
                )}
                
            </TouchableOpacity>
            ))}
        </View>

        {/* Slider Component */}
        

    </View>
    );
};