"use client";

import { useEffect, useState } from "react";
import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus,
    FaCommentDollar 
} from "react-icons/fa";
import Link from "next/link";

import CustomModal from "../../../../../../components/Modal";
import CustomToast from "../../../../../../components/Toas";
import Pagination from "../../../../../../components/Pagination";

import { useParams } from "next/navigation";
import { createRecord, getData, updateRecord, deleteRecord } from "@/lib/api/apiEndpoint";
import { showConfirmSwal } from "../../../../../../components/CustomSwal";
import { Voucher, CreateVoucher } from "../../../../../../types/voucher";
import Loading from "../../../../../../components/Loading";


export default function UsersPage() {
    const params = useParams();
    const userId = Number(params.id);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [data, setData] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);

    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")

    const [editingMembership, setEditingMembership] = useState<Voucher | null>(null)
    const [search, setSearch] = useState("");

    // create member

    const showAddModal = () => {
        setEditingMembership(null)
        setForm(initialForm)
        setShowModal(true)
    }

    const initialForm = {
        user:userId,
        code: "",
        expire_date: "",
        description: "",

    };
    
    const [form, setForm] = useState(initialForm)

    // const validateForm = () => {
    //     const requiredFields = [
    //         ["name", form.name, "Membership Name"],
    //         ["price", form.price, "Price"],
    //         ["duration", form.duration, "Duration"]
    //     ];

    //     for (const [, value, label] of requiredFields) {
    //         if (typeof value === "string" ? !value.trim() : !value) {
    //             setToastText(`${label} is required.`);
    //             setToastStatus("error");
    //             setShowToast(true);
    //             return false;
    //         }
    //     }

        

    //     return true;
    // };

    const [saving, setSaving] = useState(false)

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name.includes(".")) {
                const [parent, child] = name.split(".");

                return {
                    ...prev,
                    [parent]: {
                        ...((prev[parent as keyof typeof prev] as unknown as Record<string, any>) ?? {}),
                        [child]: value,
                    },
                };
            }

            return {
                ...prev,
                [name]: name === "is_active"
                    ? value === "true"
                    : value,
            };
        });
    };

    const handleSaveConfirm = async () => {

        // if (!validateForm()) {
        //     return;
        // }
        console.log(form);
        
        const isEditing = editingMembership !== null;

        await showConfirmSwal({
            title: isEditing ? "Update Membership?" : "Save Membership?",

            text: isEditing
                ? "Are you sure you want to update this Membership?"
                : "Are you sure you want to create this Membership?",

            confirmButtonText: isEditing
                ? "Yes, Update"
                : "Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                await handleSave();
            },
        });
    };

    const handleSave = async () => {

        try {
            setSaving(true);

            if(editingMembership){
                await updateRecord("voucher", editingMembership.id, form);

                setToastText("Voucher updated successfully.");
                setToastStatus("success");

            }else{
                await createRecord<Voucher, CreateVoucher>("voucher", {
                    user: userId,
                    code: form.code,
                    expire_date: form.expire_date,
                    description: form.description,
                });
                setToastText("Voucher created successfully.");
                setToastStatus("success");
            }

            

            setShowModal(false);
            setShowToast(true);

            await fetchRecord(page);

        } catch (error) {
            console.error("Error creating membership:", error);
        } finally {
            setSaving(false);
        }
    };
    // =================================

    // edit record 
    const handleEditRecord = (voucher:Voucher) => {
        setEditingMembership(voucher)
       
        
        setForm({
            user:userId,
            code: voucher.code,
            expire_date: voucher.expire_date,
            description: voucher.description,
        })

        setShowModal(true);
    }
    // ====================================


    // Delete record 
    const handleDelete = async (voucher: Voucher) => {

        await showConfirmSwal({
            title: "Delete Membership?",
            text: `Are you sure you want to delete ${voucher.code}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord("voucher", voucher.id);

                    setToastText("Voucher deleted successfully.");
                    setToastStatus("success");
                    setShowToast(true);

                    await fetchRecord(page);

                } catch (error) {

                    console.error("Delete error:", error);

                    setToastText(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete voucher."
                    );

                    setToastStatus("error");
                    setShowToast(true);
                }
            },
        });
    };
    // ====================================

    // Pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPage(1);
    };

    const fetchRecord = async (pageNumber: number) => {

        try {

            setLoading(true);

            const data = await getData<Voucher>(
                `voucher?user_id=${userId}`,
                pageNumber,
                pageSize,
                search
            );

            console.log(data.results);
            

            setData(data.results);
            setTotalUsers(data.count);

        } catch (error) {

            console.error(
                "Error fetching records:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    
    const generateVoucherCode = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const randomValues = new Uint32Array(10);

        crypto.getRandomValues(randomValues);

        const code = Array.from(randomValues)
            .map((value) => characters[value % characters.length])
            .join("");

        setForm((prev) => ({
            ...prev,
            code,
        }));
    };


    useEffect(() => {

        const timeout = setTimeout(() => {
            fetchRecord(page);
        }, 400);

        return () => clearTimeout(timeout);

    }, [page, pageSize, search]);

    const totalPages = Math.ceil(
        totalUsers / pageSize
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    {/* <h1 className="h3 mb-1">
                        Membership Plan Management
                    </h1>

                    <p className="text-muted mb-0">
                        Manage your membership plans and their details here.
                    </p> */}
                </div>

                <button
                    className="btnSuccess"
                    onClick={showAddModal}
                >
                    <FaPlus />
                    Create Voucher
                </button>

            </div>


            <div className="card border-0 shadow-sm">

                <div className="card-body">
                    {/* <div className="row justify-content-end">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control txtStandard"
                                placeholder="Search name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div> */}
                    
                    <div className="table-responsive">

                        <table className="table table-hover mb-0">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Expiration</th>
                                    {/* <th>Admin</th> */}
                                    <th>Is_used</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody style={{fontSize:"14px"}}>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            Loading users...
                                        </td>
                                    </tr>

                                ) : data.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            No users found.
                                        </td>
                                    </tr>

                                ) : (

                                    
                                    data.map((item, index) => (
                                        <tr key={index}>

                                            <td>
                                                {index+1}
                                            </td>

                                            <td className="text-capitalize">
                                                {item.code}
                                            </td>

                                            <td className="text-capitalize">
                                                {item.description ? item.description:"none"}
                                            </td>

                                            <td>
                                                {item.expire_date}
                                            </td>

                                            <td className="text-capitalize">
                                                {item.is_used? "Yes":"No"}
                                            </td>


                                            <td>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditRecord(item)}
                                                    title="Edit Membership"
                                                >
                                                    <FaPencilAlt />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger me-2"
                                                    onClick={() => handleDelete(item)}
                                                    title="Delete Membership"
                                                >
                                                    <FaRegTrashAlt />
                                                </button>

                                               
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}

                    <div className="d-flex justify-content-between align-items-center mt-4">

                        <div className="d-flex align-items-center gap-2 text-muted small">

                            <span>Show</span>

                            <select
                                className="form-select form-select-sm"
                                style={{ width: "80px" }}
                                value={pageSize}
                                onChange={(e) =>
                                    handlePageSizeChange(Number(e.target.value))
                                }
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>

                            <span>entries</span>

                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                    </div>

                </div>

            </div>


            <CustomModal
                show={showModal}
                title={editingMembership ? "Edit Membership" : "Create Membership Plan"}
                handleClose={() => setShowModal(false)}
                size="lg"
                content={
                    <>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">
                                    Code: <span className="text-danger">*</span>
                                </label>
                                {!editingMembership && (
                                <span onClick={generateVoucherCode} style={{cursor:"pointer",color:"blue"}} ><strong>Generate Code</strong></span> 
                                )}

                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control txtStandard"
                                        name="code"
                                        placeholder="Enter or generate code"
                                        value={form.code}
                                        onChange={handleInputChange}
                                    />
{/* 
                                    {!editingMembership && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={generateVoucherCode}
                                            title="Generate random voucher code"
                                        >
                                            <FaCommentDollar /> Generate
                                        </button>
                                    )} */}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Expiration: <span className="text-danger">*</span> </label>
                                <input
                                    type="date" 
                                    className="form-control txtStandard"
                                    name="expire_date"
                                    value={form.expire_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                           
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-3">
                                <label className="form-label">Description: </label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    placeholder="Ex. Provide a brief description of the voucher"   
                                    value={form.description}
                                    rows={4}
                                    style={{ fontSize: "14px" }}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-4 mt-3">
                                <label className="form-label">Status: </label>
                                <select
                                    className="form-select"
                                    name="is_active"
                                    value={form.is_active.toString()}
                                    onChange={handleInputChange}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div> */}
                    </> 
                }
                onSave={handleSaveConfirm}
                saveText={editingMembership ? "Update Voucher" : "Add Voucher"}
            />


            <CustomToast
                show={showToast}
                message={toastText}
                type={toasStatus}
                onClose={() => setShowToast(false)}
            />
            {/* <Loading
                loading={loading}
            /> */}
        </>
    );
}