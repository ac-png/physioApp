import { Session } from "interfaces/interfaces";

export const getTodaysSessions = (sessionsData: Session[]): Session[] => {
    
    const today = new Date();

    return sessionsData.filter((session: Session) => {
      const sessionDate = new Date(session.exerciseDate);
      return (
        sessionDate.getFullYear() === today.getFullYear() &&
        sessionDate.getMonth() === today.getMonth() &&
        sessionDate.getDate() === today.getDate()
      );
    });

};