import axios from "axios";
import { Appointment, Program, Session, User } from "interfaces/interfaces";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type updateSessionProps = {
	id: number,
	done: boolean,
	painLevel: number,
	feedback: string
}

type updatePatientProps = {
	id: number,
	phone: string,
	address: string,
	allowNotifications: boolean
}

// GET :: Appointment[]
export const getAppointments = 
	async (): Promise<Appointment[] | { error: boolean; msg: string }> => {

	try {

		const response = await axios.get(`${BASE_URL}/api/Patient/me`);
		
		if (response.status === 200) {

			const { appointments } = response.data;
			return appointments;

		} else {

			throw new Error(`API Error: Failed to fetch appointments`);

		}

	} catch (err) {

		if (axios.isAxiosError(err) && err.response?.data?.msg) {
			return { error: true, msg: err.response.data.msg };
		}
		
		return { error: true, msg: 'An unknown error occurred.' };

	}

};

// GET :: Program[]
export const getProgrammes = 
	async (): Promise<Program[] | { error: boolean; msg: string }> => {

	try {

		const response = await axios.get(`${BASE_URL}/api/Programme`);
		
		if (response.status === 200) {

			const programmes = response.data;
			return programmes;

		} else {

			throw new Error(`API Error: Failed to fetch programmes`);

		}

	} catch (err) {

		if (axios.isAxiosError(err) && err.response?.data?.msg) {
			return { error: true, msg: err.response.data.msg };
		}
		
		return { error: true, msg: 'An unknown error occurred.' };

	}

};

// GET :: Session

export const getSessionById = 
	async (sessionId: number): Promise<Session | { error: boolean; msg: string }> => {

	try {

		const response = await axios.get(`${BASE_URL}/api/Patient/me`);
		
		if (response.status === 200) {

			const { sessions } = response.data;
			const foundSession = sessions.find((session: { id: number; }) => session.id === sessionId)
			return foundSession || null;

		} else {

			throw new Error(`API Error: Failed to fetch appointments`);

		}

	} catch (err) {

		if (axios.isAxiosError(err) && err.response?.data?.msg) {
			return { error: true, msg: err.response.data.msg };
		}
		
		return { error: true, msg: 'An unknown error occurred.' };

	}

};

// GET :: Session[]
export const getSessions = async () => {

	try {

		const response = await axios.get(`${BASE_URL}/api/Patient/me`);
		
		if (response.status === 200) {

			const { sessions } = response.data;
			return sessions;

		} else {

			throw new Error(`API Error: Failed to fetch sessions`);

		}

	} catch (err) {

		console.error('Failed to fetch sessions: ', err);
		return { error: true, msg: (err as any).response.data.msg}

	}

};

// PUT
export const updateSession = async ({id, done, painLevel, feedback}: updateSessionProps) => {

	try {

		const response = await axios.put(
			`${BASE_URL}/api/Session/${id}`,
			{id, done, painLevel, feedback}
		);
		
		if (response.status === 204) {

			return { error: false, msg: "Your feedback has been submitted!" };

		} else {

			throw new Error(`API Error: Failed to fetch sessions`);

		}

	} catch (err) {

		console.error('Failed to update session: ', err);
		return { error: true, msg: (err as any).response.data.msg}

	}

};

// GET :: Patient[]
export const getPatient = async () => {

	try {

		const response = await axios.get(`${BASE_URL}/api/Patient/me`);
		
		if (response.status === 200) {

			return response.data;

		} else {

			throw new Error(`API Error: Failed to fetch patient details`);

		}

	} catch (err) {

		console.error('Failed to fetch patient details: ', err);
		return { error: true, msg: (err as any).response.data.msg}

	}

};

// PUT
export const updatePatient = async ({id, phone, address, allowNotifications}: updatePatientProps) => {

	try {

		const response = await axios.put(
			`${BASE_URL}/api/Patient/me`,
			{id, phone, address, allowNotifications}
		);
		
		if (response.status === 204) {

			return { error: false, msg: "Your changes have been saved!" };

		} else {

			throw new Error(`API Error: Failed to update patient`);

		}

	} catch (err) {

		console.error('Failed to update patient: ', err);
		return { error: true, msg: (err as any).response.data.msg}

	}

};