import { api } from "./client";

export const createMeet = async () => {
    const response = await api.post('/meet')

    if (response.status !== 201) {
        throw new Error("Failed to create meet")
    }

    return response.data.meetingUri;
}