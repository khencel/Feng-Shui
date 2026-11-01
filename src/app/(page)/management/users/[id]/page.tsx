"use client";

import UserInformation from "./UserInformation"
import style from "./UserDetails.module.css"
import ActiveVoucher from "./ActiveVoucher"
import { useEffect, useState } from "react";
import PaymentListPage from "./PaymentList";
import VoucherListPage from "./VoucherList";
import { useParams } from "next/navigation";
import {User} from "../../../../../../types/user";
import { getDataByIdNoPagination } from "@/lib/api/apiEndpoint";

export default function UserDetails(){
    const params = useParams<{ id: string }>();
    const userId = params.id;
    const [activeTab, setActiveTab] = useState<"payments" | "vouchers">(
        "payments"
    );

    const [user, setUser] = useState<User | null>(null);

    const fetchUserDetails = async () => {
        const userData = await getDataByIdNoPagination<User>(
            `users`,
             userId
        );
        setUser(userData);
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);


    return (
        <>
        <section>
            <div className="row">
                <div className="col-md-8">
                    <div className={style.userInformation}>
                        <UserInformation data={user} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={style.userInformation}>
                        <ActiveVoucher />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <div className={style.userInformation}>
                        <div>
                            <ul className="nav nav-tabs" style={{fontSize:"14px"}}>

                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${
                                            activeTab === "payments" ? style.active : ""
                                        }`}
                                        onClick={() => setActiveTab("payments")}
                                        style={{color:"black"}}
                                    >
                                        Payment List
                                    </button>
                                </li>

                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${
                                            activeTab === "vouchers" ? style.active : ""
                                        }`}
                                        onClick={() => setActiveTab("vouchers")}
                                        style={{color:"black"}}
                                    >
                                        Voucher List
                                    </button>
                                </li>

                            </ul>

                            <div className="pt-3">

                                {activeTab === "payments" && (

                                    <PaymentListPage
                                    />

                                )}

                                {activeTab === "vouchers" && (
                                    <VoucherListPage 
                                        
                                    />
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}