import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AutoSizer from "react-virtualized-auto-sizer";

const api_base_url = "http://localhost:5000/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetch(`${api_base_url}/users`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data); // Log the data to check
        setUsers(data.data);
      });
  }, []);

  const handleEdit = (userId) => {
    history(`/edit-user/${userId}`);
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      fetch(`${api_base_url}/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Update users state after successful deletion
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== userId)
            );
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const Row = ({ index, style }) => {
    const user = users[index];

    return (
      <tr style={style}>
        <Td>{user._id}</Td>
        <Td>{user.name}</Td>
        <Td>{user.email}</Td>
        <Td>
          <Button onClick={() => handleEdit(user._id)}>Edit</Button>
          <Button onClick={() => handleDelete(user._id)}>Delete</Button>
        </Td>
      </tr>
    );
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add">
        <AddUserButton>Add User</AddUserButton>
      </Link>
      <AutoSizer>
        {({ height, width }) => (
          <Table height={height} width={width}>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <List
              height={400} // Increase this value if the scroll is too small
              itemCount={users.length}
              itemSize={50}
              width={width}
            >
              {Row}
            </List>
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  margin-right: 5px;
`;

const AddUserButton = styled(Button)`
  margin-bottom: 10px;
`;

export default Users;
