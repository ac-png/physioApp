import { FormButton } from 'components/FormButton'
import { FormPageHeader } from 'components/FormPageHeader'
import { FormPageView } from 'components/FormPageView'
import { FormSelectField } from 'components/FormSelectField'
import { PainLevelsSlider } from 'components/PainLevelSlider'
import { TextAreaField } from 'components/TextAreaField'
import { router, useLocalSearchParams } from 'expo-router'
import { Session } from 'interfaces/interfaces'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getSessionById, updateSession } from 'services/api'

const TaskFeedback = () => {

	const { id } = useLocalSearchParams();
	const sessionId = Number(id);

	const [sessionData, setSessionData]= useState<Session | null>(null);
	const [repsCompleted, setRepsCompleted]= useState<number>(0);
	const [setsCompleted, setSetsCompleted]= useState<number>(0);
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

	// There's no integer reps / sets values from the API right now
	const exampleData = [
		1,
		2,
		3,
		4,
		5,
		6
	]

	const submitFeedback = async () => {

		try {

			const submit: { error: boolean; msg: string } =
				await updateSession({
					id: sessionId,
					done: true,
					painLevel,
					feedback: feedbackNotes
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
								selectData={exampleData}
								onSelect={(selectedItem:any, index:number) => {
									console.log("Select changed")
								}}
								innerLabelRightText="/  3"
								innerLabelRightVisible
							/>
						</View>
						<View className="w-1/2 pl-2">
							<FormSelectField
								labelText="Sets"
								selectData={exampleData}
								onSelect={(selectedItem:any, index:number) => {
									console.log("Select changed")
								}}
								innerLabelRightText="/  3"
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
	
		</ScrollView>
	)
}

export default TaskFeedback