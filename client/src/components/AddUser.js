import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const api_base_url = "http://localhost:5000/api";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [addresses, setAddresses] = useState([
    { addressLine1: "", addressLine2: "", country: "", city: "", state: "" },
  ]);

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddresses((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_base_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role, password, addresses }),
      });
      const addUser = await response.json();
      if (addUser.success) {
        alert("User added successfully");
        history("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CenteredContainer>
      <LoginContainer>
        <h2>Add User</h2>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            required
            placeholder="Address Line 1"
            value={addresses.addressLine1}
            onChange={handleChange}
          />
          <Input
            type="text"
            required
            placeholder="Address Line 2"
            value={addresses.addressLine2}
            onChange={handleChange}
          />
          <Input
            type="text"
            required
            placeholder="Country"
            value={addresses.country}
            onChange={handleChange}
          />
          <Input
            type="text"
            required
            placeholder="City"
            value={addresses.city}
            onChange={handleChange}
          />
          <Input
            type="text"
            required
            placeholder="State"
            value={addresses.state}
            onChange={handleChange}
          />

          <Button type="submit">Add User</Button>
        </LoginForm>
      </LoginContainer>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px; /* Add margin from the top */
  height: 100%; /* Adjust height to maintain full height */
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default AddUser;
