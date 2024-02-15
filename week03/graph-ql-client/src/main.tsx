import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PersonList } from './components/PersonList.tsx'
import { AddPerson } from './components/AddPerson.tsx'
import { AddAddress } from './components/AddAddress.tsx'
import { AddressList } from './components/AddressList.tsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/person-list' element={<PersonList/>} />
      <Route path='/address-list' element={<AddressList/>} />
      <Route path='/add-person' element={<AddPerson/>} />
      <Route path='/add-address' element={<AddAddress/>} />
    </Route>
  )
);

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={routes} />
    </ApolloProvider>
  </React.StrictMode>,
)
