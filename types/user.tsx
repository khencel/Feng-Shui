export interface User  {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    date_of_birth: string;
    gender: string;
}

export interface CreateUserData {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    date_of_birth: string;
}