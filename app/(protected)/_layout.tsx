import { useAuth } from "context/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
    const { authState, onLogOut } = useAuth();

    if (!authState?.authenticated) {

        console.log('not authenticated!', authState?.authenticated)
        return <Redirect href="/account/onboarding" />
        
    } else {

        return <Stack>
        <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
        />
    </Stack>;

    }

    
}
