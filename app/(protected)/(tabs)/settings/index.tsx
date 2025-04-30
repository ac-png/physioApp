import { Text, View, ScrollView, Image, TouchableOpacity, Alert, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from 'constants/icons'
import axios from 'axios';
import { router } from 'expo-router';
import { useAuth } from 'context/AuthContext';
import { getPatient } from 'services/api';

const Settings = () => {	

	const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

	const { onLogOut, authState } = useAuth();
	const userEmail = authState?.user?.email;
  	const userName = authState?.user?.name;

	const [patientData, setPatientData] = useState(null);
	const [notificationsEnabled, setnotificationsEnabled] = useState(true);
	
	useEffect(() => {
		const fetchData = async () => {
			const user = await getPatient();

			if (!user.error) {
				setPatientData(user)
			}
		};

		fetchData();
	}, []);

	const handleNotificationsPermissions = () => {
		// POLISH
		notificationsEnabled ? setnotificationsEnabled(false) : setnotificationsEnabled(true)
	}

	const handleLogout = async () => {
		if (onLogOut) {
			await onLogOut();
			router.replace('/account/login'); // 🚀 redirect them back to login page (optional)
		}
	};

	const onShare = async () => {
    try {
		const result = await Share.share({
			message:
				'FlexiCare | An app to track your Physio exercise progress',
			url:
				`${process.env.EXPO_PUBLIC_APP_LANDING_URL}/app`,
			title:
				'FlexiCare'
		});
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

	return (
		<ScrollView className=''>
			
			<View className="bg-pastel-green w-full pt-16 px-6 flex gap-y-4 items-start justify-start">
				
				{/* Profile Icon */}
				<View className="w-full flex flex-row justify-center">
					<View className="bg-black/10 size-20 rounded-full flex items-center justify-center">
						{/* Identicon instead of pfp */}
						<Image
							source={{
								uri: `https://api.dicebear.com/9.x/identicon/png?seed=${patientData ? patientData['email'] : "default"}&backgroundColor=transparent&row1=ooxoo,oxoxo,xooox`
							}}
							className="size-8"
							tintColor={"#000000"}
						/>
					</View>
				</View>

				{/* Name & Email */}
				<View className="w-full flex gap-y-1 mb-3">
					<Text className="text-black text-2xl font-medium text-center tracking-wide">
						{ userName ?? "" }
						{/* { patientData ? patientData['name'] : "John Smith"} */}
					</Text>
					<Text className="text-black/50 text-center tracking-wide">
						{ userEmail ?? "" }
					</Text>
				</View>

				{/* Edit Profile Button */}
				<View
					className="w-full -mb-5 px-5 flex flex-row items-center justify-center"
				>
					<TouchableOpacity
						className="bg-black px-5 h-10 rounded-full flex justify-center"
						onPress={() => router.navigate('/settings/edit')}
					>
						<Text className="text-white tracking-wide">Edit Profile</Text>
					</TouchableOpacity>	
				</View>

			</View>
	
			<View
				className="w-full flex flex-grow px-6 py-9 mt-9"
			>
	
				{/* Settings Category :: Preferences */}
				<View className="flex gap-y-5 mb-9">

					{/* Settings Category Heading */}
					<Text className="text-gray-400 text-sm font-medium tracking-wide">
						Preferences
					</Text>

					<View className="w-full flex gap-y-4">

						{/* Setting :: Program Settings */}
						<TouchableOpacity
							className="w-full flex flex-row justify-between items-center"
							onPress={() => router.navigate('/settings/program')}
						>
	
							<View className="flex flex-row items-center gap-x-4">
								<View className="bg-gray-200 size-9 rounded-md flex items-center justify-center">
									<Image
										source={icons.settingsProgram}
										className="size-4 aspect-[calc(46/50)]"
										tintColor={"#000000"}
									/>
								</View>
								<Text className="text-black font-medium">
									Program Settings
								</Text>
							</View>
							
							<Image
								source={icons.chevronRight}
								className="size-2 aspect-[calc(6/9)]"
								tintColor={"#BCC2CC"}
							/>
	
						</TouchableOpacity>

						{/* Setting :: Theme */}
						<TouchableOpacity
							className="w-full flex flex-row justify-between items-center"
						>
	
							<View className="flex flex-row items-center gap-x-4">
								<View className="bg-gray-200 size-9 rounded-md flex items-center justify-center">
									<Image
										source={icons.settingsTheme}
										className="size-4"
										tintColor={"#000000"}
									/>
								</View>
								<Text className="text-black font-medium">
									Theme
								</Text>
							</View>
							
							<View className="flex flex-row items-center gap-x-5">
								<Text className="text-gray-400 ">
									Light
								</Text>
								<Image
									source={icons.chevronRight}
									className="size-2 aspect-[calc(6/9)]"
									tintColor={"#BCC2CC"}
								/>
							</View>
	
						</TouchableOpacity>

						{/* Setting :: Notifications */}
						<TouchableOpacity
							className="w-full flex flex-row justify-between items-center"
							onPress={handleNotificationsPermissions}
						>
	
							<View className="flex flex-row items-center gap-x-4">
								<View className="bg-gray-200 size-9 rounded-md flex items-center justify-center">
									<Image
										source={icons.settingsNotifications}
										className="size-4"
										tintColor={"#000000"}
									/>
								</View>
								<Text className="text-black font-medium">
									Notifications
								</Text>
							</View>
							
							<View className="flex flex-row items-center gap-x-5">
								<Text className="text-gray-400 ">
									{ !notificationsEnabled ? "Disabled" : "Enabled" }
								</Text>
								<Image
									source={icons.chevronRight}
									className="size-2 aspect-[calc(6/9)]"
									tintColor={"#BCC2CC"}
								/>
							</View>
	
						</TouchableOpacity>

					</View>

				</View>
				{/* // Settings Category :: Preferences */}

				{/* Settings Category :: Social */}
				<View className="flex gap-y-5 mb-9">

					{/* Settings Category Heading */}
					<Text className="text-gray-400 text-sm font-medium tracking-wide">
						Social
					</Text>

					<View className="w-full flex gap-y-4">

						{/* Setting :: Share */}
						<TouchableOpacity
							className="w-full flex flex-row justify-between items-center"
							onPress={onShare}
						>
	
							<View className="flex flex-row items-center gap-x-4">
								<View className="bg-gray-200 size-9 rounded-md flex items-center justify-center">
									<Image
										source={icons.settingsSocial}
										className="size-4 aspect-[calc(46/50)]"
										tintColor={"#000000"}
									/>
								</View>
								<Text className="text-black font-medium">
									Share on social media
								</Text>
							</View>
							
							<Image
								source={icons.chevronRight}
								className="size-2 aspect-[calc(6/9)]"
								tintColor={"#BCC2CC"}
							/>
	
						</TouchableOpacity>

					</View>

				</View>
				{/* // Settings Category :: Social */}

				{/* Settings Category :: Account */}
				<View className="flex gap-y-5 mb-9">

					{/* Settings Category Heading */}
					<Text className="text-gray-400 text-sm font-medium tracking-wide">
						Account
					</Text>

					<View className="w-full flex gap-y-4">

						{/* Setting :: Feedback */}
						<TouchableOpacity
							className="w-full flex flex-row justify-between items-center"
							onPress={() => router.navigate('/settings/feedback')}
						>
	
							<View className="flex flex-row items-center gap-x-4">
								<View className="bg-gray-200 size-9 rounded-md flex items-center justify-center">
									<Image
										source={icons.settingsFeedback}
										className="size-4"
										tintColor={"#000000"}
									/>
								</View>
								<Text className="text-black font-medium">
									Feedback
								</Text>
							</View>
							
							<Image
								source={icons.chevronRight}
								className="size-2 aspect-[calc(6/9)]"
								tintColor={"#BCC2CC"}
							/>
	
						</TouchableOpacity>

						{/* Setting :: Log Out */}
						<TouchableOpacity
							className="w-full flex flex-row justify-between items-center"
							onPress={handleLogout}
						>
	
							<View className="flex flex-row items-center gap-x-4">
								<View className="bg-primary/20 size-9 rounded-md flex items-center justify-center">
									<Image
										source={icons.logout}
										className="size-4 aspect-[calc(50/54)]"
										tintColor={"#245A3F"}
									/>
								</View>
								<Text className="text-black font-medium">
									Log Out
								</Text>
							</View>
							
							<Image
								source={icons.chevronRight}
								className="size-2 aspect-[calc(6/9)]"
								tintColor={"#245A3F"}
							/>
	
						</TouchableOpacity>

					</View>

				</View>
				{/* // Settings Category :: Account */}
	
			</View>
	
		</ScrollView>
	)
}

export default Settings