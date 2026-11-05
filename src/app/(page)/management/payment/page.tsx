
"use client";

import { useEffect, useState } from "react";
import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus,
    FaSearch
} from "react-icons/fa";

import CustomModal from "../../../../../components/Modal";
import CustomToast from "../../../../../components/Toas";
import Pagination from "../../../../../components/Pagination";
import Loading from "../../../../../components/Loading";

import {
    createRecord,
    getData,
    updateRecord,
    deleteRecord
} from "@/lib/api/apiEndpoint";

import { showConfirmSwal } from "../../../../../components/CustomSwal";

import type {
    Payment,
    CreatePaymentData
} from "../../../../../types/payment";

import type { User } from "../../../../../types/user";

import styles from "./page.module.css";


export default function Payment() {

    const titleName = "Payment";
    const endpoint = "payments";

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Toast
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info");

    // Editing
    const [editingRecord, setEditingRecord] = useState<Payment | null>(null);

    // Member Search
    const [selectedMember, setSelectedMember] = useState<
        Pick<User, "id" | "first_name" | "last_name" | "email"> | null
    >(null);

    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState("");
    const [members, setMembers] = useState<User[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);

    // Initial Form
    const initialForm = {
        user: "",
        ref_no: "",
        date_of_payment: "",
        amount: "",
        payment_method: "",
        description: "",
        no_of_days: "30",
    };

    const [form, setForm] = useState(initialForm);

    // Pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const totalPages = Math.ceil(totalUsers / pageSize);


    // Toast helper
    const showMessage = (
        message: string,
        status: "success" | "error" | "warning" | "info"
    ) => {
        setToastText(message);
        setToastStatus(status);
        setShowToast(true);
    };


    // Open Add Modal
    const showAddModal = () => {

        setEditingRecord(null);
        setForm({ ...initialForm });

        setSelectedMember(null);
        setSearch("");
        setMembers([]);
        setSearchError("");
        setSearchLoading(false);

        setShowModal(true);
    };


    // Close Modal
    const handleCloseModal = () => {
        setShowModal(false);

        setEditingRecord(null);
        setForm({ ...initialForm });

        setSelectedMember(null);
        setSearch("");
        setMembers([]);
        setSearchError("");
    };


    // Form Validation
    const validateForm = () => {

        const requiredFields = [
            ["user", form.user, "User"],
            ["ref_no", form.ref_no, "Reference Number"],
            ["date_of_payment", form.date_of_payment, "Date of Payment"],
            ["amount", form.amount, "Amount"],
            ["payment_method", form.payment_method, "Payment Method"],
            ["no_of_days", form.no_of_days, "Number of Days"],
        ];

        for (const [, value, label] of requiredFields) {

            if (!String(value).trim()) {
                showMessage(`${label} is required.`, "error");
                return false;
            }
        }

        if (
            !Number.isFinite(Number(form.amount)) ||
            Number(form.amount) <= 0
        ) {
            showMessage("Please enter a valid amount.", "error");
            return false;
        }

        if (
            !Number.isInteger(Number(form.no_of_days)) ||
            Number(form.no_of_days) <= 0
        ) {
            showMessage("Please enter a valid number of days.", "error");
            return false;
        }

        return true;
    };


    // Input Change
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Search Members
    const searchMembers = async (query: string) => {

        setSearch(query);
        setSearchError("");

        if (!query.trim()) {
            setMembers([]);
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);

        try {

            const response = await getData<User>(
                "users/",
                1,
                10,
                query.trim()
            );

            setMembers(response.results ?? []);

        } catch (error) {

            console.error("Error searching members:", error);

            setMembers([]);
            setSearchError("Failed to search members.");

        } finally {
            setSearchLoading(false);
        }
    };


    // Select Member
    const handleSelectMember = (member: User) => {

        setSelectedMember(member);

        setSearch(
            `${member.first_name} ${member.last_name}`
        );

        setForm((prev) => ({
            ...prev,
            user: member.id.toString(),
        }));

        setMembers([]);
        setSearchError("");
    };


    // Save Confirmation
    const handleSaveConfirm = async () => {

        if (!validateForm()) {
            return;
        }

        const isEditing = editingRecord !== null;

        await showConfirmSwal({

            title: isEditing
                ? `Update ${titleName}?`
                : `Save ${titleName}?`,

            text: isEditing
                ? `Are you sure you want to update this ${titleName}?`
                : `Are you sure you want to create this ${titleName}?`,

            confirmButtonText: isEditing
                ? "Yes, Update"
                : "Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                await handleSave();
            },
        });
    };


    // Save Payment
    const handleSave = async () => {

        try {

            setSaving(true);

            const payload: CreatePaymentData = {

                user: Number(form.user),

                ref_no: form.ref_no.trim(),

                date_of_payment: form.date_of_payment,

                amount: Number(form.amount),

                payment_method: form.payment_method,

                description: form.description.trim(),

                no_of_days: Number(form.no_of_days),
            };


            if (editingRecord) {

                await updateRecord(
                    endpoint,
                    editingRecord.id,
                    payload
                );

                showMessage(
                    "Payment and voucher updated successfully.",
                    "success"
                );

            } else {

                await createRecord<Payment, CreatePaymentData>(
                    endpoint,
                    payload
                );

                showMessage(
                    "Payment and voucher created successfully.",
                    "success"
                );
            }


            setShowModal(false);

            setEditingRecord(null);
            setForm({ ...initialForm });

            setSelectedMember(null);
            setSearch("");
            setMembers([]);

            await fetchRecord(page);

        } catch (error) {

            console.error("Error saving payment:", error);

            showMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to save payment.",
                "error"
            );

        } finally {
            setSaving(false);
        }
    };


    // Edit Payment
    const handleEditRecord = (item: Payment) => {

        const voucher = item.voucher_details?.[0];

        setEditingRecord(item);

        setForm({

            user: item.user.toString(),

            ref_no: item.ref_no || "",

            date_of_payment: item.date_of_payment || "",

            amount: item.amount.toString(),

            payment_method: item.payment_method || "",

            description: voucher?.description || "",

            no_of_days: voucher?.no_of_days?.toString() || "30",
        });


        // Display existing member
        if (item.user_details) {

            setSelectedMember(item.user_details);

            setSearch(
                `${item.user_details.first_name} ${item.user_details.last_name}`
            );

        } else {

            setSelectedMember(null);
            setSearch("");
        }

        setMembers([]);
        setSearchError("");

        setShowModal(true);
    };


    // Delete Payment
    const handleDelete = async (item: Payment) => {

        await showConfirmSwal({

            title: `Delete ${titleName}?`,

            confirmButtonText: "Yes, Delete",

            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord(endpoint, item.id);

                    showMessage(
                        `${titleName} deleted successfully.`,
                        "success"
                    );

                    await fetchRecord(page);

                } catch (error) {

                    console.error("Delete error:", error);

                    showMessage(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete payment.",
                        "error"
                    );
                }
            },
        });
    };


    // Fetch Payments
    const fetchRecord = async (pageNumber: number) => {

        try {

            setLoading(true);

            const response = await getData<Payment>(
                endpoint,
                pageNumber,
                pageSize
            );

            setData(response.results ?? []);
            setTotalUsers(response.count ?? 0);

        } catch (error) {

            console.error("Error fetching payments:", error);

            showMessage(
                "Failed to load payment records.",
                "error"
            );

        } finally {
            setLoading(false);
        }
    };


    // Pagination
    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    // Fetch on page change
    useEffect(() => {

        const timeout = setTimeout(() => {
            fetchRecord(page);
        }, 400);

        return () => clearTimeout(timeout);

    }, [page, pageSize]);


    return (
        <>

            {/* PAGE HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h1 className="h3 mb-1">
                        Payment Management
                    </h1>

                    <p className="text-muted mb-0">
                        Manage and explore payment records and their corresponding vouchers.
                    </p>
                </div>

                <button
                    className="btnSuccess"
                    onClick={showAddModal}
                >
                    <FaPlus />
                    Create Payment
                </button>

            </div>


            {/* PAYMENT TABLE */}
            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover mb-0">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Reference Number</th>
                                    <th>Date of Payment</th>
                                    <th>Amount</th>
                                    <th>Payment Method</th>
                                    <th>Voucher Code</th>
                                    <th>Expiration Date</th>
                                    <th>Days</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody style={{ fontSize: "14px" }}>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="text-center py-4"
                                        >
                                            Loading payments...
                                        </td>
                                    </tr>

                                ) : data.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="text-center py-4"
                                        >
                                            No payment records found.
                                        </td>
                                    </tr>

                                ) : (

                                    data.map((item, index) => {

                                        const voucher = item.voucher_details?.[0];

                                        return (

                                            <tr key={item.id}>

                                                <td>
                                                    {(page - 1) * pageSize + index + 1}
                                                </td>

                                                <td className="text-capitalize">
                                                    {item.user_details
                                                        ? `${item.user_details.first_name} ${item.user_details.last_name}`
                                                        : "N/A"}
                                                </td>

                                                <td>
                                                    {item.ref_no || "N/A"}
                                                </td>

                                                <td>
                                                    {item.date_of_payment || "N/A"}
                                                </td>

                                                <td>
                                                    ₱{Number(item.amount).toLocaleString(
                                                        "en-PH",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </td>

                                                <td className="text-uppercase">
                                                    {item.payment_method || "N/A"}
                                                </td>

                                                <td>
                                                    {voucher?.code || "N/A"}
                                                </td>

                                                <td>
                                                    {voucher?.expire_date || "N/A"}
                                                </td>

                                                <td>
                                                    {voucher?.no_of_days ?? "N/A"}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() => handleEditRecord(item)}
                                                        title="Edit Payment"
                                                    >
                                                        <FaPencilAlt />
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(item)}
                                                        title="Delete Payment"
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>

                                                </td>

                                            </tr>
                                        );
                                    })
                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* PAGINATION */}
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


            {/* CREATE / EDIT MODAL */}
            <CustomModal

                show={showModal}

                title={
                    editingRecord
                        ? "Edit Payment"
                        : "Create Payment"
                }

                handleClose={handleCloseModal}

                size="lg"

                content={
                    <>

                        {/* FIRST ROW */}
                        <div className="row">

                            {/* USER SEARCH */}
                            <div className="col-md-4">

                                <label className="form-label">
                                    User:
                                    <span className="text-danger">*</span>
                                </label>

                                <div className={styles.memberSearchRow}>

                                    <div className={styles.inputBox}>

                                        <FaSearch />

                                        <input
                                            type="text"
                                            value={search}
                                            placeholder="Search member by name or email..."
                                            onChange={(e) => {

                                                setSelectedMember(null);

                                                setForm((prev) => ({
                                                    ...prev,
                                                    user: "",
                                                }));

                                                searchMembers(e.target.value);
                                            }}
                                        />

                                    </div>

                                </div>


                                <div className={styles.searchWrapper}>

                                    {search.trim() !== "" && !selectedMember && (

                                        <div className={styles.memberSearchResults}>

                                            {searchLoading && (
                                                <div className={styles.searchState}>
                                                    <span className={styles.spinner} />
                                                    Searching members...
                                                </div>
                                            )}

                                            {!searchLoading && searchError && (
                                                <div className={`${styles.searchState} ${styles.searchStateError}`}>
                                                    {searchError}
                                                </div>
                                            )}

                                            {!searchLoading && !searchError && members.length === 0 && (
                                                <div className={styles.searchState}>
                                                    No members found.
                                                </div>
                                            )}

                                            {!searchLoading && members.map((member) => (

                                                <button
                                                    key={member.id}
                                                    type="button"
                                                    className={styles.memberResult}
                                                    onClick={() => handleSelectMember(member)}
                                                >

                                                    <div className={styles.resultInfo}>

                                                        <strong>
                                                            {member.first_name} {member.last_name}
                                                        </strong>

                                                        <small>
                                                            {member.email}
                                                        </small>

                                                    </div>

                                                </button>

                                            ))}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* REFERENCE NUMBER */}
                            <div className="col-md-4">

                                <label className="form-label">
                                    Reference Number:
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="ref_no"
                                    value={form.ref_no}
                                    onChange={handleInputChange}
                                    placeholder="Ex. 1234567890"
                                    className="form-control txtStandard"
                                />

                            </div>


                            {/* DATE OF PAYMENT */}
                            <div className="col-md-4">

                                <label className="form-label">
                                    Date of Payment:
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="date"
                                    name="date_of_payment"
                                    value={form.date_of_payment}
                                    onChange={handleInputChange}
                                    className="form-control txtStandard"
                                />

                            </div>

                        </div>


                        {/* SECOND ROW */}
                        <div className="row mt-3">

                            {/* PAYMENT METHOD */}
                            <div className="col-md-4">

                                <label className="form-label">
                                    Payment Method:
                                    <span className="text-danger">*</span>
                                </label>

                                <select
                                    name="payment_method"
                                    className="form-control txtStandard"
                                    value={form.payment_method}
                                    onChange={handleInputChange}
                                >

                                    <option value="">
                                        Select Payment Method
                                    </option>

                                    <option value="gcash">
                                        GCash
                                    </option>

                                    <option value="maya">
                                        Maya
                                    </option>

                                    <option value="others">
                                        Others
                                    </option>

                                </select>

                            </div>


                            {/* AMOUNT */}
                            <div className="col-md-4">

                                <label className="form-label">
                                    Amount:
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleInputChange}
                                    placeholder="Ex. 1000.00"
                                    className="form-control txtStandard"
                                    min="0.01"
                                    step="0.01"
                                />

                            </div>


                            {/* NUMBER OF DAYS */}
                            <div className="col-md-4">

                                <label className="form-label">
                                    Number of Days:
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type="number"
                                    name="no_of_days"
                                    value={form.no_of_days}
                                    onChange={handleInputChange}
                                    placeholder="Ex. 30"
                                    className="form-control txtStandard"
                                    min="1"
                                    step="1"
                                />

                                <small className="text-muted">
                                    Voucher validity in days.
                                </small>

                            </div>

                        </div>


                        {/* DESCRIPTION */}
                        <div className="row mt-3">

                            <div className="col">

                                <label className="form-label">
                                    Description:
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter payment description..."
                                    className="form-control"
                                    rows={4}
                                />

                            </div>

                        </div>

                    </>
                }

                onSave={handleSaveConfirm}

                saveText={
                    saving
                        ? "Saving..."
                        : editingRecord
                            ? "Update Payment"
                            : "Save Payment"
                }

            />


            {/* TOAST */}
            <CustomToast
                show={showToast}
                message={toastText}
                type={toasStatus}
                onClose={() => setShowToast(false)}
            />


            {/* LOADING */}
            <Loading loading={loading} />

        </>
    );
}
