export interface User {
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    password?: string;
}