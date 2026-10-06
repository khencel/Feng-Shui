import { User, CreateUserData } from "../../../types/user";
import { PaginatedResponse } from "../../../types/api";


const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = () => {
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("access_token="))
        ?.split("=")[1];

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export const getData = async <T,>(
    endpoint: string,
    page: number = 1,
    pageSize: number = 10,
    search: string = ""
): Promise<PaginatedResponse<T>> => {

    const params = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize),
    });

    if (search.trim()) {
        params.append("search", search.trim());
    }

    const response = await fetch(
        `${API_URL}/api/${endpoint}?${params.toString()}`,
        {
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.detail || "Failed to fetch data"
        );
    }

    return response.json();
};

export const createRecord = async <T, TData>(
    endpoint:string,
    data: TData
): Promise<T> => {
    const response = await fetch(
        `${API_URL}/api/${endpoint}/`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    )
    if (!response.ok) {

        const error = await response.json();

        console.error("Create record error:", error);

        throw new Error(
            error.detail || "Failed to create record"
        );
    }

    return response.json();
}

export const updateRecord = async <T,TData>(
    endPoint:String,
    id:number, 
    // data: CreateUserData
    data: T
):Promise<TData> => {
    const response = await fetch(
        `${API_URL}/api/${endPoint}/${id}/`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    )

    if (!response.ok) {

        const error = await response.json();

        console.error("Update user error:", error);

        throw new Error(
            error.detail || "Failed to update user"
        );
    }

    return response.json();
}

export const deleteRecord = async (
    endpoint:string,
    id:number
): Promise<void> => {
    const respone = await fetch(
        `${API_URL}/api/${endpoint}/${id}/`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!respone.ok){
        const error = await respone.json().catch(() => null)

        throw new Error(
            error?.detail || "Failed to delete user"
        )
    }
}

function async<T>(endpoint: any, string: any, page: any, arg3: number, pageSize: any, arg5: number, search: any, arg7: string) {
    throw new Error("Function not implemented.");
}
