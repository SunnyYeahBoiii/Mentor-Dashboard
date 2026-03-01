export interface UserDto {
    email: string;
    fullName?: string;
    avatar?: string;
    refreshToken: string;
    paid_sections: number;
}
