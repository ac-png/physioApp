import axios from 'axios';
import { FormButton } from 'components/FormButton';
import { icons } from 'constants/icons';
import { useEvent } from 'expo';
import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Session } from 'interfaces/interfaces';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { getSessions } from 'services/api';
import { getTodaysSessions } from 'services/sessionsHelper';

const EachTask = () => {

  	const { id } = useLocalSearchParams();
	
	const [sessionsData, setSessionsData]= useState<Session[] | null>(null);
	const [eachSession, setEachSession]= useState<Session | null>(null);
	const [sessionIndex, setSessionIndex] = useState<number | null>(null);
	const [totalSessions, setTotalSessions] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			const sessions = await getSessions();

			if (!sessions.error) {
				setSessionsData(sessions);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (id && sessionsData !== null) {

			const sessionId = Number(id);

			const foundSession = sessionsData.find((session: { id: number; }) => session.id === sessionId);
			setEachSession(foundSession || null);

			const todaysSessions = getTodaysSessions(sessionsData);
			setTotalSessions(todaysSessions.length);

			const index = todaysSessions.findIndex((session) => session.id === sessionId);
			setSessionIndex(index !== -1 ? index + 1 : null);

		}
	}, [id, sessionsData]);

	let videoSource = "";

	if (eachSession !== null && eachSession.exercise.videoUrl !== null) {
		videoSource = eachSession.exercise.videoUrl
	}

 	const player = useVideoPlayer(videoSource, player => {
		player.loop = true;
		player.play();
	});

	const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

	console.log(player)

  
	return (
		<ScrollView className="h-screen">

			<View className="bg-pastel-green w-full pt-9 px-6 flex gap-y-9 items-start justify-start">
							
				{/* Header Text */}
				<View className="w-full items-center flex gap-y-4">
					<View className="w-full flex flex-row justify-between items-center">
						
						{/* Previous Task Button */}
						<TouchableOpacity
							className="size-4 aspect-square"
							// onPress={}
						>
							<Image
								source={icons.chevronLeft}
								className="size-3 aspect-[calc(6/9)]"
								tintColor={"#000000"}
							/>
						</TouchableOpacity>
						
						{/* Current Task Index */}
						<Text className="text-black font-medium text-center">
							Exercise { sessionIndex || "?" } of { totalSessions }
						</Text>

						{/* Next Task Button */}
						<TouchableOpacity
							className="size-4 aspect-square"
							// onPress={}
						>
							<Image
								source={icons.chevronRight}
								className="size-3 aspect-[calc(6/9)]"
								tintColor={"#000000"}
							/>
						</TouchableOpacity>

					</View>
					<Text className="mb-3 text-black text-center text-3xl font-bold tracking-wide">
						{ eachSession?.exercise.name }
					</Text>
				</View>

				{/* Video Player */}
				<View className="w-full aspect-video -mb-28 px-5 bg-white border-2 border-black rounded-md flex flex-row justify-center items-center gap-x-4">
					<VideoView 
						className="z-0 w-full aspect-video"
						player={player}
						allowsFullscreen
					/>
					<TouchableOpacity
						className="z-10 bg-primary size-10 pl-0.5 rounded-2xl flex items-center justify-center"
						onPress={() => {
							if (isPlaying) {
								player.pause();
							} else {
								player.play();
							}
						}}
					>
						<Image
							source={icons.play}
							className="size-4 aspect-[calc(4/5)]"
							tintColor={"#FFFFFF"}
						/>
					</TouchableOpacity>
				</View>

			</View>

			<View className="w-full flex px-6 pt-9 mt-28 mb-9 gap-y-5">

				<Text className="text-gray-400 text-sm font-medium tracking-wide">
					Steps
				</Text>

				{/* Basics */}
				<View className="flex gap-y-2">

					<Text>
						<Text className="font-bold">Reps: </Text>
						<Text>{eachSession?.exercise.reps || ""}</Text>
					</Text>

					<Text>
						<Text className="font-bold">Sets: </Text>
						<Text>{eachSession?.exercise.sets || ""}</Text>
					</Text>

					<Text>
						<Text className="font-bold">Frequency: </Text>
						<Text>{eachSession?.exercise.frequency || ""}</Text>
					</Text>

					<Text>
						<Text className="font-bold">Rest: </Text>
						<Text>{eachSession?.exercise.rest || ""}</Text>
					</Text>

				</View>

				{/* Further details */}
				<View className="flex gap-y-2">

					<Text className="font-bold">Details: </Text>

					<View className="flex gap-y-2 pl-3">

						<Text>
							<Text className="font-bold">Equipment: </Text>
							<Text>{eachSession?.exercise.equipment || ""}</Text>
						</Text>

						<Text>
							<Text className="font-bold">Muscles Worked: </Text>
							<Text>{eachSession?.exercise.musclesWorked || ""}</Text>
						</Text>

						<Text>
							<Text className="font-bold">Benefits: </Text>
							<Text>{eachSession?.exercise.benefits || ""}</Text>
						</Text>

					</View>

				</View>

				{/* How to perform */}
				<View className="flex gap-y-2">

					<Text className="font-bold">Step-by-step: </Text>

					<View className="flex gap-y-2 pl-3">

						<Text className="leading-6">
							{eachSession?.exercise.howToPerform || ""}
						</Text>

					</View>

				</View>

				{/* Tips */}
				<View className="flex gap-y-2">

					<Text className="font-bold">Tips: </Text>

					<View className="flex gap-y-2 pl-3">

						<Text className="leading-6">
							{eachSession?.exercise.tips || ""}
						</Text>

					</View>

				</View>

				{/* Feedback Button */}
				{ eachSession?.done ? (

					<FormButton
						text="Already Completed"
						onPress={() => router.navigate('/tasks')}
					/>

				) : (

					<FormButton
						text="Complete"
						onPress={() => router.navigate(`/tasks/feedback/${id}`)}
					/>

				) }

			</View>

		</ScrollView>
	)
}

export default EachTask