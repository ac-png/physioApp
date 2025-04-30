import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingPolicies } from 'components/OnboardingPolicies'
import { OnboardingButton } from 'components/OnboardingButton'
import { router } from 'expo-router'

const Onboarding = () => {

    const [screen, setScreen]= useState<number>(0);

    const screenData = [
        {
            header: "Your Physio Plan\nAnytime, Anywhere\nMade Simple",
            subtitle: "Your journey starts today — simple exercises and real progress!",
            illustrationURI: ""
        },
        {
            header: "Track Your Progress\nSee Your Growth\nStay Motivated",
            subtitle: "Watch your improvements build over time and keep your momentum going.",
            illustrationURI: ""
        },
        {
            header: "Stay On Track\nWith Your Exercises\nAt Your Pace",
            subtitle: "Stick to your plan between visits and stay on track with your recovery.",
            illustrationURI: ""
        }
    ]

    const next = () => {

        if (screen < 2) {
            setScreen(screen + 1)
        } else {
            router.navigate('/account/login');
        }
    };

    return (
        <View className="bg-pastel-green h-screen w-full">
            <SafeAreaView className="h-full flex flex-col justify-between gap-y-12">

                <View className="w-full pt-4 px-6 flex flex-row items-center justify-between">
                    <View className="bg-black h-2 w-[32%] rounded-full" />
                    { screen > 0 ? (
                        <View className="bg-black h-2 w-[32%] rounded-full" />
                    ) : (
                        <View className="bg-black/20 h-2 w-[32%] rounded-full" />
                    )}
                    { screen > 1 ? (
                        <View className="bg-black h-2 w-[32%] rounded-full" />
                    ) : (
                        <View className="bg-black/20 h-2 w-[32%] rounded-full" />
                    )}
                </View>

                <View className="flex flex-grow px-6 gap-y-9 justify-end">
                    <View className="flex gap-y-5">
                        <Text className="text-black text-3xl text-center font-bold tracking-wide">
                            { screenData[screen].header }
                        </Text>
                        <Text className="text-back text-center tracking-wide">
                            { screenData[screen].subtitle }
                        </Text>
                    </View>
                </View>

                <View className="flex gap-y-6 px-6">
                    <OnboardingButton title="Next" onPress={next} />
                    <TouchableOpacity onPress={() => {router.navigate('/account/login')}}>
                        <Text className="text-black text-lg font-medium text-center">Skip</Text>
                    </TouchableOpacity>
                </View>
                
                <OnboardingPolicies />
            </SafeAreaView>
        </View>
    )
}

export default Onboarding