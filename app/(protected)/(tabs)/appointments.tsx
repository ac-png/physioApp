import axios from 'axios';
import { icons } from 'constants/icons'
import { Appointment } from 'interfaces/interfaces';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { getAppointments } from 'services/api';
import { formatOrdinalDate, headerDate } from 'services/dateHelpers';


const Appointments = () => {

	const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
	const [appointmentData, setAppointmentData]= useState<Appointment[] | any>(null);
	const [upcomingAppointments, setUpcomingAppointments]= useState<Appointment[] | null>(null);
	const [selectedAppointments, setSelectedAppointments]= useState<Appointment[] | null>(null);
	const [sevenDays, setSevenDays]= useState<Date[] | null>([]);
	
	
	const todaysDate = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(todaysDate);


	const getDateArray = (sourceDate: Date) => {

		const dates = [];

		for (let i = -3; i <= 3; i++) {
			const date = new Date(sourceDate);
			date.setDate(sourceDate.getDate() + i);
			dates.push(date);
		}

		return dates;

	};

	useEffect(() => {
		setSevenDays(getDateArray(selectedDate));
	}, [selectedDate]);


	// Fetch appoinments data from the API
	useEffect(() => {
		const fetchData = async () => {
			const appointments = await getAppointments();
			setAppointmentData(appointments)
		};

		fetchData();
	}, []);


	// Filter for selected date (in carousel)
	// Filter for upcoming appointments
	useEffect(() => {

		// Filter appointments by selected Date
		if (appointmentData) {
			const appointments: Appointment[] = appointmentData as Appointment[];
			selectedDate.setHours(0, 0, 0, 0);

			// (Midnight of following day)
			const tomorrow = new Date(selectedDate);
			tomorrow.setDate(selectedDate.getDate() + 1);

			const selectedDateMap: Appointment[] = appointments
				.filter((appointment) => {
				const appointmentDate = new Date(appointment.when);
				// Check if the appointment is on selected date (regardless of time / if passed)
				return appointmentDate >= selectedDate && appointmentDate < tomorrow;
				})
				.sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime());

			setSelectedAppointments(selectedDateMap);
		}

		// Filter appointments by upcoming (after now())
		if (appointmentData) {
			const appointments: Appointment[] =
				appointmentData as Appointment[];

			const upcomingAppointmentsMap: Appointment[] = appointments
				.filter((appointment) => new Date(appointment.when) > todaysDate)
				.sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime());
		
			setUpcomingAppointments(upcomingAppointmentsMap);
		}

	}, [appointmentData, selectedDate]);

	// DateTime to date like "Tue 29"
	const formatAppointmentDate = (dateString: string): string => {
		const date = new Date(dateString);

		const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
		const dayOfMonth = date.getDate();
		return `${dayOfWeek} ${dayOfMonth}`;
	};

	// DateTime to 12-hour clock e.g. "9:30 am"
	const formatAppointmentTime = (dateString: string): string => {
		const date = new Date(dateString);

		return date.toLocaleString('en-IE', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
		}).toLowerCase();

	};
	

	return (
		<View className='h-screen'>
		
			<View className="bg-pastel-green w-full py-9 overflow-x-hidden flex gap-y-9 items-start justify-start">
				
				{/* Header Text */}
				<View className="px-6">
					<Text className="mb-3 text-black text-3xl font-bold tracking-wide">
						My Appointments
					</Text>
					<Text className="text-black">
						{ headerDate(todaysDate) }
					</Text>
				</View>

				{/* Calendar View */}
				<View className="w-full -ml-9 flex flex-row gap-x-3">
				{sevenDays?.map((item: Date, index: number) => {
					const day = item.toLocaleDateString('en-US', { weekday: 'short' });
					const date = item.getDate();

					const isToday = item.toDateString() === selectedDate.toDateString();

					return isToday ? (
						<View
							key={index}
							className="bg-black w-[14.285714%] min-w-12 aspect-[2/3] rounded-md flex items-center justify-center"
						>
							<Text className="text-white">{day}</Text>
							<Text className="text-2xl text-white font-bold">{date}</Text>
						</View>
					) : (
						<TouchableOpacity
							key={index}
							className="bg-white w-[14.285714%] min-w-12 aspect-[2/3] rounded-md flex items-center justify-center"
							onPress={() => setSelectedDate(item)}  // <-- SUPER CLEAN now
						>
							<Text className="text-black">{day}</Text>
							<Text className="text-2xl text-black font-bold">{date}</Text>
						</TouchableOpacity>
					);
				})}
				</View>

			</View>
	
			<ScrollView
				className="w-full flex flex-grow px-6 pb-16 py-9"
				showsVerticalScrollIndicator={false}
			>
	
				{/* Selected Date */}
				<View className="w-full flex gap-y-5 mb-9">
					<Text className="text-gray-400 text-xs font-medium tracking-wide">
						Date Selected
					</Text>
					<View className="w-full flex gap-y-4">

						{ selectedAppointments === null ? (
							
						<View className="bg-gray-200 w-full h-24 rounded-md border border-gray-300 flex items-center justify-center">
							<Text className="text-gray-400 text-xs font-medium tracking-wide">
								Loading ...
							</Text>
						</View>

						) : selectedAppointments?.length === 0 ? (

						// Empty State
						<View className="bg-gray-200 w-full h-24 rounded-md border border-gray-300 flex items-center justify-center">
							<Text className="text-gray-400 text-xs font-medium tracking-wide">
								No appointments on { formatOrdinalDate(selectedDate) }
							</Text>
						</View>

						) : (
						<View className="w-full flex gap-y-4">
							
							{ selectedAppointments?.map((appointment) => (

								<View key={appointment.id} className="bg-white w-full p-6 rounded-md border border-gray-300 flex flex-row items-center gap-x-4">
									
									<View className="flex flex-row gap-x-4 items-center">
										<View className="flex items-center">
											<Text>
												{ formatAppointmentDate(appointment.when).split(" ")[0].toString() }
											</Text>
											<Text className="text-black text-xl font-bold">
												{ formatAppointmentDate(appointment.when).split(" ")[1].toString() }
											</Text>
										</View>
										<View className="flex justify-center">
											<Text className="text-sm leading-4">
												{ formatAppointmentTime(appointment.when).split(" ")[0].toString() }
												{"\n"}
												{ formatAppointmentTime(appointment.when).split(" ")[1].toString() }
											</Text>
										</View>
									</View>

									<View className="h-full w-px bg-gray-300" />
									
									<Text className="text-black flex-grow leading-6 truncate">
										{ appointment.physio.name }{"\n"}
										{ appointment.physio.address }
									</Text>
									
								</View>
								
								))}

							</View>
							)}

					</View>
				</View>
				

				{/* Upcoming Dates */}
				<View className="w-full flex gap-y-5 mb-9">

					<Text className="text-gray-400 text-xs font-medium tracking-wide">
						Upcoming
					</Text>

					<View className="w-full flex gap-y-4">

						{ upcomingAppointments === null ? (
							
						<View className="bg-gray-200 w-full h-24 rounded-md border border-gray-300 flex items-center justify-center">
							<Text className="text-gray-400 text-xs font-medium tracking-wide">
								Loading ...
							</Text>
						</View>

						) : upcomingAppointments?.length === 0 ? (

						<View className="bg-gray-200 w-full h-24 rounded-md border border-gray-300 flex items-center justify-center">
							<Text className="text-gray-400 text-xs font-medium tracking-wide">
								No upcoming appointments
							</Text>
						</View>

						) : (
						<View className="w-full flex gap-y-4">
							
							{ upcomingAppointments?.map((appointment) => (

							<View key={appointment.id} className="bg-white w-full p-6 rounded-md border border-gray-300 flex flex-row items-center gap-x-4">
								
								<View className="flex flex-row gap-x-4 items-center">
									<View className="flex items-center">
										<Text>
											{ formatAppointmentDate(appointment.when).split(" ")[0].toString() }
										</Text>
										<Text className="text-black text-xl font-bold">
											{ formatAppointmentDate(appointment.when).split(" ")[1].toString() }
										</Text>
									</View>
									<View className="flex justify-center">
										<Text className="text-sm leading-4">
											{ formatAppointmentTime(appointment.when).split(" ")[0].toString() }
											{"\n"}
											{ formatAppointmentTime(appointment.when).split(" ")[1].toString() }
										</Text>
									</View>
								</View>

								<View className="h-full w-px bg-gray-300" />
								
								<Text className="text-black flex-grow leading-6 truncate">
									{ appointment.physio.name }{"\n"}
									{ appointment.physio.address }
								</Text>
								
							</View>
							
							))}

						</View>
						)}

					</View>
				</View>
	
			</ScrollView>
	
		</View>
	)
}

export default Appointments