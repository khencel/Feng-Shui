export interface Voucher {
    id:number;
    expire_date:string;
    code: string;
    description: string;
    is_used:boolean
}


export interface CreateVoucher {
    user:number,
    expire_date:string;
    code: string;
    description: string;
}