import { Redirect, Stack } from "expo-router";

export default function LoggedOutLayout() {

    return <Stack>
        <Stack.Screen
            name="login"
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="onboarding"
            options={{ headerShown: false }}
        />
    </Stack>;
}
