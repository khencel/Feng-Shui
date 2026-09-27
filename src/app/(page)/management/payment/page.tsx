"use client"

import ListOfPayment from "./ListOfPayment";
import CustomModal from "../../../../../components/Modal";
import { useState } from "react";
import { Payment } from "../../../../../types/payment";

export default function PaymentPage(){

    const [showModal, setShowModal] = useState(false)
    const [editingPayment, setEditingPayment] = useState<Payment | null>(null)

    const showAddModal = () => {
        setShowModal(true)
    }
    const handleSaveConfirm = async () => {

    }
    return (
            <>
                <div className="d-flex justify-content-between align-items-center mb-4">
    
                    <div>
                        <h1 className="h3 mb-1">
                            Payments
                        </h1>
    
                        <p className="text-muted mb-0">
                            Manage your users and their permissions.
                        </p>
                    </div>
    
                    <button
                        className="btnSuccess"
                        onClick={showAddModal}
                    >
                        Create Payment
                    </button>
                </div>

                <ListOfPayment />
                
    
    
                <CustomModal
                    show={showModal}
                    title={editingPayment ? "Edit Payment" : "Create Payment"}
                    handleClose={() => setShowModal(false)}
                    content={
                        <>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email Address:</label>
                                    <input type="email" 
                                        className="form-control txtStandard"
                                        name="email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>First Name:</label>
                                    <input type="text" 
                                        className="form-control txtStandard"
                                        name="first_name"
                                        required
                                    />
                                </div>
    
                                <div className="col-md-6">
                                    <label>Last Name:</label>
                                    <input type="text" 
                                        className="form-control txtStandard"
                                        name="last_name"
                                        required
                                    />
                                </div>
                            </div>
                    
                        </>
                        
                    }
                    onSave={handleSaveConfirm}
                    saveText={editingPayment ? "Update Payment" : "Add Payment"}
                />
    
    
                {/* <CustomToast
                    show={showToast}
                    message={toastText}
                    type={toasStatus}
                    onClose={() => setShowToast(false)}
                /> */}
    
            </>
        );
}