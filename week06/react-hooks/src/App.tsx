import { useContext, useReducer, useState } from 'react'
import './App.css'
import { AuthContext, useAuth } from './AuthHook';
import { Login } from './Login';
import { User } from './User';

type ReduceCountAction = "inc" | "dec"
function reduceCount(state: {count: number}, action: ReduceCountAction): {count:number} {
  if (action == "inc") {
    return {
      count: state.count + 1,
    };
  } else if (action == "dec" && state.count > 0) {
    return {
      count: state.count - 1,
    };
  }
  
  return {
    ...state
  };
}

function App() {
  const [state, setCount] = useReducer(reduceCount, {count: 0});
  const {logout} = useAuth();
  const [user, setUser] = useState(useContext(AuthContext));

  if (!user) {
    return (
      <>
        <Login setUser={setUser} />
      </>
    );
  }

  return (
    <AuthContext.Provider value={user}>
      <User />
      <div style={{margin: "16px 0", border: "1px solid", borderRadius: "8px", padding: "8px",}}>
        <h2>Count is {state.count}</h2>
        <button onClick={() => setCount("inc")}>
          Increment
        </button>
        <button onClick={() => setCount("dec")}>
          Decrement
        </button>
      </div>
      <button onClick={() => logout(setUser)}>
        Logout
      </button>
    </AuthContext.Provider>
  )
}

export default App
