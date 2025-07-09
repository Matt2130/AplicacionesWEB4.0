import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Tag } from 'antd'; 

const { Search } = Input;
const { Column, ColumnGroup } = Table;

interface Role {
  type: string;
}

interface UserData {
  key: string; // Typically user._id
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: Role[];
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]); 
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [searchText, setSearchText] = useState<string>(''); 

  // Function to fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        // You might need to add Authorization header here if this API is protected
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch("http://localhost:3000/api/auth/get-users", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token if needed
          }
        });

        if (!response.ok) {
          // Handle HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener usuarios');
        }

        const data = await response.json();
        const formattedUsers = data.userList.map((user: any) => ({
          key: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          roles: user.roles 
        }));

        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers); // Initialize filtered users with all users
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        // Optionally display an error message to the user
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on component mount

  // Function to handle the search logic
  const handleSearch = (value: string) => {
    // Trim whitespace from the search value and convert to lowercase for case-insensitive search
    const searchValue = value.trim().toLowerCase();
    setSearchText(searchValue); // Update the search text state

    if (searchValue === '') {
      // If search box is empty, show all users
      setFilteredUsers(users);
    } else {
      // Filter users based on firstName, lastName, or username
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchValue) ||
          user.lastName.toLowerCase().includes(searchValue) ||
          user.username.toLowerCase().includes(searchValue)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div style={{ padding: '24px' }}> 
      <h1>Gestionar Usuarios</h1> 
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar por nombre, apellido o usuario"
          onSearch={handleSearch} // Use the new handleSearch function
          onChange={(e) => handleSearch(e.target.value)} // Add onChange for live search
          value={searchText} // Bind value to state for controlled component
          allowClear // Allows clearing the input
          enterButton="Buscar"
          style={{ width: 300 }}
        />
      </Space>

      <Table<UserData>
        dataSource={filteredUsers}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        loading={loading} 
        bordered 
      >
        <ColumnGroup title="Nombre">
          <Column title="Nombre" dataIndex="firstName" key="firstName" />
          <Column title="Apellido" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Usuario" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Roles"
          dataIndex="roles"
          key="roles"
          render={(roles: Role[]) => (
            <>
              {roles.map((role, index) => (
                <Tag color="geekblue" key={index}> 
                  {role.type}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Acciones"
          key="action"
          render={(_: any, record: UserData) => (
            <Space size="middle">
              <a onClick={() => console.log('Editar usuario:', record.key)}>Editar</a> 
              <a onClick={() => console.log('Eliminar usuario:', record.key)} style={{ color: 'red' }}>Eliminar</a> 
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default UserTable;