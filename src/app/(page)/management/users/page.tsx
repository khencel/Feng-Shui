

export default function UsersPage() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            Users
          </h1>
            <p className="text-muted mb-0">
            Manage your users and their permissions.
          </p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-plus me-2"></i>
          Add User
        </button>
      </div>
        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>john.doe@example.com</td>
                            <td>Admin</td>
                            <td>
                                <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>jane.smith@example.com</td>
                            <td>User</td>
                            <td>
                                <span className="badge bg-secondary">Inactive</span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  );
}