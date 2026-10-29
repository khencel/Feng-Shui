"use client"
import { GUA_DIRECTIONS, convertNumberToGua, GuaDetails, LogoElement } from "@/constants/GuaList"
import { useEffect, useState } from "react";
import { birthYearArray, yearAddDigit } from "./services";

import Cookies from "js-cookie";
import CustomModal from "../../../../../components/Modal";
import { showConfirmSwal } from "../../../../../components/CustomSwal";
import { getData, updateProfile } from "@/lib/api/apiEndpoint";
import { User } from "../../../../../types/user";
import { RiLockPasswordFill } from "react-icons/ri";
import Result from "./result";
import styles from "./Home.module.css"
import { createRecord, deleteRecord, postRecord } from "@/lib/api/apiEndpoint";
import CustomToast from "../../../../../components/Toas";
import { Member, CreateMemberUser } from "../../../../../types/user";
import Loading from "../../../../../components/Loading";
import { Voucher, CreateVoucher, ActivateVoucher } from "../../../../../types/voucher";

export default function Home(){
    const [gua,setGua] = useState<number | null>(null)
    const [guaInfo, setGuaInfo] = useState<typeof GUA_DIRECTIONS[keyof typeof GUA_DIRECTIONS] | null>(null)
    const [guaName, setGuaName] = useState("")
    const [details, setDetails] = useState<ReturnType<typeof GuaDetails>[keyof ReturnType<typeof GuaDetails>] | null>(null);
    const [showModal, setShowModal] = useState(false)
    const [activeTab, setActiveTab] = useState("personal");
    const [showModalAddUser, setShowModalAddUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [memberData, setMemberData] = useState<Member[]>([])
    const logos = LogoElement();
    const [userCount, setUserCount] = useState(0)

    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("")
    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")

    const [showNotSubscriberModal, setShowNotSubscriberModal] = useState(false)

    const [errorVoucher, setErrorVoucher] = useState("")


    const [errorList, setErrorList] = useState({
        gender:"",
        date_of_birth:""
    })

    const [form, setForm] = useState({
        gender:"",
        date_of_birth:""
    })

    const initialData = {
        name:"",
        gender:"",
        date_of_birth:""
    }

    const [addUserForm, setAddUserForm] = useState(initialData)

    const initialDataVoucher = {
        user:0,
        code:""
    }

    const [voucherForm, setVoucherForm] = useState(initialDataVoucher)

    const handleSubmit = () => {
        const user = getCurrentUser();
        console.log(user.date_of_birth);

        if(user.date_of_birth === null){
            setShowModal(true)
            return
        }else{
            const dateArr = birthYearArray(user.date_of_birth);
            const details = GuaDetails()
            const guaNumber = yearAddDigit(dateArr[0],user.gender)
            const res = convertNumberToGua(Number(guaNumber));
            setGuaName(res ?? "")
            setGuaInfo(res ? GUA_DIRECTIONS[res as keyof typeof GUA_DIRECTIONS] : null)
            setGua(guaNumber ?? null)

            const guaDetails = res as keyof typeof details;
            setDetails(details[guaDetails])
        }
        
    }

    const getCurrentUser = () => {
        const userCookie = Cookies.get("user");
        const user = userCookie ? JSON.parse(userCookie) : null;
        return user;
    }

    const validate = () => {
        const errors = {
            gender: form.gender.trim() ? "" : "Gender field is required",
            date_of_birth: form.date_of_birth.trim()
                ? ""
                : "Date of birth field is required",
        };

        setErrorList(errors);

        return !Object.values(errors).some((error) => error !== "");
    };

    const handleSaveConfirm = async () => {
        if(!validate()){
            return;
        }
        await showConfirmSwal({
            title:"Update Profile?",

            text:"Are you sure you want to update your profile?",

            confirmButtonText:"Yes, Update",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                await handleSave();
            },
        });
        
    }

    const handleSave = async () => {
        try {
           
            const updatedData = await updateProfile<User>({
                gender: form.gender,
                date_of_birth: form.date_of_birth,
            });

           
            const userCookie = Cookies.get("user");

            if (!userCookie) {
                console.error("User cookie not found");
                return;
            }

            const currentUser = JSON.parse(userCookie);

            
            const updatedUser = {
                ...currentUser,
                ...updatedData,
                gender: form.gender,
                date_of_birth: form.date_of_birth,
            };

            Cookies.set("user", JSON.stringify(updatedUser), {
                expires: 7 / 24,
                path: "/",
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            console.log("Profile successfully updated:", updatedUser);
            window.location.reload();
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handlePersonalGua = async (label:any, data:any) => {
        setActiveTab(label)
        
        if(label === "personal"){
            handleSubmit();
            return
        }

        const dateArr = birthYearArray(data.date_of_birth);
        const details = GuaDetails()
        const guaNumber = yearAddDigit(dateArr[0],data.gender)
        const res = convertNumberToGua(Number(guaNumber));
        setGuaName(res ?? "")
        setGuaInfo(res ? GUA_DIRECTIONS[res as keyof typeof GUA_DIRECTIONS] : null)
        setGua(guaNumber ?? null)

        const guaDetails = res as keyof typeof details;
        setDetails(details[guaDetails])
        
    }

    const handleAddUser = () => {
        let user = getCurrentUser()
        setErrorVoucher("")
        if(user.voucher === null){
            setVoucherForm({
                ...voucherForm,
                user: user.id
            })
            setShowNotSubscriberModal(true)
            return 
        }
        
        setShowModalAddUser(true)
        setAddUserForm(initialData)
    }

    const handleAddUserSaveConfirm = async () => {
        await showConfirmSwal({
            title: "Save Member?",
            text: "Are you sure you want to create this Member?",
            confirmButtonText: "Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                setShowModalAddUser(false)
                await handleSaveMember();
            },
        });
    }

    const handleSaveMember = async() => {
        await createRecord<Member, CreateMemberUser>("member", {
            name: addUserForm.name,
            gender: addUserForm.gender,
            date_of_birth: addUserForm.date_of_birth
        });
        await fetchMember();
        setToastText("Add-ons created successfully.");
        setToastStatus("success");
        setShowToast(true);
    }

    const fetchMember = async () => {
        const memberList = await getData<Member>(
            "member"
        )
        
        setMemberData(memberList.results)
        setUserCount(memberList.count)
    }

    const handleDelete = async (data: Member) => {

        await showConfirmSwal({
            title: "Delete Add-ons?",
            text: `Are you sure you want to delete ${data.name}?`,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            onConfirm: async () => {

                try {

                    await deleteRecord("member", data.id);

                    setToastText("Add-ons deleted successfully.");
                    setToastStatus("success");
                    setShowToast(true);

                    await fetchMember();

                } catch (error) {

                    console.error("Delete error:", error);

                    setToastText(
                        error instanceof Error
                            ? error.message
                            : "Failed to delete data."
                    );

                    setToastStatus("error");
                    setShowToast(true);
                }
            },
        });
    };


    const handleIsActivate = async () => {
        await showConfirmSwal({
            title:"Activate Voucher?",

            text: "Are you sure you want to activate voucher",

            confirmButtonText:"Yes, Save",

            cancelButtonText: "Cancel",

            onConfirm: async () => {
                await handleUpdateStatusVoucher();
            },
        });
    };


    const handleUpdateStatusVoucher = async () => {
        setErrorVoucher("");

        try {
            const res = await postRecord<{ valid: boolean; message?: string; data?: object }, ActivateVoucher>(
                'voucher/check-voucher',
                {
                    user: voucherForm.user,
                    code: voucherForm.code
                }
            );

            if (!res?.valid) {
                setErrorVoucher(res?.message || "Invalid voucher code.");
                return;
            }

            if (res.valid && res.data) {
                updateUserVoucherCookie(res.data);
            }

            setShowNotSubscriberModal(false)
            setToastStatus("success")
            setToastText("Voucher is valid!")
            setShowToast(true)

        } catch (error: any) {
            setVoucherForm({
                ...voucherForm,
                code:""
            })
            setToastStatus("error")
            setToastText("Invalid Voucher Code")
            setShowToast(true)
            setErrorVoucher(
                error.response?.data?.message || "Invalid voucher code."
            );
        }
    };

    const updateUserVoucherCookie = (voucherData: object) => {
        const cookies = document.cookie.split("; ");
        const userCookie = cookies.find(cookie =>
            cookie.startsWith("user=")
        );

        if (!userCookie) return;

        const user = JSON.parse(
            decodeURIComponent(userCookie.substring(5))
        );

        user.voucher = voucherData;

        document.cookie = `user=${encodeURIComponent(
            JSON.stringify(user)
        )}; path=/; max-age=86400; SameSite=Lax`;
    };


    useEffect(() => {
        handleSubmit();
        fetchMember();
    },[]);


    return (
        <>
            <section className="home-hero" style={{paddingTop:"7%"}}>
                <div className="container">
                    <div className="row">
                        <div className="col text-white">
                            <div className={styles.heroTitle}>
                                CREATE YOUR FENG SHUI CHART
                            </div>
                            <div className={styles.heroSubtitle}>
                                Discover balance in Every <span style={{color:"#F0D071"}}>Direction</span> 
                            </div>
                            <div style={{fontSize:"14px"}}>
                                Enter your birth details to unlock your personal feng shui chart and find the energy of each sector in your life.
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <div className={styles.contentDiv}>
                                <div className="row m-0 justify-content-end">
                                    <div className="col">
                                        <div className={styles.containerContent}>
                                            <div className="d-flex flex-wrap align-items-center gap-2">

                                                <button
                                                    type="button"
                                                    className={`${styles.nameContainer} ${
                                                        activeTab === "personal" ? styles.active : ""
                                                    }`}
                                                    onClick={() => handlePersonalGua("personal",null)}
                                                >
                                                    My Personal Gua
                                                </button>
                                                {
                                                    memberData.map((item) => (
                                                        <div className="position-relative" key={item.id}>
                                                            <span onClick={() => handleDelete(item)} style={{position:"absolute",right:"-5px",cursor:"pointer"}} className="badge bg-danger">X</span>
                                                            <button
                                                                
                                                                type="button"
                                                                className={`${styles.nameContainer} ${
                                                                    activeTab === item.name ? styles.active : ""
                                                                }`}
                                                                onClick={() => handlePersonalGua(item.name, item)}
                                                            >
                                                                {item.name}
                                                        </button>
                                                        </div>
                                                    ))
                                                }
                                                
                                                {
                                                    userCount < 5 && (
                                                        <button
                                                            type="button"
                                                            className={styles.AddUserBtn}
                                                            onClick={handleAddUser}
                                                        >
                                                            <RiLockPasswordFill className="me-2" />
                                                            Add User
                                                        </button>
                                                    )
                                                    
                                                }
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div id="tab1">
                                    <Result gua={gua} guaInfo={guaInfo} details={details} />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <CustomModal
                show={showModal}
                title="Update Profile"
                handleClose={() => setShowModal(false)}
                size="lg"
                showCloseBtn={false}
                content={
                    <>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">
                                    Gender: <span className="text-danger">*</span>
                                </label>
                                <select 
                                    name="gender"
                                    className="form-control txtStandard"
                                    value={form.gender}
                                    onChange={(e) => setForm({...form, gender: e.target.value})}
                                >
                                    <option value="" hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <span className="text-danger"><small>{errorList?.gender}</small></span>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Date of Birth: <span className="text-danger">*</span> </label>
                                <input
                                    type="date" 
                                    className="form-control txtStandard"
                                    name="date_of_birth"
                                    value={form.date_of_birth}
                                    onChange={(e) => setForm({...form, date_of_birth: e.target.value})}
                                />
                                <span className="text-danger"><small>{errorList?.date_of_birth}</small></span>
                            </div>
                        </div>
                    </> 
                }
                onSave={handleSaveConfirm}
                saveText={"Update"}
            />


            <CustomModal
                show={showNotSubscriberModal}
                title="Activate Voucher"
                handleClose={() => setShowNotSubscriberModal(false)}
                size="lg"
                showCloseBtn={true}
                content={
                    <>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label" style={{fontWeight:"600"}}>
                                    Code: <span className="text-danger">*</span>
                                </label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="name"
                                    placeholder="Ex. XXXXXXXXX"
                                    value={voucherForm.code}
                                    onChange={(e) => setVoucherForm({ ...voucherForm, code: e.target.value })}
                                />
                                <span className="text-danger"><small>{errorVoucher}</small></span>
                            </div>
                            
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col" style={{fontSize:"14px"}}>
                                <span style={{fontWeight:"600"}}>How to Subscribe</span>
                                <ol>
                                    <li>
                                        Enter your subscription code in the field above.
                                    </li>
                                    <li>
                                        Contact the Administration to request the official bank account details for payment.
                                    </li>
                                    <li>
                                        Transfer the subscription fee through online banking using the payment details provided by the Administration.
                                    </li>
                                    <li>
                                        Send your proof of payment to the Administration for verification.
                                    </li>
                                    <li>
                                        Once your payment has been verified, your subscription will be activated.
                                    </li>
                                </ol>
                                <p>
                                    <strong>Important:</strong> Please contact the Administration before making any payment. Do not transfer money to any unverified bank account.
                                </p>
                            </div>
                        </div>
                    </> 
                }
                onSave={handleIsActivate}
                saveText={"Activate"}
            />



            <CustomModal
                show={showModalAddUser}
                title="Add User"
                handleClose={() => setShowModalAddUser(false)}
                size="lg"
                showCloseBtn={true}
                content={
                    <>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label">
                                    Name: <span className="text-danger">*</span>
                                </label>
                                <input type="text"
                                    className="form-control txtStandard text-capitalize"
                                    name="name"
                                    placeholder="Enter full name"
                                    value={addUserForm.name}
                                    onChange={(e) => setAddUserForm({ ...addUserForm, name: e.target.value })}
                                />
                                <span className="text-danger"><small>{errorList?.gender}</small></span>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">
                                    Gender: <span className="text-danger">*</span>
                                </label>
                                <select 
                                    name="gender"
                                    className="form-control txtStandard"
                                    value={addUserForm.gender}
                                    onChange={(e) => setAddUserForm({ ...addUserForm, gender: e.target.value })}
                                >
                                    <option value="" hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <span className="text-danger"><small>{errorList?.gender}</small></span>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Date of Birth: <span className="text-danger">*</span> </label>
                                <input
                                    type="date" 
                                    className="form-control txtStandard"
                                    name="date_of_birth"
                                    value={addUserForm.date_of_birth}
                                    onChange={(e) => setAddUserForm({ ...addUserForm, date_of_birth: e.target.value })}
                                />
                                <span className="text-danger"><small>{errorList?.date_of_birth}</small></span>
                            </div>
                        </div>
                    </> 
                }
                onSave={handleAddUserSaveConfirm}
                saveText={"Add User"}
            />

            <CustomToast
                show={showToast}
                message={toastText}
                type={toasStatus}
                onClose={() => setShowToast(false)}
            />
            <Loading
                loading={loading}
            />
        </>
    )
}