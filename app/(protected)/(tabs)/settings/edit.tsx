import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { FormButton } from 'components/FormButton'
import { FormPageHeader } from 'components/FormPageHeader'
import { FormPageView } from 'components/FormPageView'
import { TextAreaField } from 'components/TextAreaField'
import { TextInputField } from 'components/TextInputField'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { getPatient, updatePatient } from 'services/api'
import { User } from 'interfaces/interfaces'

const Edit = () => {

	const [userData, setUserData]= useState<User | null>(null);
	const [mobileNumber, onChangeMobileNumber]= useState<number>(0);
	const [address, onChangeAddress]= useState<string>("");

	useEffect(() => {
	
		const fetchData = async () => {
			const user = await getPatient();

			if (!user.error) {
				setUserData(user);
				onChangeMobileNumber(user.phone);
				onChangeAddress(user.address || "");
			}
		};

		fetchData();
		
	}, []);

	const saveProfile = async () => {

		try {

			const submit: { error: boolean; msg: string } =
				await updatePatient({
					id: 1,
					phone: "1234",
					address,
					allowNotifications: true,
			});

			if (submit.error) {
				alert(`Error: Feedback not submitted - ${submit.msg}`);
			} else {
				alert (submit.msg);
				router.replace('/settings');
			}

		} catch {

			alert("Error: Feedback not submitted");

		}

	}

	return (
		<ScrollView>
		<SafeAreaView>
			
			<FormPageHeader
				backPageName="Settings"
				backPageURI="settings"
				headerText="Edit Profile"
				descriptionText=""
				descriptionVisible={false}
			/>

			<View className="w-full py-9 px-6">
				<FormPageView>
	
					<TextInputField
						placeholder="Alice Walker"
						value=""
						onChangeText={undefined}
						keyboardType="default"
						autoComplete="off"
						labelText="Full Name"
						labelVisible
						isDisabled
					/>

					<TextInputField
						placeholder="alice.walker@patient.ie"
						value=""
						onChangeText={undefined}
						keyboardType="default"
						autoComplete="off"
						labelText="Email Address"
						labelVisible
						isDisabled
					/>

					<TextInputField
						placeholder="555-100-2001"
						value={ String(mobileNumber) }
						onChangeText={onChangeMobileNumber}
						keyboardType="number-pad"
						autoComplete="tel"
						labelText="Mobile Number"
						labelVisible
						isDisabled={false}
					/>

					<TextAreaField
						placeholder="12 Garden Lane, Roseville"
						value={ String(address) }
						onChangeText={onChangeAddress}
						numberOfLines={6}
						maxLength={240}
						labelText="Address"
						labelVisible
					/>
		
					<FormButton
						text="Save"
						onPress={saveProfile}
					/>
	
				</FormPageView>
			</View>

		</SafeAreaView>
		</ScrollView>
	)
}

export default Edit
