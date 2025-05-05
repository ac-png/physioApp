import axios from "axios";
import { icons } from "constants/icons";
import { useAuth } from "context/AuthContext";
import { router, useFocusEffect } from "expo-router";
import { Session } from "interfaces/interfaces";
import { useCallback, useEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { getSessions } from "services/api";

export default function Index() {

    const { authState } = useAuth();
    const userName = authState?.user?.name;

    const [sessionsData, setSessionsData]= useState(null);
    const [sevenDayData, setSevenDayData]= useState<{ date: string; painLevel: number }[] | null>(null);
    const [sevenDaySessionData, setSevenDaySessionData]= useState<{ date: string; sessionsCompleted: number }[] | null>(null);

    function getSessionsProgress(sessions: { done: boolean }[]) {
        const completed = sessions.filter(session => session.done).length;
        const total = sessions.length;
        return { completed, total };
    }

    const getAveragePainLevel = (sessions: Session[]): string => {
        
        const completedSessions = sessions.filter(session => session.done === true);
        
        if (completedSessions.length === 0) {
            return "0";
        }

        const totalPainLevel = completedSessions.reduce((sum, session) => sum + session.painLevel, 0);
        const averagePainLevel = (totalPainLevel / completedSessions.length).toFixed(1);

        return averagePainLevel;

    };

    const getSevenDayPainData = (sessions: Session[]) => {
        const result: { date: string; painLevel: number }[] = [];

        for (let i = 6; i >= 0; i--) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setDate(currentDate.getDate() - i);

            const dateStr = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

            const sessionsForDay = sessions.filter(session => {
            if (!session.done || !session.exerciseDate) return false;

            const sessionDate = new Date(session.exerciseDate);
            sessionDate.setHours(0, 0, 0, 0);

            return sessionDate.getTime() === currentDate.getTime();
            });

            const averagePain =
            sessionsForDay.length > 0
                ? sessionsForDay.reduce((sum, s) => sum + s.painLevel, 0) / sessionsForDay.length
                : 0;

            result.push({
            date: dateStr,
            painLevel: parseFloat(averagePain.toFixed(1)),
            });
        }

        return result;

    };

    const getSevenDaySessionData = (sessions: Session[]) => {
        const result: { date: string; sessionsCompleted: number }[] = [];

        for (let i = 6; i >= 0; i--) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setDate(currentDate.getDate() - i);

            const dateStr = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

            const sessionsForDay = sessions.filter(session => {
            if (!session.done || !session.exerciseDate) return false;

            const sessionDate = new Date(session.exerciseDate);
            sessionDate.setHours(0, 0, 0, 0);

            return sessionDate.getTime() === currentDate.getTime();
            });

            result.push({
                date: dateStr,
                sessionsCompleted: sessionsForDay.length,
            });
        }

        return result;

    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
            const sessions = await getSessions();

            if (!sessions.error) {
                setSessionsData(sessions);
            }
            };

            fetchData();
        }, [])
    );

    useEffect(() => {

        if (sessionsData !== null) {
            setSevenDayData(getSevenDayPainData(sessionsData));
        }
        
    }, [sessionsData]);


    const sessionsProgress = sessionsData && Array.isArray(sessionsData)
        ? getSessionsProgress(sessionsData)
        : { completed: 0, total: 0 };

    const avgPainLevel = sessionsData && Array.isArray(sessionsData)
        ? getAveragePainLevel(sessionsData)
        : "0";


    return (           
        <SafeAreaView className="w-full pt-9 px-6">
        <ScrollView className="w-full pt-9 px-6" showsVerticalScrollIndicator={false}>

            {/* Welcome Text */}
            <View className="flex gap-y-1 mb-9">
                <Text className="text-black text-3xl font-bold tracking-wide">Welcome,</Text>
                <Text className="text-black text-3xl font-bold tracking-wide">{ userName?.split(" ")[0] ?? "" }</Text>
            </View>

            <View className="flex gap-y-6 mb-9">

                {/* Cards :: Summary */}
                <View className="flex flex-row mr-4 gap-x-4">

                    <View className="flex gap-y-4 py-6 px-4 w-1/2 border border-gray-300 rounded-md">
                        <Text className="text-gray-400">
                            Exercises{"\n"}Completed
                        </Text>
                        <View className="flex flex-row items-end gap-x-2">
                            <Text className="text-black text-4xl font-medium">{ sessionsProgress.completed }</Text>
                            <Text className="text-gray-400 text-2xl font-medium pb-1">/</Text>
                            <Text className="text-gray-400 text-2xl font-medium pb-1">{ sessionsProgress.total }</Text>
                        </View>
                    </View>

                    <View className="flex gap-y-4 py-6 px-4 w-1/2 border border-gray-300 rounded-md">
                        <Text className="text-gray-400">
                            Average{"\n"}Pain Level
                        </Text>
                        <View className="flex flex-row items-end gap-x-2">
                            <Text className="text-black text-4xl font-medium">{ avgPainLevel }</Text>
                            <Text className="text-gray-400 text-2xl font-medium pb-1">/</Text>
                            <Text className="text-gray-400 text-2xl font-medium pb-1">10</Text>
                        </View>
                    </View>

                </View>

                {/* Metrics :: Pain Levels */}
                <TouchableOpacity
                    className="w-full flex justify-between pt-6 pb-3 px-4 bg-pastel-green rounded-md h-56"
                    onPress={() => router.navigate('/metrics/pain-levels')}
                >
                    
                    <View className="flex flex-row justify-between gap-x-9">
                        <Text className="text-black text-xl font-bold tracking-wide">
                            Track{"\n"}Your{"\n"}Pain{"\n"}Levels
                        </Text>
                        <View className="flex justify-end">
                            <View className="z-10 flex flex-row gap-x-3 items-end">
                                {sevenDayData && sevenDayData.map((eachDataPoint, index) => (
                                    index === sevenDayData.length - 1 ? (
                                        <View
                                            key={`item-${index}`}
                                            className="min-h-2 w-3 bg-black rounded-t"
                                            style={{ height: eachDataPoint.painLevel * 8 || 8 }}
                                        />
                                    ) : (
                                        <View
                                            key={`item-${index}`}
                                            className="min-h-2 w-3 bg-pastel-highlight-green rounded-t"
                                            style={{ height: eachDataPoint.painLevel * 8 || 8 }}
                                        />
                                    )
                                ))}
                            </View>
                            <View className="z-0 absolute h-full w-full flex justify-evenly">
                                <View className="w-full h-px bg-primary/10" />
                                <View className="w-full h-px bg-primary/10" />
                            </View>
                            <View className="w-full h-px bg-primary/10" />
                        </View>
                    </View>

                    <View className="gap-y-3">
                        <View className="border border-black w-full" />
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-black text-sm font-medium">See more</Text>
                            <Image
                                source={icons.chevronRight}
                                className="size-2 aspect-[calc(6/9)]"
                                tintColor="#000000"
                            />
                        </View>
                    </View>
                    
                </TouchableOpacity>

                {/* Metrics :: Completed Reps */}
                <TouchableOpacity
                    className="w-full flex justify-between pt-6 pb-3 px-4 bg-pastel-purple rounded-md h-56"
                    onPress={() => router.navigate('/metrics/reps-completed')}
                >
                    
                    <View className="flex flex-row justify-between">
                        <Text className="text-black text-xl font-bold tracking-wide">
                            How{"\n"}Many{"\n"}Tasks{"\n"}Done?
                        </Text>
                        <View className="flex justify-end">
                            <View className="z-10 flex flex-row gap-x-3 items-end">
                                {sevenDayData && sevenDayData.map((eachDataPoint, index) => (
                                    index === sevenDayData.length - 1 ? (
                                        <View
                                            key={`item-${index}`}
                                            className="min-h-2 w-3 bg-black rounded-t"
                                            style={{ height: eachDataPoint.painLevel * 8 || 8 }}
                                        />
                                    ) : (
                                        <View
                                            key={`item-${index}`}
                                            className="min-h-2 w-3 bg-pastel-highlight-purple rounded-t"
                                            style={{ height: eachDataPoint.painLevel * 8 || 8 }}
                                        />
                                    )
                                ))}
                            </View>
                            <View className="z-0 absolute h-full w-full flex justify-evenly">
                                <View className="w-full h-px bg-primary/10" />
                                <View className="w-full h-px bg-primary/10" />
                            </View>
                            <View className="w-full h-px bg-primary/10" />
                        </View>
                    </View>

                    <View className="gap-y-3">
                        <View className="border border-black w-full" />
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-black text-sm font-medium">See more</Text>
                            <Image
                                source={icons.chevronRight}
                                className="size-2 aspect-[calc(6/9)]"
                                tintColor="#000000"
                            />
                        </View>
                    </View>
                    
                </TouchableOpacity>

            </View>

        </ScrollView>
        </SafeAreaView>
    );
}
