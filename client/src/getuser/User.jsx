import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setUsers(response.data);
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete user with toast
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user/${id}`
      );

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );

      // Success toast
      toast.success(response.data.message || "User deleted successfully!", {
        position: "top-right",
      });

    } catch (error) {
      console.log("Error while deleting user", error);

      toast.error("Failed to delete user", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="userTable">
      {/* Toast Container */}
      <Toaster />

      <Link to="/add" className="btn btn-primary">
        Add User
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>

              <td className="actionButtons">
                <Link
                  to={`/update/${user._id}`}
                  className="btn btn-info"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;