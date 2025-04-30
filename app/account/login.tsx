import axios from 'axios'
import { EmailInputField } from 'components/EmailInputField'
import { OnboardingButton } from 'components/OnboardingButton'
import { OnboardingPolicies } from 'components/OnboardingPolicies'
import { PasswordInputField } from 'components/PasswordInputField'
import { useAuth } from 'context/AuthContext'
import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Login = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const { onLogin, authState } = useAuth();

    const login = async () => {
        const response = await onLogin!(email, password);
        if (response.error) {
            alert(response.msg)
        } else {
            return <Redirect href="/" />
        }
    }

    if (authState?.authenticated === true) {
        return <Redirect href="/" />
    }
                                                               
    return (
        <View className='h-screen'>

            <View className="bg-pastel-green w-full h-[190px] p-6 flex items-start justify-end">
                <View>
                    <Text className="mb-0.5 text-black text-3xl font-bold tracking-wide">Sign in to your</Text>
                    <Text className="mb-3 text-black text-3xl font-bold tracking-wide">Account</Text>
                    <Text className="text-black">Check your email</Text>
                </View>
            </View>

            <View className="w-full flex flex-grow justify-between">

                <View className="w-full px-6 pt-12">
                    <View className="w-full flex gap-y-6">
                        <EmailInputField
                            placeholder="alice.walker@patient.ie"
                            labelText="Email Address"
                            labelVisible
                            onChangeText={(text: string) => SetEmail(text)}
                        />
                        <PasswordInputField
                            labelText="Password"
                            labelVisible
                            onChangeText={(text: string) => SetPassword(text)}
                        />
                        <TouchableOpacity
                            className="bg-black w-full h-12 rounded-md flex items-center justify-center"
                            onPress={login}
                        >
                            <Text className="text-white text-lg">Log In</Text>
                        </TouchableOpacity>
                        {/* <OnboardingButton onPress={login} title="Log In" /> */}
                    </View>
                </View>

                <OnboardingPolicies />

            </View>

        </View>
        
    )
}

export default Login