import './AddPerson.css'
import * as client from '@apollo/client'
import { useRef } from 'react';

const GET_ADDRESSES = client.gql`
query GetAddresses {
  addresses {
    zip
    street
    city
  }
}
`

interface Address {
    zip: string,
    street: string,
    city: string,
  }

interface GetAdressesQuery {
  addresses: Address[],
}

const ADD_PERSON = client.gql`
mutation AddPerson($name: String!, $phoneNumer: String!, $age: Int, $addressId: Int, $imageUrl: String) {
  addPerson(name: $name, phoneNumber: $phoneNumer, age: $age, addressId: $addressId, imageUrl: $imageUrl) {
    id
    name
    phoneNumber
    age
    imageUrl
  }
}
`

export function AddPerson() {
  const { loading: addrLoading, error: addrError, data } = client.useQuery<GetAdressesQuery>(GET_ADDRESSES);

  const [addPersonMutation, { loading, error } ] = client.useMutation(ADD_PERSON);
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const phoneNumberRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const addressIdRef = useRef<HTMLSelectElement>(null)

  const handleForm = () => {
    addPersonMutation({
      variables: {
        name: nameRef.current?.value,
        age: parseInt(ageRef.current?.value!),
        phoneNumber: phoneNumberRef.current?.value,
        addressId: parseInt(addressIdRef.current?.value!),
      }
    })
  }

  return (
    <>
      <form className='form' onSubmit={handleForm}>
        <label htmlFor='name'>
          Name
        </label>
        <input name='name' ref={nameRef} required/>
        <label htmlFor='age'>
          Age
        </label>
        <input name='age' ref={ageRef} required/>
        <label htmlFor='phoneNumber'>
          Phone number
        </label>
        <input name='phoneNumber' ref={phoneNumberRef} required/>
        <label htmlFor='imageUrl'>
          Image (url)
        </label>
        <input name='imageUrl' ref={imageUrlRef} required/>
          {addrLoading ? (
          <>
            <label htmlFor='addressId'>
              Address
            </label>
            <select name='addressId' ref={addressIdRef}>loading options...</select>
          </>
          ) : data ? (
            <>
              <label htmlFor='addressId'>
                Address
              </label>
              <select name='addressId' ref={addressIdRef}>
                {data.addresses.map((a: Address , i: number) => {
                  return (
                    <option key={i} value={i}>{a.street}, {a.zip} {a.city}</option>
                  )
                })}
              </select>
            </>
            ) : addrError ? (
              <p>Could not fetch addresses. Error: {addrError.message}</p>
            ) : null}
        <input type='submit' disabled={loading || error != undefined || addrLoading || addrError != undefined} value={"Add Person"}/>
      </form>
    </>
  );
}
