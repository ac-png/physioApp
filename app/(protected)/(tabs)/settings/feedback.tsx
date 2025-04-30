import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { FormPageHeader } from 'components/FormPageHeader'
import { FormPageView } from 'components/FormPageView'
import { FormButton } from 'components/FormButton'
import { TextAreaField } from 'components/TextAreaField'

const Feedback = () => {
	return (
	<ScrollView>
		
		<FormPageHeader
			backPageName="Settings"
			backPageURI="settings"
			headerText="Feedback"
			descriptionText="Your feedback will help us improve our app.. Let us know about any new features you would like to see."
			descriptionVisible={true}
		/>

		<View className="w-full py-9 px-6">
			<FormPageView>

			<TextAreaField
				placeholder=". . ."
				value=""
				onChangeText={console.log("TextArea changed")}
				numberOfLines={6}
				maxLength={240}
				labelText=""
				labelVisible={false}
			/>

			<FormButton
				text="Submit"
				onPress={() => {alert("Error: BACKEND_URL invalid")}}
			/>

			</FormPageView>
		</View>

	</ScrollView>
	)
}

export default Feedback