import { useEffect } from 'react'
import './App.css'
import UserListContainer from './UserListContainer'
import { Query } from './resolver';

function App() {
  useEffect(() => {
    Query.hello({}, {name: "World"}, {}, {});
  }, [])

  return (
    <>
      <UserListContainer />
    </>
  )
}

export default App
