import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FormPageHeader } from 'components/FormPageHeader'
import { icons } from 'constants/icons'
import { router } from 'expo-router'

const repsCompletedMetrics = () => {
	return (
		<View className="bg-pastel-purple w-full h-screen">
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
					Metrics: Tasks
				</Text>
		

				<Text className="text-black/80 leading-6">
					Stay motivated! How many reps have you done?
				</Text>
				
			</View>
		</View>
	)
}

export default repsCompletedMetrics