export interface UserDto {
    email: string;
    fullName?: string;
    avatar?: string;
    googleRefreshToken?: string;
    sessionExpiresAt?: Date;
}
