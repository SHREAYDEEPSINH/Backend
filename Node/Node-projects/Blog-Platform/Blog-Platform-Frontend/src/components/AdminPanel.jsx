import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminPanel = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lsData, setlsData] = useState(
    JSON.parse(localStorage.getItem("loginuser"))
  )

  if (lsData.role == "user") {
    navigate("/")
  }

  useEffect(() => {
    axios
      .get("http://localhost:9070/admin/users", { headers: { Authorization: `Bearer ${lsData.token}` } })
      .then((res) => {
        setUsers(res.data.usersDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, [lsData.token]);

  if (loading) return <h2>Loading users...</h2>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Admin Panel - User Management</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {/* <RoleDropdown userId={u._id} currentRole={u.role} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
