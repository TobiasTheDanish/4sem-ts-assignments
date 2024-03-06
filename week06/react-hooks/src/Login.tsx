import React, { useRef } from "react";
import { User, useAuth } from "./AuthHook";

export function Login({setUser}: {setUser: React.Dispatch<React.SetStateAction<User|null>>}) {
  const {login} = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const username = usernameRef.current?.value!;
    const password = passwordRef.current?.value!;

    const user = login(username, password);
    setUser(user);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
      <input ref={usernameRef} name="username" placeholder="Username"/>
      <input ref={passwordRef} type="password" name="password" placeholder="Password"/>
      <button style={{width: "min-content", margin: "0 auto"}} onClick={handleClick}>
        login
      </button>
    </div>
  );
}
