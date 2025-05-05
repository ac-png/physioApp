import { icons } from 'constants/icons'
import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Session } from 'interfaces/interfaces';
import React, { useCallback, useEffect, useState } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { getSessions } from 'services/api';
import { headerDate } from 'services/dateHelpers'
import { getTodaysSessions } from 'services/sessionsHelper';


const Tasks = () => {

	const todaysDate = new Date();
	const [sessionsData, setSessionsData]= useState(null);

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

	type GroupedSessionsProps = {
		[categoryId: number]: {
			categoryName: string;
			sessions: Session[];
		};
	};

	const groupSessionsByCategoryId = (sessions: Session[]): GroupedSessionsProps => {

		return sessions.reduce((groups: GroupedSessionsProps, session: Session) => {
			
			const categoryId = session.exerciseCategory.id;
			const categoryName = session.exerciseCategory.name;

			if (!groups[categoryId]) {
				groups[categoryId] = {
					categoryName,
					sessions: []
				};
			}

			groups[categoryId].sessions.push(session);

			return groups;

		}, {});
	};

	let groupedByCategoryId: GroupedSessionsProps = {};

	if (sessionsData !== null) {
		
		const todaysSessions = getTodaysSessions(sessionsData);
		groupedByCategoryId = groupSessionsByCategoryId(todaysSessions);

	}

	// Calculate a user's unbroken streak of completing (any number of) tasks per day
	// If they have no tasks to complete in a day their streak should remain active
	const calculateStreak = (sessionsData: Session[]): number => {

		if (!sessionsData) return 0;

		// Step 1: Group all sessions by date
		const sessionsByDate: { [date: string]: Session[] } = {};

		sessionsData.forEach(session => {
			const sessionDate = new Date(session.exerciseDate);
			const formattedDate = sessionDate.toISOString().split('T')[0];

		if (!sessionsByDate[formattedDate]) {
			sessionsByDate[formattedDate] = [];
			}
			sessionsByDate[formattedDate].push(session);
		});

		let streak = 0;
		const currentDate = new Date();

		// Keep going back day by day
		while (true) {
			const formattedDate = currentDate.toISOString().split('T')[0];
			const sessions = sessionsByDate[formattedDate];

			if (!sessions) {
			// No sessions scheduled for that day => streak continues
			streak++;
			} else {
			const anyDone = sessions.some(session => session.done);

			if (anyDone) {
				// At least one session completed => streak continues
				streak++;
			} else {
				// Sessions scheduled but none done => streak breaks
				break;
			}
			}

			// Move to prev day
			currentDate.setDate(currentDate.getDate() - 1);
		}

		return streak;

	};

	const streak = sessionsData ? calculateStreak(sessionsData) : 0

	return (
		<SafeAreaView className='h-screen'>
	
			<View className="bg-pastel-green w-full pt-9 px-6 flex gap-y-9 items-start justify-start">
				
				{/* Header Text */}
				<View className="">
					<Text className="mb-3 text-black text-3xl font-bold tracking-wide">
						Today's Tasks
						</Text>
					<Text className="text-black">
						{ headerDate(todaysDate) }
					</Text>
				</View>

				{/* Streak Card */}
				<View className="w-full -mb-10 px-5 bg-primary rounded-md h-24 flex flex-row items-center gap-x-4">
					<Image
						source={icons.flame}
						className="size-7 aspect-[calc(46/50)]"
						tintColor={"#FFFFFF"}
					/>
					<View className="bg-white w-px h-10" />
					<View className="flex-shrink">
						<Text className="text-white text-xs font-medium tracking-wide">
							{ streak } Day Streak
						</Text>
						<Text className="text-white">
							Complete your tasks every day to build a streak
						</Text>
					</View>
				</View>

			</View>

			<ScrollView
				className="w-full flex flex-grow px-6 py-9 mt-9"
				showsVerticalScrollIndicator={false}
			>
	
				{ groupedByCategoryId !== null ? Object.entries(groupedByCategoryId).map(([categoryId, { categoryName, sessions }]) => (
				<View key={categoryId} className="flex gap-y-5">

					{/* Exercise Category Heading */}
					<Text className="text-gray-400 text-sm font-medium tracking-wide">
						{categoryName}
					</Text>

					<View className="w-full flex gap-y-3">

					{sessions.map(session => (
						<TouchableOpacity
							className="bg-white flex flex-row justify-between items-center px-4 py-5 rounded-md border border-gray-300"
							onPress={() => router.navigate(`/tasks/${session.id}`)}
							key={session.id}
						>
						
							<View className="flex flex-row gap-x-4 items-center">
								<View className="bg-primary/20 size-9 rounded-md" />
								<View>
									<Text className="text-black font-bold mb-0.5">
										{ session.exercise.name }
									</Text>
									<View className="flex flex-row gap-x-3">
										<Text className="text-black text-sm">
											Reps: { session.exercise.reps }
										</Text>
										<Text className="text-black text-sm">
											Sets: { session.exercise.sets }
										</Text>
									</View>
								</View>
							</View>

							{session.done ? (
								<TouchableOpacity
									className="bg-black size-9 rounded-2xl flex items-center justify-center"
									// onPress={} Link
								>
									<Image
										source={icons.tasksCheckmark}
										className="size-3 aspect-square"
										tintColor={"#FFFFFF"}
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
								className="bg-white border border-gray-300 size-9 rounded-2xl flex items-center justify-center"
								onPress={() => router.navigate(`/tasks/feedback/${session.id}`)}
								>
									<Image
										source={icons.tasksCheckmark}
										className="hidden size-3 aspect-square"
										tintColor={"#FFFFFF"}
									/>
								</TouchableOpacity>
							)}
							
						</TouchableOpacity>
					))}

					</View>

					

				</View>
				)) : 
				
				<Text>Here!</Text>
				
				}
	
			</ScrollView>

			<StatusBar translucent={false} backgroundColor="#CEEACA" />
	
		</SafeAreaView>
	)
}

export default Tasks