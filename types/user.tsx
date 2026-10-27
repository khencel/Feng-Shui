export interface User  {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_of_birth: string;
    gender: string;
}

export interface CreateUserData {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    date_of_birth: string;
    is_active: boolean
}


export interface RegisterUserData {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    date_of_birth: string;
    is_active: boolean;
    password: string;
    confirm_password: string
}

export interface UpdateSocMedAccount{
    gender:string,
    date_of_birth:string
}

export interface Member{
    id:number,
    name:string,
    gender:string,
    date_of_birth:string
}


export interface CreateMemberUser{
    name:string,
    gender:string,
    date_of_birth:string
}