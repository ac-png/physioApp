import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from 'constants/icons'

const painLevelMetrics = () => {
	return (
		<View className="bg-pastel-green w-full h-screen">
			<View className="w-full flex gap-y-6 pt-9 px-6">
			
				<TouchableOpacity
					className="font-medium flex flex-row items-center gap-x-3"
					onPress={() => router.navigate("/")}
				>
					<Image
						source={icons.chevronLeft}
						className="size-2 aspect-[calc(6/9)]"
						tintColor="#000000"
					/>
					<Text className="text-black/80 font-medium">
						Back to Home
					</Text>
				</TouchableOpacity>
		
				<Text className="text-black text-3xl font-bold tracking-wide">
					Metrics: Pain Levels
				</Text>
		

				<Text className="text-black/80 leading-6">
					Keep track of your average pain levels
				</Text>
				
			</View>
		</View>
	)
}

export default painLevelMetrics