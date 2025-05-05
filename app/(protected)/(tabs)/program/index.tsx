import { router } from 'expo-router'
import { Program } from 'interfaces/interfaces';
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { getProgrammes } from 'services/api'

const MyProgram= () => {

	const [programData, setProgramData]= useState<Program[] | null>(null);

	// Fetch programmes data from the API
	useEffect(() => {
		const fetchData = async () => {
			const result = await getProgrammes();

			if (Array.isArray(result)) {
				setProgramData(result);
			} else {
				alert(`Failed to fetch program: ${result.msg}`);
				setProgramData(null);
			}

			console.log(result)
		};

		fetchData();
	}, []);

	return (
		<View>

			<View className="bg-pastel-green w-full py-9 px-6 flex gap-y-9 items-start justify-start">

				{/* Header Text */}
				<SafeAreaView className="">
					<Text className="mb-3 text-black text-3xl font-bold tracking-wide">
						My Program
						</Text>
					<Text className="text-black">
						Browse the exercises set by your physios
					</Text>
				</SafeAreaView>
		
			</View>

			<ScrollView
				className="w-full flex flex-grow px-6 pt-0 pb-9 mt-9"
				showsVerticalScrollIndicator={false}
			>
				<View className="flex gap-y-9">

					{programData?.map(eachProgram => (
					<View className="flex gap-y-3" key={eachProgram.id}>
						<Text className="text-black text-xl font-bold">{eachProgram.name}</Text>
						<TouchableOpacity
							className="bg-white border border-gray-200 rounded-md
										px-5 py-6 flex gap-y-4"
							onPress={() => router.navigate(`/program/${eachProgram.id}`)}
						>
							<View className="flex gap-y-3">
								{eachProgram.exerciseCategories.map(eachCategory => (
								<View
									className="bg-gray-100/60 rounded-md p-3"
									key={eachCategory.id}
								>
									<Text className="text-lg font-bold mb-1">
										{eachCategory.name}
									</Text>
									{(() => {
										const uniqueExercises = Array.from(
											new Map(eachCategory.exercises.map(e => [e.id, e])).values()
										);

										return (
											<View>
											{uniqueExercises.map(eachExercise => (
												<Text key={eachExercise.id}>• {eachExercise.name}</Text>
											))}
											</View>
										);
									})()}
								</View>
								))}
							</View>
							<View
								className="gap-y-4"
							>
								<View className="bg-gray-300 h-px w-full" />
								<View className="flex flex-row justify-between items-center">
									<Text className="text-black font-medium">
										{eachProgram.author}
									</Text>
									<Text className="text-gray-400">
										{eachProgram.duration} Days
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					))}

				</View>
	
			</ScrollView>



		</View>
	)
}

export default MyProgram