export interface PaymentVoucher {
    id: number;
    code: string;
    description: string;
    no_of_days: number;
    expire_date: string | null;
    is_used: boolean;
}

export interface Payment {
    id: number;
    user: number;

    user_details: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };

    voucher_details: PaymentVoucher[];

    ref_no: string;
    date_of_payment: string;
    amount: number;
    payment_method: string;
}

export interface CreatePaymentData {
    user: number;
    ref_no: string;
    date_of_payment: string;
    amount: number;
    payment_method: string;
    description: string;
    no_of_days: number;
}