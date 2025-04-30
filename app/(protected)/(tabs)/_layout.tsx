import { Tabs } from "expo-router"
import { Image, View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { icons } from "constants/icons"


const _Layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: 64,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 14
            },
            tabBarStyle: {
                height: 64,
                backgroundColor: '#FFFFFF',
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => {

                    if (focused) { return (
                        <View className="flex items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.home}
                                    className="size-6 aspect-[calc(54/48)]"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-full text-black text-[10px] font-semibold truncate">
                                    Home
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-pastel-green w-10 h-10 rounded-full" />
                        </View>
                    )} else { return (
                        <View className="flex items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.home}
                                    className="size-6 aspect-[calc(54/48)]"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-full text-black text-[10px] font-semibold truncate">
                                    Home
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-white w-10 h-10 rounded-full" />
                        </View>
                    )}
                    
                }
            }}
        />
        <Tabs.Screen
            name="metrics/pain-levels"
            options={{
                title: 'Metrics : Pain Levels',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="metrics/reps-completed"
            options={{
                title: 'Metrics : Reps Completed',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="tasks/index"
            options={{
                title: 'Tasks',
                headerShown: false,
                tabBarIcon: ({ focused }) => {

                    if (focused) { return (
                        <View className="flex items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.tasks}
                                    className="size-6 aspect-[calc(54/48)]"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-full text-black text-[10px] font-semibold truncate">
                                    Tasks
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-pastel-green w-10 h-10 rounded-full" />
                        </View>
                    )} else { return (
                        <View className="flex items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.tasks}
                                    className="size-6 aspect-[calc(54/48)]"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-full text-black text-[10px] font-semibold truncate">
                                    Tasks
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-white w-10 h-10 rounded-full" />
                        </View>
                    )}   
                    
                }
            }}
        />
        
        <Tabs.Screen
            name="tasks/[id]"
            options={{
                title: 'Each Task',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="tasks/feedback/[id]"
            options={{
                title: 'Each Task',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="program/index"
            options={{
                title: 'My Program',
                headerShown: false,
                tabBarIcon: ({ focused }) => {

                    if (focused) { return (
                        <View className="flex items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.program}
                                    className="size-6 aspect-square"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-16 text-center text-black text-[10px] font-semibold truncate">
                                    Program
                                </Text>
                            </View>
                            <View className="z-0 absolute bottom-0.5 bg-pastel-green w-10 h-10 rounded-full" />
                        </View>
                    )} else { return (
                        <View className="flex items-center justify-center">
                            <View className="z-10 flex-0 items-center gap-y-1.5">
                                <Image
                                    source={icons.program}
                                    className="size-6 aspect-square"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-16 text-center text-black text-[10px] font-semibold">
                                    Program
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-white w-10 h-10 rounded-full" />
                        </View>
                    )}   
                    
                }
            }}
        />
        <Tabs.Screen
            name="program/[id]"
            options={{
                title: 'Each Program',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="appointments"
            options={{
                title: 'Appointments',
                headerShown: false,
                tabBarIcon: ({ focused }) => {

                    if (focused) { return (
                        <View className="flex mt-3 items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.appointments}
                                    className="size-6 aspect-square"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-20 text-center text-black text-[10px] font-semibold truncate">
                                    Appointments
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-pastel-green w-10 h-10 rounded-full" />
                        </View>
                    )} else { return (
                        <View className="flex mt-3 items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.appointments}
                                    className="size-6 aspect-square"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-20 text-center text-black text-[10px] font-semibold">
                                    Appointments
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-white w-10 h-10 rounded-full" />
                        </View>
                    )}   
                    
                }
            }}
        />
        <Tabs.Screen
            name="settings/index"
            options={{
                title: 'Settings',
                headerShown: false,
                tabBarIcon: ({ focused }) => {

                    if (focused) { return (
                        <View className="flex mt-3 items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.settings}
                                    className="size-6 aspect-square"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-16 text-center text-black text-[10px] font-semibold">
                                    Settings
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-pastel-green w-10 h-10 rounded-full" />
                        </View>
                    )} else { return (
                        <View className="flex mt-3 items-center justify-center">
                            <View className="z-10 items-center gap-y-1.5">
                                <Image
                                    source={icons.settings}
                                    className="size-6 aspect-square"
                                    tintColor={"#000000"}
                                />
                                <Text className="w-16 text-center text-black text-[10px] font-semibold">
                                    Settings
                                </Text>
                            </View>
                            <View className="z-0 absolute -bottom-0.5 bg-white w-10 h-10 rounded-full" />
                        </View>
                    )}   
                    
                }
            }}
        />
        <Tabs.Screen
            name="settings/edit"
            options={{
                title: 'Edit Profile',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="settings/program"
            options={{
                title: 'Program Settings',
                headerShown: false,
                href: null
            }}
        />
        <Tabs.Screen
            name="settings/feedback"
            options={{
                title: 'Feedback',
                headerShown: false,
                href: null
            }}
        />
    </Tabs>
  )
}

export default _Layout