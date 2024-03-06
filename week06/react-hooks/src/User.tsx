import { useContext } from "react";
import { AuthContext } from "./AuthHook";

export function User() {
  const user = useContext(AuthContext);

  return (
    <>
      <h2 style={{textAlign:"start", margin: 0}}>Logged in user:</h2>
      <div style={{border: "1px solid", borderRadius: "8px", padding: "16px",}}>
        <h2 style={{margin: 0}}>{user?.username}</h2>
        <hr/>
        <p style={{margin: 0}}>{user?.email} | {user?.role}</p>
      </div>
    </>
  );
}
