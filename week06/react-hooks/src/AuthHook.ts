import React, { createContext, useContext } from "react";

type Role = "user" | "admin"

const users: {username:string, email:string, password:string, role:Role}[] = [
  {
    username: "JohnDoe",
    email: "example@gmail.com",
    password: "abc123",
    role: "user",
  },
  {
    username: "Tobias",
    email: "tobias@gmail.com",
    password: "123abc",
    role: "admin",
  },
]

export type User = {
  username?: string,
  email?: string,
  role?: Role,
}

export const AuthContext = createContext<User | null>(null)

export function useAuth() {
  const login = (username: string, password: string): User | null => {
    const validUsernames = users.filter(u => u.username == username);

    if (validUsernames.length == 0) {
      return null;
    }

    for (let i = 0; i < validUsernames.length; i++) {
      if (validUsernames[i].password == password) {
        return {
          username: validUsernames[i].username,
          email: validUsernames[i].email,
          role: validUsernames[i].role,
        };
      }
    }

    return null;
  };

  const logout = (setter: React.Dispatch<React.SetStateAction<User | null>>): void => {
    setter(null);
  };

  const user = useContext<User | null>(AuthContext);

  return {user, login, logout};
}
