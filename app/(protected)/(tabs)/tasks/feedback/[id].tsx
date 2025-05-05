import { FormButton } from 'components/FormButton'
import { FormPageHeader } from 'components/FormPageHeader'
import { FormPageView } from 'components/FormPageView'
import { FormSelectField } from 'components/FormSelectField'
import { PainLevelsSlider } from 'components/PainLevelSlider'
import { TextAreaField } from 'components/TextAreaField'
import { router, useLocalSearchParams } from 'expo-router'
import { Session } from 'interfaces/interfaces'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { getSessionById, updateSession } from 'services/api'
import { arrayRange } from 'services/numberHelpers'

const TaskFeedback = () => {

	const { id } = useLocalSearchParams();
	const sessionId = Number(id);

	const [sessionData, setSessionData]= useState<Session | null>(null);
	
	const [repsTarget, setRepsTarget]= useState<number>(0);
	const [repsCompleted, setRepsCompleted]= useState<number>(0);
	const [repsLabel, setRepsLabel]= useState<string>("0");
	
	const [setsTarget, setSetsTarget]= useState<number>(0);
	const [setsCompleted, setSetsCompleted]= useState<number>(0);
	const [setsLabel, setSetsLabel]= useState<string>("0");
	
	const [painLevel, onChangePainLevel]= useState<number>(0);
	const [feedbackNotes, onChangeFeedbackNotes]= useState<string>("");

	useEffect(() => {
	
		const fetchSession = async () => {
			const session = await getSessionById(sessionId);

			if (session !== null && !('error' in session)) {
				if (session.done) {
					router.replace('/tasks');
				}
				setSessionData(session);
			}
		};

		fetchSession();
		
	}, []);

	const noValueData = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10
	]

	const getArrayValues = (inputValue: number) => {

		if (inputValue > 0) {

			const start = inputValue - inputValue;
			const end = inputValue + inputValue;
			const result = arrayRange(start, end, 1);

			return result;

		} else {
			return noValueData;
		}

	}

	useEffect(() => {

		if (sessionData) {

			// Get target reps value
			const repsValue = Number(sessionData.exercise.reps);

			if (isNaN(repsValue)) {
				setRepsTarget(0);
				setRepsLabel(sessionData.exercise.reps);
			} else {
				setRepsTarget(Math.round(repsValue));
				setRepsLabel(repsValue.toString());
			}

			// Get target sets value
			const setsValue = Number(sessionData.exercise.sets);

			if (isNaN(setsValue)) {
				setSetsTarget(0);
				setSetsLabel(sessionData.exercise.sets);
			} else {
				setSetsTarget(Math.round(setsValue));
				setSetsLabel(repsValue.toString());
			}

		}	
		
	}, [sessionData]);

	const submitFeedback = async () => {

		let completed;

		if (repsCompleted && setsCompleted) {
			completed = JSON.stringify({repsCompleted, setsCompleted})
		} else {
			completed = JSON.stringify({repsCompleted: 0, setsCompleted: 0})
		}

		const notes = completed.concat("\n", feedbackNotes.toString())

		try {

			const submit: { error: boolean; msg: string } =
				await updateSession({
					id: sessionId,
					done: true,
					painLevel,
					feedback: notes
			});

			if (submit.error) {
				alert(`Error: Feedback not submitted - ${submit.msg}`);
			} else {
				alert (submit.msg);
				router.replace('/tasks');
			}

		} catch {

			alert("Error: Feedback not submitted");

		}

	}

	return (
		<ScrollView>
		<SafeAreaView>
			
			<FormPageHeader
				backPageName="Tasks"
				backPageURI="tasks"
				headerText="Session Feedback"
				descriptionText=""
				descriptionVisible={false}
			/>
	
			<View className="w-full py-9 px-6">
				<FormPageView>
				
					<View className="flex flex-row items-center">
						<View className="w-1/2 pr-2">
							<FormSelectField
								labelText="Reps"
								selectData={getArrayValues(repsTarget)}
								onSelect={(selectedItem:any, index:number) => {
									setRepsCompleted(Math.round(Number(selectedItem)));
								}}
								innerLabelRightText={`/  ${repsLabel}`}
								innerLabelRightVisible
							/>
						</View>
						<View className="w-1/2 pl-2">
							<FormSelectField
								labelText="Sets"
								selectData={getArrayValues(setsTarget)}
								onSelect={(selectedItem:any, index:number) => {
									setSetsCompleted(Math.round(Number(selectedItem)));
								}}
								innerLabelRightText={`/  ${setsLabel}`}
								innerLabelRightVisible
							/>
						</View>
					</View>

					<PainLevelsSlider
						onChangeLevel={onChangePainLevel}
					/>

					<TextAreaField
						placeholder=". . ."
						value={onChangeFeedbackNotes}
						onChangeText={onChangeFeedbackNotes}
						numberOfLines={6}
						maxLength={240}
						labelText="Notes"
						labelVisible
					/>
				
					<FormButton
						text="Submit"
						onPress={submitFeedback}
					/>
				
				</FormPageView>
			</View>
		
		</SafeAreaView>
		</ScrollView>
	)
}

export default TaskFeedback