import React, { useState, useEffect } from 'react';

interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
  website: string,
}

const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulating data fetching from an API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  return (
    <UserList users={users} />
  );
};

const UserList: React.FC<{users: User[]}> = ({users}) => {
  return (
    <div>
      <h2>User List</h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

const User: React.FC<{user: User}> = ({user}) => {
  return (
    <div style={{
      border: "1px solid",
      borderRadius: "8px",
    }}>
      <h2>{user.name}</h2>
      <hr/>
      <p><b>Email</b>: {user.email}</p>
      <p><b>Phone</b>: {user.phone}</p>
      <p><b>Websit</b>: {user.website}</p>
    </div>
  );
};

export default UserListContainer;
