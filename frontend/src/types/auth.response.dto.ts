export enum UserRole {
    USER = 'USER',
    DIRECTOR = 'DIRECTOR',
    MANAGER = 'MANAGER',
    PO = 'PO',
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface LoginResponseDto {
    user: User;
    access_token: string;
}

export interface AuthDto {
    email: string;
    password: string;
}