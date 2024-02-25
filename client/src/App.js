import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Users />} />
        <Route exact path="/add" element={<AddUser />} />
        <Route exact path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
