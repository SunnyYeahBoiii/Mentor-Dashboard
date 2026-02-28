import { api } from "./client";

export const createMeet = async () => {
    const response = await api.post('/meet')
    return response.data.meetingUri;
}


