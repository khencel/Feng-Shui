import style from "./UserDetails.module.css"


interface UserInformationProps {
    data: any
}

export default function UserInformation({ data }: UserInformationProps){
    return (
        <>
            <div>
                <h6 className={style.headerLabel}>User Information</h6>
            </div>
            <hr />

            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Email Address:</label>
                        </div>
                        <div>
                            {data?.email || "N/A"}
                        </div>
                    </div>
                </div>
                <div className="col-6 text-end">
                    {data?.is_active ? (
                        <span style={{fontWeight:"600"}} className="text-success">Active</span>
                    ) : (
                        <span style={{fontWeight:"600"}} className="text-danger">Inactive</span>
                    )}
            
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">First Name:</label>
                        </div>
                        <div>
                            {data?.first_name || "N/A"}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Last Name:</label>
                        </div>
                        <div>
                            {data?.last_name || "N/A"}
                        </div>
                    </div> 
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Date of Birth:</label>
                        </div>
                        <div>
                            {data?.date_of_birth
                                ? new Date(data.date_of_birth + "T00:00:00").toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "N/A"
                            }
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex">
                        <div style={{width:"30%"}}>
                            <label className="me-2">Gender:</label>
                        </div>
                        <div className="text-capitalize">
                            {data?.gender || "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}