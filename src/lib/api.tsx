
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
}

export interface ApiErrorData {
    detail?: string;
    message?: string;
    non_field_errors?: string[];
    [key: string]: unknown;
}

export class ApiError extends Error {
    status: number;
    data: ApiErrorData | null;

    constructor(
        message: string,
        status: number,
        data: ApiErrorData | null
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export async function api<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let response: Response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    } catch {
        throw new ApiError(
            "Unable to connect to the server. Please check your internet connection.",
            0,
            null
        );
    }

    const contentType = response.headers.get("content-type");
    let data: ApiErrorData | null = null;

    if (contentType?.includes("application/json")) {
        try {
            data = await response.json();
        } catch {
            data = null;
        }
    } else {
        try {
            const text = await response.text();
            data = text ? { detail: text } : null;
        } catch {
            data = null;
        }
    }

    if (!response.ok) {
        const message =
            data?.detail ||
            data?.message ||
            (response.status === 400
                ? "Please check the information you entered."
                : response.status === 401
                ? "Invalid email or password."
                : response.status === 403
                ? "You are not allowed to perform this action."
                : response.status >= 500
                ? "A server error occurred. Please try again later."
                : `Request failed with status ${response.status}`);

        throw new ApiError(
            typeof message === "string"
                ? message
                : "Request failed. Please try again.",
            response.status,
            data
        );
    }

    return data as T;
}