import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";

// SplashScreen.preventAutoHideAsync();

interface AuthProps {
    authState?: {
        token: string | null;
        authenticated: boolean | null;
        user: { name: string; email: string } | null;
    };
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogOut?: () => Promise<any>;
}

const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'user-info';
const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        user: { name: string; email: string } | null;
    }>({
        token: null,
        authenticated: null,
        user: null
    })

    useEffect(() => {
        const loadToken = async () => {

            const token = await SecureStore.getItemAsync(TOKEN_KEY);        
            const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);        
            const userInfo = await SecureStore.getItemAsync(USER_KEY);        
           
            if (token && refreshToken && userInfo) {
                
                setAuthState({
                    // eslint-disable-next-line object-shorthand
                    token: token,
                    authenticated: true,
                    user: JSON.parse(userInfo)
                });

                console.log("jwt loaded from: ", token, " | refresh from:", refreshToken)
                
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            }
            

        }
        loadToken();
    }, [])

    const login = async (email:string, password:string) => {
        try {

            // const response = await fetch(`${BASE_URL}/login`, {
            //     method: "POST",
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({ email, password })
            // });

            // const data = await response.json();

            const response = await axios.post(`${BASE_URL}/login`, {email, password});

            const { accessToken, refreshToken } = response.data

            // Set global headers to use token
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

            const userResponse = await axios.get(`${BASE_URL}/api/Patient/me`);
            const { name, email: userEmail } = userResponse.data;
 
            setAuthState({
                token: accessToken,
                authenticated: true,
                user: {
                    // eslint-disable-next-line object-shorthand
                    name: name,
                    email: userEmail
                }
            })       

            await SecureStore.setItemAsync(TOKEN_KEY, accessToken)
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify({ name, email: userEmail }));

            return response;

        } catch (err) {

            console.log(err, "login error")

            return { error: true, msg: (err as any).response.data.msg}

        } finally {

        }
    }

    const refreshAccessToken = async () => {
        
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            return null;
        }

        try {

            const response = await axios.post(`${BASE_URL}/refresh`, { refreshToken });
            const { accessToken } = response.data;

            // Update the access token in Secure Store
            await SecureStore.setItemAsync(TOKEN_KEY, accessToken);

            // Update the global headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            return accessToken;

        } catch (err) {

            console.log('Error refreshing accessToken:', err);

            return null;

        }

    };

    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            // Check if the error is due to an expired token (status 401)
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                // Try to refresh the token
                const newAccessToken = await refreshAccessToken();

                if (newAccessToken) {
                    // Retry the original request with the new token
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                }

                // Else, if refresh failed, log out the user
                await logout();
            }

            return Promise.reject(error);
        }
    );

    const logout = async () => {

        // Delete JWT token from Local Store
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
            user: null
        });
    }

    const value = {
        onLogin: login,
        onLogOut: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}