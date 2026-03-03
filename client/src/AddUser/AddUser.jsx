import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./adduser.css";
import toast from "react-hot-toast";

const AddUser = () => {

  const navigate = useNavigate();

  const [user, setUsers] = useState({
    name: "",
    email: "",
    address: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUsers({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user",
        user
      );

      toast.success(response.data.message || "User created successfully");

      setUsers({
        name: "",
        email: "",
        address: "",
      });

      navigate("/");

    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="addUser">
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>

      <h3>Add New User</h3>

      <form className="addUserForm" onSubmit={submitForm}>
        
        <div className="inputGroup">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter Your Name"
          />
        </div>

        <div className="inputGroup">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="inputGroup">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter Your Address"
          />
        </div>

        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddUser;