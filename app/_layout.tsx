import { AuthProvider } from "context/AuthContext";
import { Stack } from "expo-router";
import "../global.css";
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from "expo-status-bar";
import React from "react";

SystemUI.setBackgroundColorAsync("#FFFFFF");

export default function RootLayout() {
    return <AuthProvider>
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor: "#FFFFFF",
                },
            }}
        >
            <Stack.Screen
                name="(protected)"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="account"
                options={{ headerShown: false }}
            />
        </Stack>
    </AuthProvider>;
}