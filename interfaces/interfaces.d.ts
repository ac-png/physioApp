export interface Physio {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  when: string;
  physioId: number;
  physio: Physio;
}

export interface Program {
  id: number;
  name: string;
  duration: number;
  author: string;
  exerciseCategories: ProgramExerciseCategory[];
}

export interface ProgramExerciseCategory {
  id: number;
  name: string;
  exercises: Exercise[];
}

export interface ExerciseCategory {
  id: number;
  name: string;
}

export interface Exercise {
  id: number;
  name: string;
  reps: string;
  sets: string;
  frequency: string;
  rest: string;
  equipment: string;
  musclesWorked: string;
  benefits: string;
  howToPerform: string;
  tips: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  appointments: Appointment[];
  exercises: Exercise[];
  allowNotifications: boolean;
}

export interface Session {
    id: number;
    patientId: number;
    exerciseId: number;
    exercise: Exercise;
    exerciseCategoryId: number;
    exerciseCategory: ExerciseCategory;
    exerciseDate: string;
    notes: string;
    done: boolean;
    painLevel: number;
    feedback: string;
}
