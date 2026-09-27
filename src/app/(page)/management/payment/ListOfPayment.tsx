import {
    FaPencilAlt,
    FaRegTrashAlt,
    FaPlus
} from "react-icons/fa";

export default function ListOfPayment(){
    return (
        <>
            <div className="card border-0 shadow-sm">
                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover mb-0">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Date of Payment</th>
                                    <th>Amount</th>
                                    <th>Reference Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>

                                    <td>
                                        1
                                    </td>

                                    <td className="text-capitalize">
                                        test
                                    </td>

                                    <td className="text-capitalize">
                                        test
                                    </td>

                                    <td>
                                        test
                                    </td>

                                    <td className="text-capitalize">
                                        trdt
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            
                                        >
                                            <FaPencilAlt />
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            
                                        >
                                            <FaRegTrashAlt />
                                        </button>

                                    </td>

                                </tr>
                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}

                    <div className="d-flex justify-content-between align-items-center mt-4">

                        <div className="d-flex align-items-center gap-2 text-muted small">

                            <span>Show</span>

                            {/* <select
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
                            </select> */}

                            <span>entries</span>

                        </div>

                        {/* <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        /> */}

                    </div>

                </div>

            </div>
        </>
    )
}