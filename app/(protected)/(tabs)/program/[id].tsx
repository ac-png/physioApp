import { FormPageHeader } from 'components/FormPageHeader'
import { useLocalSearchParams } from 'expo-router';
import { Program } from 'interfaces/interfaces';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { getProgrammes } from 'services/api';

const EachProgram = () => {

	const { id } = useLocalSearchParams();
	const programId = Number(id);

	const [programData, setProgramData]= useState<Program[] | null>(null);
	const [eachProgram, setEachProgram]= useState<Program | null>(null);
	
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

	useEffect(() => {
		if (programId && programData !== null) {

			const foundProgram = programData.find((program: { id: number; }) => program.id === programId);
			setEachProgram(foundProgram || null);

		}
		}, [programId, programData]);

	return (
		<ScrollView>
						
			<FormPageHeader
				backPageName="My Program"
				backPageURI="program"
				headerText="Exercises"
				descriptionText={eachProgram?.name.toString() || ""}
				descriptionVisible
			/>

			<ScrollView
				className="w-full flex flex-grow px-6 pt-0 pb-9 mt-9"
				showsVerticalScrollIndicator={false}
			>
				<View className="flex gap-y-9">
					{eachProgram?.exerciseCategories.map(eachCategory => (
					<View className="flex gap-y-6" key={eachCategory.id}>
						<Text className="text-black text-xl font-medium">
							{ eachCategory.name }
						</Text>
						<View className="">
						{(() => {
							const uniqueExercises = Array.from(
								new Map(eachCategory.exercises.map(e => [e.id, e])).values()
							);

							return (
								<View className="flex gap-y-3">
								{uniqueExercises.map(eachExercise => (
									<View 
										className="bg-white border border-gray-300 rounded-md py-5 px-4 gap-y-1"
										key={eachExercise.id}
									>
										<Text className="text-black font-bold mb-1">{eachExercise.name}</Text>
										<Text>
											<Text className="text-sm font-medium">Reps: </Text>
											<Text className="text-sm">{eachExercise.reps}</Text>
										</Text>
										<Text>
											<Text className="text-sm font-medium">Sets: </Text>
											<Text className="text-sm">{eachExercise.sets}</Text>
										</Text>
										<Text>
											<Text className="text-sm font-medium">Frequency: </Text>
											<Text className="text-sm">{eachExercise.frequency}</Text>
										</Text>
										<Text>
											<Text className="text-sm font-medium">Rest: </Text>
											<Text className="text-sm">{eachExercise.rest}</Text>
										</Text>
									</View>
								))}
								</View>
							);
						})()}
						</View>
					</View>
					))}
				</View>

		</ScrollView>

		</ScrollView>
	)
}

export default EachProgram