import { api } from "./client";

export const createMeet = async () => {
    try {
        const response = await api.post('/meet')

        return response.data.meetingUri;
    } catch (error) {
        throw error;
    }

}


