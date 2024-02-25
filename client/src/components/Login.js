import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const api_base_url = "http://localhost:5000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_base_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const login = await response.json();
      if (login.success) {
        sessionStorage.setItem("token", login.token);
        history("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CenteredContainer>
      <LoginContainer>
        <h2>Login</h2>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
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

export default Login;
